import type {
  AssignmentResponse,
  AssignUserRequest,
  AuthTokens,
  BlockUserRequest,
  ChangeStatusRequest,
  CreateEpisodeRequest,
  CreateScheduleRequest,
  CreateShowRequest,
  CreateUserRequest,
  DefaultTeamMemberResponse,
  EpisodeResponse,
  ErrorResponse,
  ListEpisodesParams,
  ListResponse,
  ListShowsParams,
  ListUsersParams,
  ScheduleCreateResponse,
  SchedulePreviewResponse,
  ScheduleResponse,
  SetDefaultTeamRequest,
  SetEmojiAvatarRequest,
  SetRolesRequest,
  ShowResponse,
  SuccessResponse,
  UpdateEpisodeRequest,
  UpdateScheduleEndDateRequest,
  UpdateShowRequest,
  UpdateUserRequest,
  UserResponse,
} from "@/types/api";

// ----------------------------------------------------------------
// Error
// ----------------------------------------------------------------

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: ErrorResponse,
  ) {
    super(body.error?.message ?? `API error ${status}`);
    this.name = "ApiError";
  }
}

// ----------------------------------------------------------------
// Client
// ----------------------------------------------------------------

export class ApiClient {
  private baseUrl: string;
  private accessToken: string;
  private refreshToken: string | undefined;
  private onTokenRefreshed: ((tokens: AuthTokens) => void) | undefined;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(opts: {
    baseUrl: string;
    accessToken: string;
    refreshToken?: string;
    onTokenRefreshed?: (tokens: AuthTokens) => void;
  }) {
    this.baseUrl = opts.baseUrl;
    this.accessToken = opts.accessToken;
    this.refreshToken = opts.refreshToken;
    this.onTokenRefreshed = opts.onTokenRefreshed;
  }

  // ---- low-level helpers ----

  private buildUrl(path: string, params?: Record<string, unknown>): string {
    const url = new URL(path, this.baseUrl);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null) {
          url.searchParams.set(k, String(v));
        }
      }
    }
    return url.toString();
  }

  private async request<T>(
    path: string,
    init: RequestInit = {},
    params?: Record<string, unknown>,
  ): Promise<T> {
    const url = this.buildUrl(path, params);
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.accessToken}`,
      ...(init.headers as Record<string, string>),
    };
    if (
      init.body &&
      typeof init.body === "string" &&
      !headers["Content-Type"]
    ) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(url, {
      ...init,
      headers,
      signal: init.signal ?? AbortSignal.timeout(30_000),
    });

    // 401 → try refresh once (deduplicated across concurrent requests)
    if (res.status === 401 && this.refreshToken) {
      const refreshed = await this.tryRefreshOnce();
      if (refreshed) {
        headers.Authorization = `Bearer ${this.accessToken}`;
        const retry = await fetch(url, {
          ...init,
          headers,
          signal: init.signal ?? AbortSignal.timeout(30_000),
        });
        return this.handleResponse<T>(retry);
      }
      // Refresh failed — fall through to handle original 401
    }

    return this.handleResponse<T>(res);
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (res.status === 204) return undefined as T;
    let json: unknown;
    try {
      json = await res.json();
    } catch {
      throw new ApiError(res.status, {
        error: { code: "PARSE_ERROR", message: `Non-JSON response (${res.status})` },
      });
    }
    if (!res.ok) throw new ApiError(res.status, json as ErrorResponse);
    return json as T;
  }

  private async tryRefresh(): Promise<boolean> {
    try {
      const res = await fetch(this.buildUrl("/auth/refresh"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: this.refreshToken }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) return false;
      const json = (await res.json()) as SuccessResponse<AuthTokens>;
      this.accessToken = json.data.access_token;
      this.refreshToken = json.data.refresh_token;
      this.onTokenRefreshed?.(json.data);
      return true;
    } catch {
      console.error("Token refresh failed");
      return false;
    }
  }

  private async tryRefreshOnce(): Promise<boolean> {
    if (!this.refreshPromise) {
      this.refreshPromise = this.tryRefresh().finally(() => {
        this.refreshPromise = null;
      });
    }
    return this.refreshPromise;
  }

  private get<T>(path: string, params?: Record<string, unknown>) {
    return this.request<T>(path, { method: "GET" }, params);
  }

  private post<T>(path: string, body?: unknown) {
    return this.request<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  private patch<T>(path: string, body: unknown) {
    return this.request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  private put<T>(path: string, body: unknown) {
    return this.request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  private del<T>(path: string) {
    return this.request<T>(path, { method: "DELETE" });
  }

  // ================================================================
  // Auth
  // ================================================================

  logout() {
    return this.post<void>("/auth/logout");
  }

  // ================================================================
  // Users
  // ================================================================

  listUsers(params?: ListUsersParams) {
    return this.get<ListResponse<UserResponse>>(
      "/api/v1/users",
      params as Record<string, unknown>,
    );
  }

  createUser(body: CreateUserRequest) {
    return this.post<SuccessResponse<UserResponse>>("/api/v1/users", body);
  }

  getUser(id: string) {
    return this.get<SuccessResponse<UserResponse>>(`/api/v1/users/${encodeURIComponent(id)}`);
  }

  updateUser(id: string, body: UpdateUserRequest) {
    return this.patch<SuccessResponse<UserResponse>>(
      `/api/v1/users/${encodeURIComponent(id)}`,
      body,
    );
  }

  getCurrentUser() {
    return this.get<SuccessResponse<UserResponse>>("/api/v1/users/me");
  }

  setUserRoles(id: string, body: SetRolesRequest) {
    return this.put<SuccessResponse<UserResponse>>(
      `/api/v1/users/${encodeURIComponent(id)}/roles`,
      body,
    );
  }

  blockUser(id: string, body: BlockUserRequest) {
    return this.post<SuccessResponse<UserResponse>>(
      `/api/v1/users/${encodeURIComponent(id)}/block`,
      body,
    );
  }

  unblockUser(id: string) {
    return this.post<SuccessResponse<UserResponse>>(
      `/api/v1/users/${encodeURIComponent(id)}/unblock`,
    );
  }

  setUserEmojiAvatar(id: string, body: SetEmojiAvatarRequest) {
    return this.put<SuccessResponse<UserResponse>>(
      `/api/v1/users/${encodeURIComponent(id)}/avatar/emoji`,
      body,
    );
  }

  // ================================================================
  // Shows
  // ================================================================

  listShows(params?: ListShowsParams) {
    return this.get<ListResponse<ShowResponse>>(
      "/api/v1/shows",
      params as Record<string, unknown>,
    );
  }

  createShow(body: CreateShowRequest) {
    return this.post<SuccessResponse<ShowResponse>>("/api/v1/shows", body);
  }

  getShow(id: string) {
    return this.get<SuccessResponse<ShowResponse>>(`/api/v1/shows/${encodeURIComponent(id)}`);
  }

  updateShow(id: string, body: UpdateShowRequest) {
    return this.patch<SuccessResponse<ShowResponse>>(
      `/api/v1/shows/${encodeURIComponent(id)}`,
      body,
    );
  }

  archiveShow(id: string) {
    return this.post<SuccessResponse<ShowResponse>>(
      `/api/v1/shows/${encodeURIComponent(id)}/archive`,
    );
  }

  pauseShow(id: string) {
    return this.post<SuccessResponse<ShowResponse>>(
      `/api/v1/shows/${encodeURIComponent(id)}/pause`,
    );
  }

  resumeShow(id: string) {
    return this.post<SuccessResponse<ShowResponse>>(
      `/api/v1/shows/${encodeURIComponent(id)}/resume`,
    );
  }

  setDefaultTeam(showId: string, body: SetDefaultTeamRequest) {
    return this.put<SuccessResponse<DefaultTeamMemberResponse[]>>(
      `/api/v1/shows/${encodeURIComponent(showId)}/default-team`,
      body,
    );
  }

  // ================================================================
  // Episodes
  // ================================================================

  listEpisodes(params?: ListEpisodesParams) {
    return this.get<ListResponse<EpisodeResponse>>(
      "/api/v1/episodes",
      params as Record<string, unknown>,
    );
  }

  createEpisode(body: CreateEpisodeRequest) {
    return this.post<SuccessResponse<EpisodeResponse>>(
      "/api/v1/episodes",
      body,
    );
  }

  getEpisode(id: string) {
    return this.get<SuccessResponse<EpisodeResponse>>(`/api/v1/episodes/${encodeURIComponent(id)}`);
  }

  updateEpisode(id: string, body: UpdateEpisodeRequest) {
    return this.patch<SuccessResponse<EpisodeResponse>>(
      `/api/v1/episodes/${encodeURIComponent(id)}`,
      body,
    );
  }

  changeEpisodeStatus(id: string, body: ChangeStatusRequest) {
    return this.post<SuccessResponse<EpisodeResponse>>(
      `/api/v1/episodes/${encodeURIComponent(id)}/status`,
      body,
    );
  }

  listEpisodeAssignments(episodeId: string) {
    return this.get<SuccessResponse<AssignmentResponse[]>>(
      `/api/v1/episodes/${encodeURIComponent(episodeId)}/assignments`,
    );
  }

  assignUser(episodeId: string, body: AssignUserRequest) {
    return this.post<SuccessResponse<AssignmentResponse>>(
      `/api/v1/episodes/${encodeURIComponent(episodeId)}/assignments`,
      body,
    );
  }

  unassignUser(episodeId: string, assignmentId: string) {
    return this.del<void>(
      `/api/v1/episodes/${encodeURIComponent(episodeId)}/assignments/${encodeURIComponent(assignmentId)}`,
    );
  }

  listMyEpisodes(params?: ListEpisodesParams) {
    return this.get<ListResponse<EpisodeResponse>>(
      "/api/v1/users/me/episodes",
      params as Record<string, unknown>,
    );
  }

  // ================================================================
  // Schedules
  // ================================================================

  listSchedules(showId: string) {
    return this.get<SuccessResponse<ScheduleResponse[]>>(
      `/api/v1/shows/${encodeURIComponent(showId)}/schedules`,
    );
  }

  createSchedule(showId: string, body: CreateScheduleRequest) {
    return this.post<SuccessResponse<ScheduleCreateResponse>>(
      `/api/v1/shows/${encodeURIComponent(showId)}/schedules`,
      body,
    );
  }

  previewSchedule(showId: string, body: CreateScheduleRequest) {
    return this.post<SuccessResponse<SchedulePreviewResponse>>(
      `/api/v1/shows/${encodeURIComponent(showId)}/schedules/preview`,
      body,
    );
  }

  updateScheduleEndDate(
    showId: string,
    scheduleId: string,
    body: UpdateScheduleEndDateRequest,
  ) {
    return this.patch<SuccessResponse<ScheduleResponse>>(
      `/api/v1/shows/${encodeURIComponent(showId)}/schedules/${encodeURIComponent(scheduleId)}`,
      body,
    );
  }

  deleteSchedule(showId: string, scheduleId: string) {
    return this.del<void>(
      `/api/v1/shows/${encodeURIComponent(showId)}/schedules/${encodeURIComponent(scheduleId)}`,
    );
  }
}

// ----------------------------------------------------------------
// Server helper
// ----------------------------------------------------------------

/**
 * Create an API client using the current server-side session.
 *
 * Uses the `jwt` callback from NextAuth to decode the raw JWT, which contains
 * `backendAccessToken` and `backendRefreshToken` stored during sign-in.
 * These fields are not exposed via the public `session` object to avoid
 * leaking tokens to the client.
 */
export async function getServerApiClient(): Promise<ApiClient> {
  // Import the decode helper lazily to avoid circular dependency issues.
  const { decode } = await import("next-auth/jwt");

  // next-auth stores the JWT in a cookie named after the NEXTAUTH_URL host.
  // On the server side we can read the token directly from the cookie jar.
  const { cookies } = await import("next/headers");
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";
  const cookieStore = await cookies();
  const raw = cookieStore.get(cookieName)?.value;
  if (!raw) {
    throw new Error("No authenticated session");
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured");
  }

  const token = await decode({ token: raw, secret, salt: cookieName });
  const accessToken = token?.backendAccessToken as string | undefined;
  if (!accessToken) {
    throw new Error("No backend access token in session");
  }

  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not configured");
  }

  const refreshToken = token?.backendRefreshToken as string | undefined;

  // Note: we intentionally omit onTokenRefreshed here. In Server Components,
  // cookies().set() throws because cookies are read-only during rendering.
  // Token refresh is handled by the NextAuth JWT callback on subsequent requests.
  return new ApiClient({
    baseUrl,
    accessToken,
    refreshToken,
  });
}
