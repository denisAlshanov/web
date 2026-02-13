# Auth Error Page (Unsuccessful Authorization)

## Overview

Implement the "Approval Error" page - an unsuccessful authorization page shown when a user's account has not been set up/approved. The page displays a warning icon, heading, description, and a "Go Back" button. It follows the same layout pattern as the existing login page.

The page will be accessible at `/auth-error` and will be shown when the backend auth exchange fails because the account is not approved. The existing auth flow already sets `token.error = "BackendAuthError"` when the backend rejects the token exchange - this page will handle that specific case.

## Context

- **Files involved:**
  - Create: `src/app/auth-error/page.tsx` (the new approval error page)
  - Modify: `src/middleware.ts` (allow unauthenticated access to `/auth-error`, redirect `BackendAuthError` to `/auth-error` instead of `/login`)
  - Modify: `src/lib/auth.ts` (potentially differentiate "account not approved" from other backend errors)
- **Related patterns:** Existing login page layout (logo top-left, centered content at `pt-[320px]`, `792px` max-width container), Button component (secondary variant, lg size), Icon component with iconoir-react, design token CSS variables
- **Dependencies:** `iconoir-react` (already installed - `WarningTriangle` icon)

## Implementation Strategy

- **Testing approach**: Regular (code first, then lint)
- Follow existing login page patterns exactly
- Use design tokens for all colors, spacing, and radii
- No test framework is configured yet, so verification is via lint and manual testing

## Tasks

### Task 1: Create the auth-error page

**Files:**
- Create: `src/app/auth-error/page.tsx`

- [x] Build the page component matching the Figma design:
  - MediaPlans logo top-left (reuse `MediaPlansLogo` component)
  - Centered container (`max-w-[792px]`, `pt-[320px]`) matching login page layout
  - Warning triangle icon (`WarningTriangle` from iconoir-react, wrapped in `Icon` component, color="warning", size="md")
  - Heading: "Seems like this account has not been set up yet." (`text-heading-m`, heavy color)
  - Description: "Contact your company to make sure your account is being approved." (`text-medium-l`, default color)
  - "Go Back" button (secondary variant, lg size) that navigates back to `/login` and signs out the broken session
- [x] Use design tokens for all colors, spacing, and radii
- [x] Use existing typography utility classes (`text-heading-m`, `text-medium-l`)

### Task 2: Update middleware to route auth errors to the new page

**Files:**
- Modify: `src/middleware.ts`

- [x] Add `/auth-error` to the list of pages that don't require authentication (alongside `/login`)
- [x] When a user has `req.auth.error === "BackendAuthError"`, redirect to `/auth-error` instead of `/login`
- [x] Keep existing behavior for `RefreshTokenError` (redirect to `/login` with error param)
- [x] Redirect authenticated users away from `/auth-error` (same pattern as login page)

### Task 3: Verify and lint

- [x] Run `npm run lint` to ensure no lint errors
- [x] Run `npm run build` to ensure the build succeeds
- [x] Manually verify the page renders correctly

## Verification Checklist

- [x] Manual test: navigate to `/auth-error` directly and verify layout matches Figma
- [x] Manual test: simulate `BackendAuthError` and verify redirect to `/auth-error`
- [x] Manual test: click "Go Back" button and verify navigation to `/login`
- [x] Run `npm run lint`
- [x] Run `npm run build`

## Post-Implementation

- [x] Move this plan to `docs/plans/completed/`
