# Initialize Next.js Project with NextAuth, API Client, and Design Tokens

## Context

Initialize Next.js (App Router) project with TypeScript, NextAuth Google OAuth, API client layer, and Figma design token pipeline.

- **Files involved:**
  - package.json, tsconfig.json, next.config.ts, .env.example (Next.js scaffolding)
  - src/app/layout.tsx, src/app/page.tsx (App Router root)
  - src/app/api/auth/[...nextauth]/route.ts (NextAuth route handler)
  - src/lib/auth.ts (NextAuth config with Google provider + backend JWT sync)
  - src/lib/api-client.ts (typed fetch wrapper for backend API)
  - src/types/api.ts (TypeScript types matching swagger spec)
  - src/types/next-auth.d.ts (NextAuth type augmentation)
  - src/middleware.ts (route protection via NextAuth)
  - src/styles/tokens.css (CSS custom properties from Figma tokens)
  - scripts/transform-tokens.ts (Figma token JSON to CSS variables converter)
  - tokens/ directory (move existing token files here)
- **Related patterns:** Next.js App Router conventions, NextAuth v5 patterns
- **Dependencies:** next, react, react-dom, next-auth@beta, @auth/core, typescript, eslint

## Implementation approach

- **Testing approach**: Regular (code first, then verify builds pass)
- Complete each task fully before moving to the next
- Auth strategy: NextAuth Google provider independently, pass Google token to backend for verification
- Backend API spec: https://github.com/denisAlshanov/api/blob/main/docs/swagger.yaml
- Figma tokens are in DTCG format with color scales and semantic interface tokens

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: package.json, tsconfig.json, next.config.ts, .env.example
- Create: src/app/layout.tsx, src/app/page.tsx, src/app/globals.css

- [x] Run `npx create-next-app@latest . --typescript --app --tailwind --eslint --src-dir --import-alias "@/*"` in the repo (with --no-git to preserve existing git)
- [x] Configure .env.example with placeholders: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL, API_BASE_URL
- [x] Add .env.example to git tracking, ensure .env and .env.local stay in .gitignore
- [x] Verify `npm run dev` starts without errors
- [x] Verify `npm run build` completes without errors

## Task 2: Set up NextAuth with Google provider

**Files:**
- Create: src/lib/auth.ts
- Create: src/app/api/auth/[...nextauth]/route.ts
- Create: src/types/next-auth.d.ts

- [x] Install next-auth v5 (beta): `npm install next-auth@beta`
- [x] Create src/lib/auth.ts with NextAuth config: Google provider, JWT strategy, callbacks to store Google id_token in the session
- [x] In the NextAuth jwt callback: after Google sign-in, call backend /auth/google/callback (passing Google auth code or token) to obtain backend access_token + refresh_token, store them in the JWT
- [x] In the NextAuth session callback: expose backend access_token and user info to the client session
- [x] Create src/types/next-auth.d.ts to augment Session and JWT types with backendAccessToken, backendRefreshToken, user fields
- [x] Create the App Router catch-all route handler at src/app/api/auth/[...nextauth]/route.ts
- [x] Test: Google sign-in flow works end-to-end (manual test with env vars set)

## Task 3: Create typed API client

**Files:**
- Create: src/types/api.ts
- Create: src/lib/api-client.ts

- [x] Create src/types/api.ts with TypeScript interfaces matching all swagger DTOs: AuthResponse, UserResponse, ShowResponse, EpisodeResponse, ScheduleResponse, AssignmentResponse, pagination types, error types, and all request DTOs
- [x] Create src/lib/api-client.ts: a fetch-based client class that takes base URL + access token, provides typed methods for all API endpoints grouped by domain (auth, users, shows, episodes, schedules)
- [x] Include automatic token refresh logic: if a 401 is returned, use refresh_token to get new tokens via /auth/refresh, retry the request
- [x] Export a helper getServerApiClient() that creates an API client instance from the current NextAuth session (for server components/actions)

## Task 4: Add auth middleware for route protection

**Files:**
- Create: src/middleware.ts
- Create: src/app/login/page.tsx

- [x] Create src/middleware.ts using NextAuth middleware to protect routes
- [x] Configure matcher to protect all routes except: /api/auth/*, /login, /_next/*, /favicon.ico, static assets
- [x] Create a minimal src/app/login/page.tsx with Google sign-in button using next-auth/react signIn()

## Task 5: Transform Figma design tokens to CSS custom properties

**Files:**
- Create: scripts/transform-tokens.ts
- Create: src/styles/tokens.css
- Move: "Light Mode.tokens.json" -> tokens/light-mode.tokens.json
- Move: "Mode 1.tokens.json" -> tokens/primitives.tokens.json

- [x] Move token files to tokens/ directory with clean filenames (no spaces)
- [x] Create scripts/transform-tokens.ts: reads both token JSON files, resolves references between them, outputs CSS custom properties file
- [x] Handle Figma DTCG token format: resolve $value references like {colour.brandMode.primary.50}, convert SRGB color components to hex/rgb, flatten nested keys to CSS variable names (e.g. --colour-interface-surface-base)
- [x] Generate src/styles/tokens.css with :root block containing all resolved color tokens
- [x] Add npm script "tokens:build" in package.json to run the transform
- [x] Import tokens.css in src/app/globals.css
- [x] Run the transform and verify the output CSS is valid

## Task 6: Verify full build and clean up

**Files:**
- Modify: package.json (scripts)

- [ ] Run `npm run build` and fix any TypeScript errors
- [ ] Run `npm run lint` and fix any lint errors
- [ ] Verify dev server starts and login page renders
- [ ] Ensure all created files follow Next.js App Router conventions

---

## Validation checklist

- [ ] manual test: dev server starts with `npm run dev`
- [ ] manual test: /login page renders with Google sign-in button
- [ ] manual test: build succeeds with `npm run build`
- [ ] run linter: `npm run lint`
- [ ] verify tokens.css is generated from Figma token files

## Wrap-up

- [ ] move this plan to `docs/plans/completed/`
