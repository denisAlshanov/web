# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (auto-runs tokens:build first)
npm run build        # Production build (auto-runs tokens:build first)
npm run lint         # ESLint (flat config, ESLint 9)
npm run tokens:build # Transform Figma design tokens → CSS custom properties
```

No test framework is configured yet.

## Environment Setup

Copy `.env.example` to `.env.local` and fill in values. Required variables:
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Google OAuth credentials
- `AUTH_SECRET` — NextAuth secret
- `AUTH_URL` — App URL (default `http://localhost:3000`)
- `API_BASE_URL` — Backend API URL (default `http://localhost:8080`)

## Architecture

**Next.js 16 App Router** with React 19, TypeScript (strict), Tailwind CSS v4, and NextAuth v5.

### Key Directories

- `src/app/` — App Router pages and layouts
- `src/lib/auth.ts` — NextAuth config: Google OAuth provider, JWT callbacks, backend token exchange
- `src/lib/api-client.ts` — Typed API client with automatic token refresh and request deduplication
- `src/types/api.ts` — All backend API request/response types and enums
- `src/types/next-auth.d.ts` — Type augmentation for NextAuth session/JWT
- `src/middleware.ts` — Route protection (redirects unauthenticated users to `/login`)
- `src/styles/tokens.css` — Auto-generated CSS custom properties (do not edit manually)
- `tokens/` — Figma design token JSON files (DTCG format)
- `scripts/transform-tokens.ts` — Transforms token JSON into `src/styles/tokens.css`

### Authentication Flow

1. User signs in via Google OAuth (NextAuth v5)
2. JWT callback exchanges Google ID token with the backend API for `access_token`/`refresh_token`
3. Tokens + user data stored in the NextAuth JWT (session strategy: JWT, not database)
4. Middleware checks auth on all routes except `/login`, API routes, and static assets
5. Token refresh happens automatically 60s before expiry with deduplication of concurrent refresh requests

### API Client (`src/lib/api-client.ts`)

- Class-based, initialized with `baseUrl` and optional `accessToken`/`refreshToken`
- Handles 401 responses by refreshing the token and retrying
- `getServerApiClient()` creates an instance from the server-side NextAuth session
- Domain methods: Auth, Users, Shows, Episodes, Schedules

### Design Tokens

The `tokens:build` script reads `tokens/primitives.tokens.json` and `tokens/light-mode.tokens.json`, transforms DTCG-format tokens into CSS custom properties, and writes `src/styles/tokens.css`. This runs automatically before `dev` and `build` via npm pre-scripts.

### Components

See [docs/component-creation-guide.md](docs/component-creation-guide.md) for the full guide. Summary:

- **Approach**: Radix UI primitives (headless) + custom styling with design tokens
- **Variants**: `class-variance-authority` (CVA) for type-safe variant definitions
- **Utilities**: `cn()` helper (`clsx` + `tailwind-merge`) for className composition
- **Structure**: `src/components/ui/` (primitives), `src/components/features/` (domain composites), `src/components/layout/` (app shell)
- **Complex UI**: `@tanstack/react-table` for data tables, custom schedule/calendar components
- **Dev environment**: Storybook for isolated component development and design review
- **Icons**: Iconoir via `iconoir-react`; always use the `<Icon>` wrapper (`src/components/ui/icon.tsx`) instead of raw Iconoir components — it enforces design-token colors and consistent sizing
- **Rule**: All colors, spacing, and radii must use `var(--token-name)` from `src/styles/tokens.css` — never hardcode values

## Conventions

- **Path alias**: `@/*` maps to `./src/*`
- **Styling**: Tailwind CSS v4 with PostCSS plugin; design tokens as CSS custom properties
- **Fonts**: Geist Sans and Geist Mono via `next/font/google`, exposed as `--font-geist-sans` and `--font-geist-mono`
- **Package manager**: npm
