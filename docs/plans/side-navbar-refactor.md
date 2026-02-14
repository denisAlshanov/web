# SideNavbar Refactor — Hover-to-Expand Overlay

## Overview
- Refactor SideNavbar from click-to-toggle to **hover-to-expand** behavior
- Change collapsed width from 120px to **60px** to match Figma spec
- When expanded on hover, the sidebar **overlays content** (absolute positioned) with shadow — it must **not** push/move page content
- Remove the logo toggle button; logo still visible but no click-to-toggle
- Update AppLayout to use a fixed-width spacer (60px) instead of relying on sidebar flex width

## Context (from discovery)
- **Files to modify:**
  - `src/components/layout/side-navbar.tsx` — main component refactor
  - `src/components/ui/navbar-item.tsx` — adjust collapsed padding to fit 60px
  - `src/components/layout/app-layout.tsx` — fixed spacer instead of flex-based sidebar width
  - `src/components/layout/__tests__/side-navbar.test.tsx` — update tests for hover behavior
  - `src/components/layout/__tests__/app-layout.test.tsx` — update layout tests
  - `src/components/layout/side-navbar.stories.tsx` — update stories
- **Figma references:**
  - Collapsed (60px): https://www.figma.com/design/D8ZhjgOIoPF5hKMGIMaQkR/MediaPlans---Main?node-id=153-3
  - Expanded (overlay): https://www.figma.com/design/D8ZhjgOIoPF5hKMGIMaQkR/MediaPlans---Main?node-id=153-889
- **Expanded state from Figma:**
  - Width: 228px
  - Border right: `var(--colour-interface-border-primary-light)`
  - Shadow: `1px_0px_10px_0px_rgba(38,44,52,0.08)`
  - Shows logo + "MediaPlans" text + nav item labels

## Development Approach
- **Testing approach**: Regular (implement first, then tests)
- Complete each task fully before moving to the next
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- **CRITICAL: update this plan file when scope changes during implementation**

## Testing Strategy
- **Unit tests**: React Testing Library + Vitest
- Test hover interactions via `mouseEnter`/`mouseLeave` events
- Test overlay positioning (absolute, z-index)
- Test that content spacer remains 60px regardless of hover state

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Update SideNavbar to hover-expand with overlay positioning
- [x] Replace `useState` toggle with `onMouseEnter`/`onMouseLeave` for expand/collapse
- [x] Change collapsed width from `w-[120px]` to `w-[60px]`
- [x] Keep expanded width at `w-[228px]`
- [x] Make the sidebar `position: absolute` (or fixed) with `z-index` so it overlays content when expanded
  - Collapsed: `position: relative` with `w-[60px]` (takes up space in flow)
  - Expanded: `position: absolute` with `w-[228px]`, `top-0`, `left-0`, `bottom-0`, `z-50`
  - Actually, always render as absolute/fixed inside a 60px spacer wrapper — see Task 2
- [x] Add shadow on expanded: `shadow-[1px_0px_10px_0px_rgba(38,44,52,0.08)]`
- [x] Add border-right on expanded: `border-r border-[var(--colour-interface-border-primary-light)]`
- [x] Remove the logo click toggle handler; keep logo as static display element
- [x] Remove `defaultCollapsed` prop (always collapsed by default, expands only on hover)
- [x] Remove `onToggle` callback prop (no longer user-toggled)
- [x] Adjust internal padding: collapsed `px-[2px]` to center 56px items in 60px; keep expanded `px-[12px]`
- [x] Update tests in `src/components/layout/__tests__/side-navbar.test.tsx`:
  - Remove tests for click-to-toggle behavior
  - Add tests for mouseEnter → expanded, mouseLeave → collapsed
  - Test collapsed width is 60px
  - Test expanded state has shadow and border classes
  - Test that `aria-label` on nav items remains for accessibility
- [x] Run tests — must pass before next task

### Task 2: Update AppLayout to use fixed spacer for sidebar
- [x] Instead of SideNavbar participating in flex layout, use a wrapper approach:
  - Render a fixed `w-[60px] shrink-0` spacer div in the flex row
  - Render SideNavbar as `absolute top-0 left-0 bottom-0 z-50` overlapping the spacer (and overflowing on expand)
- [x] Content area remains `flex-1` and never moves — it always starts at 60px from left
- [x] Update tests in `src/components/layout/__tests__/app-layout.test.tsx`:
  - Test that spacer div has `w-[60px]`
  - Test that SideNavbar is positioned absolutely
- [x] Run tests — must pass before next task

### Task 3: Adjust NavbarItem collapsed padding for 60px sidebar
- [x] Review NavbarItem collapsed dimensions — currently `w-[56px]` (56px square)
- [x] Verify it fits within the 60px sidebar (56px + 2px padding each side = 60px) — adjust if needed
- [x] Update NavbarItem tests if any dimension assertions change
- [x] Run tests — must pass before next task

### Task 4: Update Storybook stories
- [ ] Update `src/components/layout/side-navbar.stories.tsx`:
  - Remove "Expanded" story (no longer a static state)
  - Update "Collapsed" story to show 60px width
  - Add "HoverInteraction" story demonstrating the hover-to-expand overlay
  - Update "SideBySide" story if it exists
- [ ] Verify stories render correctly in Storybook
- [ ] Run tests — must pass before next task

### Task 5: Verify acceptance criteria
- [ ] Verify collapsed sidebar is 60px wide on all pages
- [ ] Verify hovering expands to 228px with overlay (no content shift)
- [ ] Verify expanded sidebar has shadow and border per Figma
- [ ] Verify mouse leave collapses sidebar back to 60px
- [ ] Verify nav items accessible via keyboard (focus still works)
- [ ] Run full test suite (`npm run test`)
- [ ] Run linter (`npm run lint`) — all issues must be fixed

### Task 6: [Final] Update documentation
- [ ] Update component creation guide if patterns changed
- [ ] No README changes needed

## Technical Details

### Layout structure (after refactor)
```
┌──────────────────────────────────────────────┐
│ <div class="relative flex h-screen">         │
│  ┌──────┐ ┌───────────────────────────────┐  │
│  │Spacer│ │ Content area (flex-1)         │  │
│  │60px  │ │  ┌─────────────────────────┐  │  │
│  │      │ │  │ PageHeader              │  │  │
│  │      │ │  └─────────────────────────┘  │  │
│  │      │ │  ┌─────────────────────────┐  │  │
│  │      │ │  │ Main content            │  │  │
│  │      │ │  └─────────────────────────┘  │  │
│  └──────┘ └───────────────────────────────┘  │
│  ┌──────────┐ (absolute, z-50, overlays      │
│  │SideNavbar│  on hover → 228px)             │
│  │60→228px  │                                │
│  └──────────┘                                │
└──────────────────────────────────────────────┘
```

### Hover behavior
- `onMouseEnter` on the nav element → set `isExpanded = true`
- `onMouseLeave` on the nav element → set `isExpanded = false`
- Transition: same 200ms ease-in-out for width, opacity, shadow
- No click handler needed; logo is purely decorative/branding

### Dimension changes
| Property | Before | After (collapsed) | After (expanded) |
|----------|--------|-------------------|------------------|
| Width | 120px / 228px | 60px | 228px |
| Position | relative (in flow) | absolute | absolute |
| Shadow | none / 0.08 | none | `1px 0 10px rgba(38,44,52,0.08)` |
| Border-right | transparent / colored | none | `var(--colour-interface-border-primary-light)` |
| z-index | auto | 50 | 50 |

## Post-Completion
- Manual visual testing: hover over sidebar, verify smooth animation
- Verify no content flicker/jump when sidebar expands
- Test with keyboard navigation (tab through nav items)
