# Home Page — MVP Empty State

## Overview
- Replace the current placeholder home page (`src/app/page.tsx`) with the Figma design: a layout shell (sidebar + header) wrapping a centered empty state message
- Create a reusable **authenticated layout** component that composes `SideNavbar`, `PageHeader`, and `AccountSettings` — so all future authenticated pages share the same shell
- Auth protection already works via middleware — unauthorized users redirect to `/login`, no changes needed there

## Context (from discovery)
- **Files to modify**: `src/app/page.tsx` (home page)
- **Files to create**: `src/components/layout/app-layout.tsx` (authenticated layout shell), `src/components/ui/empty-state.tsx` (reusable empty state)
- **Existing components to reuse**: `SideNavbar` (`src/components/layout/side-navbar.tsx`), `PageHeader` (`src/components/layout/page-header.tsx`), `AccountSettings` (`src/components/ui/account-settings.tsx`)
- **Auth infrastructure**: middleware already handles redirect to `/login` for unauthenticated users — no changes needed
- **Styling**: Tailwind CSS v4 + design tokens (`var(--token-name)`)
- **Figma reference**: https://www.figma.com/design/D8ZhjgOIoPF5hKMGIMaQkR/MediaPlans---Main?node-id=1121-15709

## Figma Design Summary
The page shows:
- **Left**: Collapsed side navbar (120px wide) with logo + 6 icon nav items (Home active, Shows, Calendar, Team, Guests, Manage)
- **Top**: Page header with "Home" heading (text-heading-l) and AccountSettings dropdown in top-right
- **Center**: Empty state text — "Nothing to see here (yet)." (text-heading-l, heavy color) + "Come back later to check if there's someone new!" (text-medium-l, default color)

## Development Approach
- **Testing approach**: Regular (implement first, then tests)
- Complete each task fully before moving to the next
- Make small, focused changes
- **CRITICAL: every task MUST include new/updated tests** for code changes in that task
- **CRITICAL: all tests must pass before starting next task**
- **CRITICAL: update this plan file when scope changes during implementation**
- Run tests after each change

## Testing Strategy
- **Unit tests**: required for every task (React Testing Library + Vitest)
- Test rendering, accessibility, and component composition

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create EmptyState component
- [x] Create `src/components/ui/empty-state.tsx` — a simple, reusable presentational component
  - Props: `heading: string`, `description: string`, `className?: string`
  - Renders heading as `text-heading-l` in `--colour-interface-text-heavy`
  - Renders description as `text-medium-l` in `--colour-interface-text-default`
  - Centered layout with `gap-[var(--number-spacing-gap-gap-m)]` between heading and description
- [x] Write unit tests in `src/components/ui/__tests__/empty-state.test.tsx`
  - Test: renders heading and description text
  - Test: applies custom className
  - Test: uses correct semantic markup (heading element)
- [x] Run tests — must pass before next task

### Task 2: Create AppLayout component (authenticated layout shell)
- [x] Create `src/components/layout/app-layout.tsx` — client component composing SideNavbar + PageHeader + content area
  - Props: `heading: string`, `activeNavItem?: NavItemId` (defaults to `"home"`), `children: React.ReactNode`
  - Layout structure: flex row → SideNavbar (collapsed by default) | flex column → PageHeader (with AccountSettings from session) + scrollable content area
  - SideNavbar starts collapsed (`defaultCollapsed={true}`) per Figma
  - PageHeader gets `heading` prop, `tabbedView={false}`, and `accountSettings` slot with `AccountSettings` widget
  - Content area fills remaining space and centers children vertically/horizontally
- [x] Wire `AccountSettings` to use session data (user name from NextAuth session via `useSession()`)
  - Sign out via `signOut()` from `next-auth/react`
- [x] Write unit tests in `src/components/layout/__tests__/app-layout.test.tsx`
  - Test: renders SideNavbar, PageHeader with heading, and children content
  - Test: passes activeNavItem to SideNavbar
  - Mock `useSession` to provide test user data
- [x] Run tests — must pass before next task

### Task 3: Update home page to use new layout + empty state
- [x] Rewrite `src/app/page.tsx` to use `AppLayout` with `heading="Home"` and `activeNavItem="home"`
  - Render `EmptyState` with heading="Nothing to see here (yet)." and description="Come back later to check if there's someone new!"
  - Remove the old user profile display and `getServerApiClient()` fetch (no longer needed for MVP)
  - Page can be a simple server component (no data fetching needed)
- [x] Write unit tests in `src/app/__tests__/page.test.tsx`
  - Test: renders the empty state heading and description
  - Test: renders within AppLayout (check for nav landmark, heading)
- [x] Run tests — must pass before next task

### Task 4: Verify acceptance criteria
- [x] Verify home page matches Figma design: sidebar (collapsed) + header ("Home") + centered empty state text
- [x] Verify unauthorized users are redirected to `/login` (existing middleware — manual check)
- [x] Verify authorized users see the home page
- [x] Run full test suite (`npm run test`)
- [x] Run linter (`npm run lint`) — all issues must be fixed

### Task 5: [Final] Update documentation
- [x] Update component creation guide (`docs/component-creation-guide.md`) if new patterns were introduced
- [x] No README changes needed (auth flow unchanged)

## Technical Details

### AppLayout structure
```
┌─────────────────────────────────────────────┐
│ <div class="flex h-screen">                 │
│  ┌──────┐ ┌──────────────────────────────┐  │
│  │Side  │ │ <div class="flex flex-col     │  │
│  │Navbar│ │        flex-1 overflow-hidden">│  │
│  │      │ │  ┌────────────────────────┐   │  │
│  │(120px│ │  │ PageHeader             │   │  │
│  │ when │ │  │ heading + acctSettings │   │  │
│  │ coll)│ │  └────────────────────────┘   │  │
│  │      │ │  ┌────────────────────────┐   │  │
│  │      │ │  │ Content (flex-1,       │   │  │
│  │      │ │  │ centers children)      │   │  │
│  │      │ │  └────────────────────────┘   │  │
│  └──────┘ └──────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### EmptyState component
- Pure presentational, no data fetching
- Centered via flex with `items-center justify-center`
- `gap-[var(--number-spacing-gap-gap-m)]` (12px) between heading and subtitle

## Post-Completion
- Manual visual verification against Figma design in browser
- Verify responsive behavior (sidebar collapse/expand)
- Future: replace empty state with real home content when backend provides data
