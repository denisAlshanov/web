# Navbar Item Component

## Overview
- Create a reusable `NavbarItem` component in `src/components/ui/` for sidebar navigation
- Supports 4 interaction states (Default, Hover, Focus, Active) and 2 layout modes (Collapsed icon-only, Expanded icon+text)
- Uses outline icons (iconoir-react) for default state and custom solid SVG icons for active state — matching Figma exactly
- Built with CVA variants, design tokens, and the existing `<Icon>` wrapper
- Figma reference: https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2019-13117&m=dev

## Context (from discovery)
- **Files/components involved**: new `src/components/ui/navbar-item.tsx`, new `src/components/ui/icons/` (solid icon SVGs), new `src/components/ui/navbar-item.stories.tsx`
- **Related patterns found**: CVA variants (`button.tsx`), `cn()` utility, `<Icon>` wrapper (`icon.tsx` accepts `ComponentType<SVGProps<SVGSVGElement>>`), design tokens
- **Dependencies identified**: `iconoir-react` (outline icons already installed), `class-variance-authority`, existing design tokens
- **Icon mapping**: iconoir-react has outline variants only; solid variants must be created as custom SVG components

### Figma Design Specifications

**Layout:**
| Property | Value | Token |
|----------|-------|-------|
| Height | 56px | — |
| Width (collapsed) | 56px (icon only) | — |
| Width (expanded) | full-width / flexible | — |
| Padding horizontal | 18px | `--number-spacing-padding-pad-l` |
| Padding vertical | 12px | `--number-spacing-padding-pad-m` |
| Gap (icon to text) | 12px | `--number-spacing-gap-gap-m` |
| Border radius | 999px (pill) | `--number-radius-rad-button` |
| Icon size | 24x24 | — |

**States:**
| State | Background | Text | Icon | Extra |
|-------|-----------|------|------|-------|
| Default | white (`--colour-interface-background-singletone-default`) | medium 16px `text-medium-m`, color `--colour-interface-text-default` | Outline | — |
| Hover | `--colour-interface-background-singletone-hover` (#f5f5f5) | same as default | Outline | — |
| Focus | white (`--colour-interface-background-singletone-focus`) | same as default | Outline | 3px border `--colour-interface-border-primary-focus` (#3ab6e5) |
| Active | white (`--colour-interface-background-singletone-default`) | semibold 16px `text-semibold-m`, color `--colour-interface-text-heavy` | **Solid** | shadow `0px 1px 8px rgba(38,44,52,0.04)` |

**Icon Mapping (Figma → Implementation):**
| Item | Outline (iconoir-react) | Solid (custom SVG) |
|------|------------------------|-------------------|
| Home | `HomeSimpleDoor` | `HomeSimpleDoorSolid` (custom) |
| Shows | `Tv` | `TvSolid` (custom) |
| Team | `Group` | `GroupSolid` (custom) |
| Guests | `UserSquare` | `UserSquareSolid` (custom) |
| Manage | `Wrench` | `WrenchSolid` (custom) |
| Calendar | `Calendar` | `CalendarSolid` (custom) |

## Development Approach
- **Testing approach**: TDD (tests first)
- Complete each task fully before moving to the next
- Make small, focused changes
- **CRITICAL: every task MUST include new/updated tests** for code changes in that task
  - tests are not optional — they are a required part of the checklist
  - write unit tests for new functions/methods
  - add new test cases for new code paths
  - tests cover both success and error scenarios
- **CRITICAL: all tests must pass before starting next task** — no exceptions
- **CRITICAL: update this plan file when scope changes during implementation**
- Run tests after each change
- Maintain backward compatibility

## Testing Strategy
- **Unit tests**: Vitest + React Testing Library for component rendering and interaction
- **Storybook**: Visual documentation of all states, collapsed/expanded modes, and all nav items
- Test that correct icon variant renders (outline vs solid) based on active prop
- Test collapsed vs expanded layout
- Test ARIA attributes and keyboard accessibility

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with + prefix
- Document issues/blockers with warning prefix
- Update plan if implementation deviates from original scope
- Keep plan in sync with actual work done

## Implementation Steps

### Task 1: Create custom solid SVG icon components
- [x] Create directory `src/components/ui/icons/`
- [x] Extract solid icon SVG paths from Figma for all 6 nav items (HomeSimpleDoorSolid, TvSolid, GroupSolid, UserSquareSolid, WrenchSolid, CalendarSolid)
- [x] Implement each solid icon as a React component matching the `ComponentType<SVGProps<SVGSVGElement>>` interface (same as iconoir icons) so they work with the existing `<Icon>` wrapper
- [x] Create barrel export `src/components/ui/icons/index.ts`
- [x] Write tests: each solid icon renders an SVG element with correct viewBox
- [x] Write tests: each solid icon forwards className, width, height props
- [x] Run tests — must pass before next task

### Task 2: Implement NavbarItem component with CVA variants (TDD)
- [x] Write tests for NavbarItem: renders with text label in expanded mode
- [x] Write tests for NavbarItem: renders icon-only in collapsed mode (no text visible)
- [x] Write tests for NavbarItem: applies correct typography — `text-medium-m` for default, `text-semibold-m` for active
- [x] Write tests for NavbarItem: renders outline icon when not active, solid icon when active
- [x] Implement `NavbarItem` component in `src/components/ui/navbar-item.tsx`:
  - CVA base: `flex items-center h-[56px] rounded-[var(--number-radius-rad-button)] px-[var(--number-spacing-padding-pad-l)] py-[var(--number-spacing-padding-pad-m)] gap-[var(--number-spacing-gap-gap-m)] transition-colors cursor-pointer`
  - Collapsed variant: `justify-center w-[56px]` (icon only)
  - Expanded variant: full width (icon + text)
  - Default state: `bg-[var(--colour-interface-background-singletone-default)]`
  - Hover: `hover:bg-[var(--colour-interface-background-singletone-hover)]`
  - Focus: `focus-visible:bg-[var(--colour-interface-background-singletone-focus)] focus-visible:ring-3 focus-visible:ring-[var(--colour-interface-border-primary-focus)]`
  - Active: `bg-[var(--colour-interface-background-singletone-default)] shadow-[0px_1px_8px_0px_rgba(38,44,52,0.04)]` + heavy text + solid icon
- [x] Run tests — must pass before next task

### Task 3: Add active state icon switching and accessibility (TDD)
- [x] Write tests for active state: shadow is applied when active
- [x] Write tests for accessibility: component renders as a link or button element, has accessible name from label text
- [x] Write tests for collapsed mode accessibility: has `aria-label` or `title` attribute with the label text when collapsed (text is hidden)
- [x] Implement icon switching logic: accept `icon` (outline) and `activeIcon` (solid) props, render correct one based on `active` prop
- [x] Add proper ARIA attributes: `aria-current="page"` when active, `role` attribute as needed
- [x] Run tests — must pass before next task

### Task 4: Create Storybook stories
- [x] Create `src/components/ui/navbar-item.stories.tsx` with Meta setup
- [x] Add `Default` story: single expanded navbar item (Home, not active)
- [x] Add `Active` story: expanded navbar item with active state (solid icon, shadow, semibold text)
- [x] Add `Collapsed` story: collapsed icon-only item
- [x] Add `CollapsedActive` story: collapsed active item with solid icon and shadow
- [x] Add `AllStates` story: grid showing Default, Hover, Focus, Active for expanded mode
- [x] Add `AllItems` story: all 6 nav items (Home, Shows, Team, Guests, Manage, Calendar) in both active and inactive states
- [x] Add `CollapsedAllItems` story: all 6 items in collapsed mode, active and inactive
- [x] Verify all stories render correctly in Storybook
- [x] Run tests — must pass before next task

### Task 5: Verify acceptance criteria
- [x] Verify all Figma design specifications are matched (spacing, colors, typography, border-radius, shadow)
- [x] Verify outline icons render for default/hover/focus states
- [x] Verify solid icons render for active state
- [x] Verify collapsed mode shows icon only at 56x56
- [x] Verify expanded mode shows icon + text
- [x] Run full test suite (unit tests)
- [x] Run linter (`npm run lint`) — all issues must be fixed
- [x] Verify Storybook builds without errors

### Task 6: [Final] Update documentation
- [x] Update `docs/component-creation-guide.md` if new patterns were discovered (custom SVG icon pattern)
- [x] Add NavbarItem to the component inventory in any relevant docs

## Technical Details

### Component API
```tsx
<NavbarItem
  label="Home"
  icon={HomeSimpleDoor}           // iconoir outline icon
  activeIcon={HomeSimpleDoorSolid} // custom solid SVG icon
  active={false}                   // controls active state
  collapsed={false}                // icon-only mode
  href="/dashboard"                // optional link destination
  className="..."                  // optional override
/>
```

### NavbarItem Props
```tsx
interface NavbarItemProps {
  label: string;                              // Text label (also used for aria-label in collapsed mode)
  icon: ComponentType<SVGProps<SVGSVGElement>>;       // Outline icon (default state)
  activeIcon: ComponentType<SVGProps<SVGSVGElement>>;  // Solid icon (active state)
  active?: boolean;                           // Whether this item is currently active
  collapsed?: boolean;                        // Collapsed (icon-only) vs expanded (icon + text)
  href?: string;                              // Optional link destination
  onClick?: () => void;                       // Optional click handler
  className?: string;                         // Optional className override
}
```

### Custom Solid Icon Interface
Each custom solid SVG icon must match the iconoir interface:
```tsx
// Same signature as iconoir-react components
type SolidIconProps = SVGProps<SVGSVGElement>;

function HomeSimpleDoorSolid(props: SolidIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="..." fill="currentColor" />
    </svg>
  );
}
```

### Design Token References
```css
/* Background */
--colour-interface-background-singletone-default: white;
--colour-interface-background-singletone-hover: #f5f5f5;
--colour-interface-background-singletone-focus: white;

/* Text */
--colour-interface-text-default: #44484c;
--colour-interface-text-heavy: #23262a;

/* Border */
--colour-interface-border-primary-focus: #3ab6e5;

/* Spacing */
--number-spacing-padding-pad-l: 18px;
--number-spacing-padding-pad-m: 12px;
--number-spacing-gap-gap-m: 12px;

/* Radius */
--number-radius-rad-button: 999px;
```

### State Mapping (Figma → Implementation)
| Figma State | Implementation |
|-------------|---------------|
| Default | Base CVA styles |
| Hover | `hover:` pseudo-class |
| Focus | `focus-visible:` pseudo-class + ring |
| Active | `active` prop → conditional classes + solid icon |
| Collapsed | `collapsed` prop → width/justify/hide-text |

## Post-Completion

**Manual verification:**
- Visual comparison with Figma design in Storybook (all 6 items, both modes, all states)
- Verify solid icons visually match Figma solid icons pixel-for-pixel
- Test keyboard navigation (Tab to focus, Enter to activate)
- Test with screen reader to verify accessible names
