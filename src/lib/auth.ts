import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

type BackendAuthResult = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    roles: string[];
    status: string;
    is_root: boolean;
    avatar_url: string;
  };
};

type ExchangeResult =
  | { ok: true; data: BackendAuthResult }
  | { ok: false; status: number | null };

let apiBaseUrlLogged = false;

function validateAndLogApiBaseUrl(): string | null {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) {
    console.error(
      "[auth] API_BASE_URL is not configured. Set it in .env.local (e.g. http://localhost:8080).",
    );
    return null;
  }

  try {
    new URL(apiBaseUrl);
  } catch {
    console.error(
      `[auth] API_BASE_URL is not a valid URL: "${apiBaseUrl}". Expected format: http(s)://host:port`,
    );
    return null;
  }

  if (!apiBaseUrlLogged) {
    apiBaseUrlLogged = true;
    console.log(`[auth] Backend API target: ${apiBaseUrl}/auth/google/token`);
  }

  return apiBaseUrl;
}

async function exchangeGoogleToken(googleToken: string): Promise<ExchangeResult> {
  const apiBaseUrl = validateAndLogApiBaseUrl();
  if (!apiBaseUrl) {
    return { ok: false, status: null };
  }

  try {
    const url = `${apiBaseUrl}/auth/google/token`;
    const payload = { token: googleToken };
    console.log("[auth] Exchanging Google token with backend:", {
      url,
      payload_keys: Object.keys(payload),
      token_length: googleToken.length,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      let bodyPreview = "";
      try {
        const raw = await response.text();
        bodyPreview = raw.substring(0, 500);
      } catch {
        // ignore body read errors
      }
      console.error(
        `[auth] Backend auth failed:`,
        {
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get("content-type"),
          body: bodyPreview,
        },
      );
      return { ok: false, status: response.status };
    }

    const json = await response.json();
    if (
      !json.data?.user ||
      !json.data?.access_token ||
      !json.data?.refresh_token ||
      typeof json.data?.expires_in !== "number"
    ) {
      console.error("[auth] Backend returned 200 but missing required fields (user, access_token, refresh_token, or expires_in)");
      return { ok: false, status: null };
    }
    console.log("[auth] Backend auth succeeded, user:", json.data.user.email);
    return { ok: true, data: json.data };
  } catch (error) {
    console.error("[auth] Failed to exchange token with backend (network/timeout):", error);
    return { ok: false, status: null };
  }
}

async function refreshBackendToken(refreshToken: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
} | null> {
  const apiBaseUrl = validateAndLogApiBaseUrl();
  if (!apiBaseUrl) return null;

  try {
    const response = await fetch(`${apiBaseUrl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[auth] Backend token refresh failed:", {
        status: response.status,
        statusText: response.statusText,
      });
      return null;
    }

    const json = await response.json();
    if (
      !json.data?.access_token ||
      !json.data?.refresh_token ||
      typeof json.data?.expires_in !== "number"
    ) {
      console.error("[auth] Refresh endpoint returned 200 but unexpected body shape");
      return null;
    }
    return json.data;
  } catch {
    console.error("[auth] Backend token refresh failed");
    return null;
  }
}

// Deduplicate concurrent refresh requests per refresh token: if a refresh is
// already in-flight for a given token, subsequent callers reuse the same promise
// instead of issuing parallel refresh calls that can fail under strict rotation.
const inflightRefreshes = new Map<string, Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
} | null>>();

async function deduplicatedRefresh(refreshToken: string) {
  const existing = inflightRefreshes.get(refreshToken);
  if (existing) return existing;
  const promise = refreshBackendToken(refreshToken).finally(() => {
    inflightRefreshes.delete(refreshToken);
  });
  inflightRefreshes.set(refreshToken, promise);
  return promise;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      // First-time sign-in: exchange Google token with backend
      if (account) {
        console.log("[auth] First sign-in detected. Account keys:", Object.keys(account));
        console.log("[auth] Token types available:", {
          has_access_token: !!account.access_token,
          has_id_token: !!account.id_token,
          has_refresh_token: !!account.refresh_token,
          token_type: account.token_type,
          provider: account.provider,
          scope: account.scope,
        });

        const googleAccessToken = account.access_token;
        const googleIdToken = account.id_token;

        let result: ExchangeResult = { ok: false, status: null };

        // Primary attempt: use access_token (expected by backend)
        if (googleAccessToken) {
          result = await exchangeGoogleToken(googleAccessToken);
        }

        // Fallback: try id_token if access_token was absent or exchange returned 401
        if (!result.ok && (result.status === 401 || !googleAccessToken) && googleIdToken) {
          console.warn(
            !googleAccessToken
              ? "[auth] No access_token available, attempting exchange with id_token"
              : "[auth] access_token exchange returned 401, attempting fallback with id_token",
          );
          result = await exchangeGoogleToken(googleIdToken);
          if (result.ok) {
            console.warn(
              "[auth] id_token fallback SUCCEEDED — the backend expects id_token, not access_token. " +
              "Update the code to use id_token as the primary token.",
            );
          }
        }

        if (result.ok) {
          const backendAuth = result.data;
          token.backendAccessToken = backendAuth.access_token;
          token.backendRefreshToken = backendAuth.refresh_token;
          token.backendExpiresAt =
            Math.floor(Date.now() / 1000) + backendAuth.expires_in;
          token.backendUser = {
            id: backendAuth.user.id,
            email: backendAuth.user.email,
            firstName: backendAuth.user.first_name,
            lastName: backendAuth.user.last_name,
            roles: backendAuth.user.roles,
            status: backendAuth.user.status,
            isRoot: backendAuth.user.is_root,
            avatarUrl: backendAuth.user.avatar_url,
          };
          delete token.error;
        } else if (!googleAccessToken && !googleIdToken) {
          // Google sign-in did not return any usable token
          token.error = "BackendAuthError:no_token";
        } else if (result.status === null) {
          // Network or timeout error
          token.error = "BackendAuthError:network";
        } else {
          // Backend returned an HTTP error (e.g. 401, 403, 500)
          token.error = `BackendAuthError:${result.status}`;
        }
        return token;
      }

      // If the initial backend exchange failed, the session is permanently broken.
      // Surface the error so the middleware redirects to login for a fresh attempt.
      if (typeof token.error === "string" && token.error.startsWith("BackendAuthError")) {
        return token;
      }

      // Subsequent requests: check if backend token needs refresh.
      // Refresh 60 s before actual expiry to avoid using nearly-expired tokens.
      const REFRESH_BUFFER_S = 60;
      const nowSeconds = Math.floor(Date.now() / 1000);
      if (
        typeof token.backendExpiresAt === "number" &&
        nowSeconds >= token.backendExpiresAt - REFRESH_BUFFER_S
      ) {
        const refreshToken = token.backendRefreshToken as string;
        if (refreshToken) {
          const refreshed = await deduplicatedRefresh(refreshToken);
          if (refreshed) {
            token.backendAccessToken = refreshed.access_token;
            token.backendRefreshToken = refreshed.refresh_token;
            token.backendExpiresAt = nowSeconds + refreshed.expires_in;
            delete token.error;
          } else {
            // Clear the stale refresh token so we don't keep retrying with an
            // invalid token on every subsequent request.
            token.backendRefreshToken = undefined;
            token.error = "RefreshTokenError";
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.error = token.error as string | undefined;

      if (token.backendUser) {
        const bu = token.backendUser as {
          id: string;
          email: string;
          firstName: string;
          lastName: string;
          roles: string[];
          status: string;
          isRoot: boolean;
          avatarUrl: string;
        };
        if (session.user) {
          session.user.id = bu.id;
          session.user.email = bu.email;
          session.user.name = `${bu.firstName} ${bu.lastName}`;
          session.user.image = bu.avatarUrl;
        }
        session.backendUser = bu;
      }

      return session;
    },
  },
});
