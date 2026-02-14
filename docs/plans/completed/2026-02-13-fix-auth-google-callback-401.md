# Fix Auth: Google Callback 401 Error

Fix the auth token exchange between the NextAuth JWT callback and the backend API. The frontend currently sends the Google id_token in a field named "code" which likely doesn't match what the backend expects. Add diagnostic logging to capture the actual backend error response, then fix the request payload.

## Context

- Files involved: `src/lib/auth.ts`
- Related patterns: existing error handling in `src/lib/api-client.ts`, `AuthResponse` type in `src/types/api.ts`
- Dependencies: none (backend API contract needs to be verified via improved logging)

## Implementation Notes

- **Testing approach**: Manual (no test framework configured)
- Complete each task fully before moving to the next
- The root cause is in `exchangeGoogleToken` in `src/lib/auth.ts` — it sends `{ code: idToken }` where `idToken` is a Google `id_token` JWT. The backend likely expects a different field name or token type.

## Task 1: Add diagnostic logging to exchangeGoogleToken

**Files:**
- Modify: `src/lib/auth.ts`

- [x] In the `exchangeGoogleToken` function, when `response.ok` is false (line 33-34), read and log the response body text so the actual backend error message is visible in server logs
- [x] Log the request URL being called (masked token) so connectivity issues are visible
- [x] Test by attempting a Google sign-in and checking server console output for the detailed error

## Task 2: Fix the request payload field name

**Files:**
- Modify: `src/lib/auth.ts`

- [x] Based on the diagnostic output from Task 1, fix the request body in `exchangeGoogleToken` — the most likely issue is that the backend expects `{ id_token: ... }` instead of `{ code: ... }` (line 29)
- [x] If the backend actually expects an authorization code (not an id_token), configure the NextAuth Google provider to pass the code through by using a custom token endpoint or the `token` callback
- [x] Verify the fix by completing a full Google sign-in flow successfully

## Validation

- [x] manual test: complete Google OAuth sign-in flow end-to-end — user should land on home page with profile data
- [x] run linter: `npm run lint`

## Cleanup

- [x] move this plan to `docs/plans/completed/`
