import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

async function exchangeGoogleToken(idToken: string): Promise<{
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
} | null> {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) {
    console.error("API_BASE_URL is not configured");
    return null;
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/auth/google/callback?code=${encodeURIComponent(idToken)}`,
      { method: "GET" }
    );

    if (!response.ok) {
      console.error(
        "Backend auth failed:",
        response.status,
        await response.text()
      );
      return null;
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Failed to exchange token with backend:", error);
    return null;
  }
}

async function refreshBackendToken(refreshToken: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
} | null> {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) return null;

  try {
    const response = await fetch(`${apiBaseUrl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) return null;

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Backend token refresh failed:", error);
    return null;
  }
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
        const idToken = account.id_token;
        if (idToken) {
          const backendAuth = await exchangeGoogleToken(idToken);
          if (backendAuth) {
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
          } else {
            // Backend auth failed — prevent creating a session without backend tokens
            token.error = "BackendAuthError";
          }
        }
        return token;
      }

      // Subsequent requests: check if backend token needs refresh
      if (
        token.backendExpiresAt &&
        Date.now() >= (token.backendExpiresAt as number) * 1000
      ) {
        const refreshToken = token.backendRefreshToken as string;
        if (refreshToken) {
          const refreshed = await refreshBackendToken(refreshToken);
          if (refreshed) {
            token.backendAccessToken = refreshed.access_token;
            token.backendRefreshToken = refreshed.refresh_token;
            token.backendExpiresAt =
              Math.floor(Date.now() / 1000) + refreshed.expires_in;
          } else {
            token.error = "RefreshTokenError";
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.backendAccessToken = token.backendAccessToken as string;
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
        session.user.id = bu.id;
        session.user.email = bu.email;
        session.user.name = `${bu.firstName} ${bu.lastName}`;
        session.user.image = bu.avatarUrl;
        session.backendUser = bu;
      }

      return session;
    },
  },
});
