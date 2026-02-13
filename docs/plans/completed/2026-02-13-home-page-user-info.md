# Plan: Home Page User Info Display

Replace the default Next.js boilerplate on the home page with a server component that calls GET /api/v1/users/me via the existing ApiClient and displays the returned user info.

## Context

- Files involved:
  - Modify: `src/app/page.tsx`
- Related patterns: `getServerApiClient()` in `src/lib/api-client.ts`, `getCurrentUser()` method, `UserResponse` type, design token typography utilities
- Dependencies: None new - uses existing ApiClient and auth infrastructure

## Approach

- **Testing approach**: Manual (no test framework configured)
- Complete each task fully before moving to the next
- Use existing `getServerApiClient()` and `getCurrentUser()` from the API client
- Style with project typography utilities and design tokens

## Implementation

### Task 1: Replace home page with user profile display

**Files:**
- Modify: `src/app/page.tsx`

**Steps:**
- [x] Convert page.tsx to an async Server Component
- [x] Import `getServerApiClient` from `@/lib/api-client`
- [x] Call `getServerApiClient()` then `getCurrentUser()` to fetch user data from GET /api/v1/users/me
- [x] Replace the Next.js boilerplate markup with a simple display of user info (name, email, roles, status)
- [x] Use the project's typography utilities (`text-heading-l`, `text-medium-m`, etc.) and design tokens for styling
- [x] Handle the API error case with a user-friendly message

## Verification

- [x] Manual test: log in via Google OAuth, confirm the home page shows user name, email, and roles from the backend
- [x] Manual test: verify that unauthenticated users are still redirected to /login by the middleware
- [x] Run linter: `npm run lint`

## Cleanup

- [x] Move this plan to `docs/plans/completed/`
