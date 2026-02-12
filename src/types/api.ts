// ---------------- Enums / Literal unions ----------------

export type EpisodeRole = "director" | "host" | "producer";
export type EpisodeStatus = "upcoming" | "draft" | "ready" | "live" | "finished" | "canceled";
export type ManualStatusTransition = "draft" | "ready" | "canceled";
export type ShowStatus = "draft" | "active" | "paused" | "archived";
export type UserStatus = "pending" | "active" | "blocked";
export type SystemRole = "admin" | "director" | "host" | "producer";

// ---------------- Response DTOs ----------------

export interface UserResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
  status: string;
  is_root: boolean;
  avatar_type: string;
  avatar_url: string;
  timezone: string;
  blocked_at: string;
  blocked_by: string;
  blocked_reason: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: UserResponse;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface AssignmentResponse {
  id: string;
  episode_id: string;
  user_id: string;
  role: string;
  is_auto: boolean;
  assigned_at: string;
}

export interface EpisodeResponse {
  id: string;
  show_id: string;
  schedule_id: string;
  title: string;
  status: string;
  scheduled_at: string;
  ends_at: string;
  duration: string;
  timezone: string;
  assignments: AssignmentResponse[];
  created_at: string;
  updated_at: string;
}

export interface DefaultTeamMemberResponse {
  id: string;
  user_id: string;
  role: string;
}

export interface ScheduleResponse {
  id: string;
  show_id: string;
  rrule: string;
  start_date: string;
  end_date: string | null;
  episode_start_time: string;
  episode_duration: string;
  timezone: string;
  created_at: string;
}

export interface ShowResponse {
  id: string;
  name: string;
  status: string;
  avatar_type: string;
  avatar_url: string;
  default_team: DefaultTeamMemberResponse[];
  schedules: ScheduleResponse[];
  created_at: string;
  updated_at: string;
}

export interface ScheduleCreateResponse {
  schedule: ScheduleResponse;
  episodes_generated: number;
  episodes_deleted: number;
}

export interface SchedulePreviewConflictResponse {
  schedule_id: string;
  new_end_date: string;
}

export interface SchedulePreviewResponse {
  episode_dates: string[];
  total_episodes: number;
  conflicts: SchedulePreviewConflictResponse[];
}

// ---------------- Pagination ----------------

export interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

// ---------------- Generic wrappers ----------------

export interface SuccessResponse<T> {
  data: T;
}

export interface ListResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface ErrorBody {
  code: string;
  message: string;
  details?: unknown;
}

export interface ErrorResponse {
  error: ErrorBody;
}

// ---------------- Request DTOs ----------------

export interface CreateUserRequest {
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  timezone?: string;
}

export interface SetRolesRequest {
  roles: string[];
}

export interface BlockUserRequest {
  reason: string;
}

export interface SetEmojiAvatarRequest {
  emoji: string;
}

export interface CreateShowRequest {
  name: string;
  avatar_emoji?: string;
}

export interface UpdateShowRequest {
  name?: string;
  avatar_emoji?: string;
}

export interface DefaultTeamMemberDTO {
  user_id: string;
  role: EpisodeRole;
}

export interface SetDefaultTeamRequest {
  members: DefaultTeamMemberDTO[];
}

export interface CreateEpisodeRequest {
  show_id: string;
  title: string;
  scheduled_at: string;
  duration: string;
  timezone: string;
}

export interface UpdateEpisodeRequest {
  title?: string;
  scheduled_at?: string;
  duration?: string;
}

export interface ChangeStatusRequest {
  status: ManualStatusTransition;
}

export interface AssignUserRequest {
  user_id: string;
  role: EpisodeRole;
}

export interface CreateScheduleRequest {
  rrule: string;
  start_date: string;
  end_date?: string | null;
  episode_start_time: string;
  episode_duration: string;
  timezone: string;
}

export interface UpdateScheduleEndDateRequest {
  end_date: string | null;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

// ---------------- Query parameter types ----------------

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface ListEpisodesParams extends PaginationParams {
  show_id?: string;
  status?: EpisodeStatus;
  from?: string;
  to?: string;
}

export interface ListShowsParams extends PaginationParams {
  status?: ShowStatus;
  search?: string;
}

export interface ListUsersParams extends PaginationParams {
  status?: UserStatus;
  role?: SystemRole;
  search?: string;
}
