# Fix Google OAuth 401 on Backend Token Exchange

## Overview

Fix the persistent Google OAuth 401 error on backend token exchange by adding comprehensive debug logging, trying the id_token as a fallback, and improving error handling so the root cause becomes visible.

The current code sends `{ token: account.access_token }` to `POST /auth/google/token`. Despite prior fixes (PR #17), the backend still returns 401. Since we cannot inspect the backend code, the plan systematically addresses the most likely causes: wrong token type, wrong field name, missing token data, or environmental misconfiguration.

## Context

- Files involved:
  - Modify: `src/lib/auth.ts` (main changes)
  - Modify: `src/app/auth-error/page.tsx` (show more detail)
  - Modify: `src/app/login/page.tsx` (surface error detail)
- Related patterns: existing `exchangeGoogleToken` function, NextAuth JWT callback, error state propagation via `token.error`
- Dependencies: none (no new packages)

## Implementation Strategy

- **Testing approach**: Manual testing (no test framework configured)
- Complete each task fully before moving to the next

---

## Task 1: Add comprehensive debug logging to the token exchange

**Files:**
- Modify: `src/lib/auth.ts`

**Steps:**
- [ ] In the JWT callback, log the full `account` object keys and available token types (access_token, id_token, etc.) on first sign-in to diagnose what Google actually provides
- [ ] In `exchangeGoogleToken`, log the request URL, payload shape (not the actual token value), and the full response status + body on failure
- [ ] Add a structured error message that includes the backend response body so it's visible in server logs

---

## Task 2: Try id_token as fallback when access_token exchange fails

**Files:**
- Modify: `src/lib/auth.ts`

**Steps:**
- [x] After the access_token exchange fails with 401, attempt the same exchange using `account.id_token` (Google OIDC JWT) as a fallback
- [x] If the id_token exchange succeeds, log a warning indicating the backend expects id_token so the code can be updated permanently
- [x] Keep the access_token as the primary attempt since the user confirmed that's what the backend expects

---

## Task 3: Improve error detail surfacing to the user

**Files:**
- Modify: `src/lib/auth.ts`
- Modify: `src/app/auth-error/page.tsx`

**Steps:**
- [ ] Store a more specific error reason in the JWT (e.g., "BackendAuthError:401" vs "BackendAuthError:network" vs "BackendAuthError:no_token") so the UI can show a more helpful message
- [ ] Update the auth-error page to distinguish between "account not approved" (current message) and "authentication service error" (new case for 401/network failures)

---

## Task 4: Validate environment and add startup checks

**Files:**
- Modify: `src/lib/auth.ts`

**Steps:**
- [ ] Add a runtime check that `API_BASE_URL` is set and reachable at the point of token exchange, logging a clear error if not
- [ ] Log the target URL (without tokens) at startup/first-use so misconfigured API_BASE_URL is immediately visible

---

## Verification

- [ ] Manual test: Sign in with Google and observe server logs for the debug output
- [ ] Manual test: Verify the auth-error page shows appropriate messages
- [ ] Run linter: `npm run lint`

---

## Wrap-up

- [ ] Update CLAUDE.md if any auth flow patterns changed
- [ ] Move this plan to `docs/plans/completed/`
