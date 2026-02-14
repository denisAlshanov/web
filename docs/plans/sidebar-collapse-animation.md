# Sidebar Collapse/Expand Animation

## Overview
- Add toggle functionality to the SideNavbar: clicking the logo collapses/expands the sidebar
- Smooth CSS transition animation for width change (228px ↔ 120px, ~200ms ease)
- Text labels fade out on collapse, fade in on expand
- Tooltip on logo indicating "Collapse sidebar" / "Expand sidebar"
- Internal state management with `onToggle` callback for parent components

## Context (from discovery)
- Files involved: `src/components/layout/side-navbar.tsx`, `src/components/ui/navbar-item.tsx`
- Tests: `src/components/layout/__tests__/side-navbar.test.tsx`
- Logo component: `src/components/ui/mediaplans-logo.tsx` (SVG, no changes needed)
- No tooltip component exists; will use native `title` attribute for simplicity
- Existing transition pattern: `transition-colors` on interactive elements

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- Make small, focused changes
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- Run tests after each change

## Testing Strategy
- **Unit tests**: Update existing `side-navbar.test.tsx` with toggle behavior tests

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Add internal collapsed state and logo click handler
- [x] Add `useState` for internal `collapsed` state in `SideNavbar`, defaulting to `collapsed` prop value
- [x] Add `onToggle` optional callback to `SideNavbarProps` interface
- [x] Wrap logo area in a `<button>` with `onClick` that toggles state and calls `onToggle`
- [x] Add `title` attribute to logo button: "Collapse sidebar" when expanded, "Expand sidebar" when collapsed
- [x] Add `cursor-pointer` to the logo button
- [x] Write tests: clicking logo toggles collapsed state
- [x] Write tests: `onToggle` callback fires with new collapsed value
- [x] Write tests: logo button has correct `title` attribute in both states
- [x] Run tests - must pass before next task

### Task 2: Add CSS transition animations
- [x] Add `transition-[width]` and `duration-200` `ease-in-out` classes to the `<nav>` element
- [x] Add `transition-opacity` `duration-150` to the "MediaPlans" text span (render always, use opacity + sr-only for collapsed)
- [x] Add `transition-opacity` `duration-150` to nav item labels in `navbar-item.tsx` (render always, use opacity-0 + sr-only for collapsed instead of conditional render)
- [x] Add `overflow-hidden` to the `<nav>` to prevent content overflow during animation
- [x] Verify border and shadow still apply correctly in expanded mode
- [x] Update existing tests if render behavior changed (always-render vs conditional)
- [x] Run tests - must pass before next task

### Task 3: Verify acceptance criteria
- [x] Verify clicking logo toggles sidebar between expanded and collapsed
- [x] Verify smooth width transition animation (~200ms)
- [x] Verify text labels fade out/in smoothly
- [x] Verify tooltip shows correct text in both states
- [x] Run full test suite (unit tests)
- [x] Run linter - all issues must be fixed

## Technical Details

**State management:**
```typescript
const [isCollapsed, setIsCollapsed] = useState(collapsed);
const handleToggle = () => {
  const next = !isCollapsed;
  setIsCollapsed(next);
  onToggle?.(next);
};
```

**Transition classes on `<nav>`:**
- `transition-[width] duration-200 ease-in-out overflow-hidden`

**Text fade pattern:**
- Always render text, use `opacity-0`/`opacity-100` + `transition-opacity duration-150`
- Keep `sr-only` on collapsed labels for accessibility

**Logo button:**
- Unstyled `<button>` wrapping logo area
- `title="Collapse sidebar"` / `title="Expand sidebar"`
- `cursor-pointer` + reset button styles

## Post-Completion

**Manual verification:**
- Test animation smoothness in browser (dev server)
- Verify no layout shift in main content area during animation
- Test keyboard accessibility (logo button focusable, Enter/Space triggers toggle)
