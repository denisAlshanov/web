# Side Navbar Component

## Overview
- Create the `SideNavbar` layout component in `src/components/layout/side-navbar.tsx`
- Composes the `NavbarItem` UI primitive (from `docs/plans/navbar-item.md` — assumed already implemented) and the existing `MediaPlansLogo` component
- Two layout modes: **Expanded** (228px, logo+text, icon+text items) and **Collapsed** (120px, logo only, icon-only items)
- Contains 6 navigation items: Home, Shows, Calendar, Team, Guests, Manage — with exact icons from Figma
- Figma reference: https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2023-93&m=dev

## Context (from discovery)
- **Files/components involved**: new `src/components/layout/side-navbar.tsx`, new `src/components/layout/side-navbar.stories.tsx`
- **Existing components used**:
  - `src/components/ui/navbar-item.tsx` — NavbarItem primitive (prerequisite, from `navbar-item.md` plan)
  - `src/components/ui/mediaplans-logo.tsx` — `MediaPlansLogo` SVG component (already exists, uses `--colour-interface-text-heavy` fill)
  - `src/components/ui/icons/` — Custom solid SVG icons (prerequisite, from `navbar-item.md` plan)
- **Dependencies identified**: `iconoir-react` (outline icons: `HomeSimpleDoor`, `Tv`, `Calendar`, `Group`, `UserSquare`, `Wrench`)
- **Prerequisite plan**: `docs/plans/navbar-item.md` must be implemented first (NavbarItem + solid icon SVGs)

### Figma Design Specifications

**Expanded mode (Collapsed=False):**
| Property | Value | Token |
|----------|-------|-------|
| Width | 228px | — |
| Background | white | `--colour-interface-surface-base` |
| Right border | 1px solid #eef2f7 | `--colour-interface-border-primary-light` |
| Right shadow | `1px 0px 10px rgba(38,44,52,0.08)` | — |
| Padding horizontal | 12px | — |
| Padding top | 32px | — |
| Padding bottom | 60px | — |
| Logo left padding | 8px | — |
| Logo gap (icon to text) | 12px | — |
| Logo text | "MediaPlans" 18px/600 | `text-semibold-l`, color `--colour-interface-text-heavy` |
| Gap logo → menu | 80px | — |
| Menu item gap | 16px | — |

**Collapsed mode (Collapsed=True):**
| Property | Value | Token |
|----------|-------|-------|
| Width | 120px | — |
| Background | white | `--colour-interface-surface-base` |
| Border/shadow | none | — |
| Same padding | 12px h, 32px top, 60px bottom | — |
| Logo | icon only (no "MediaPlans" text) | — |
| Menu item gap | 16px | — |
| Items | collapsed NavbarItem (56px icon pills) | — |

**Navigation items (exact order and text):**
| # | Label | Outline Icon (iconoir) | Solid Icon (custom) |
|---|-------|----------------------|-------------------|
| 1 | Home | `HomeSimpleDoor` | `HomeSimpleDoorSolid` |
| 2 | Shows | `Tv` | `TvSolid` |
| 3 | Calendar | `Calendar` | `CalendarSolid` |
| 4 | Team | `Group` | `GroupSolid` |
| 5 | Guests | `UserSquare` | `UserSquareSolid` |
| 6 | Manage | `Wrench` | `WrenchSolid` |

## Development Approach
- **Testing approach**: TDD (tests first)
- **Prerequisite**: `NavbarItem` component and custom solid icons must be implemented first (from `navbar-item.md` plan)
- Complete each task fully before moving to the next
- Make small, focused changes
- **CRITICAL: every task MUST include new/updated tests** for code changes in that task
- **CRITICAL: all tests must pass before starting next task** — no exceptions
- **CRITICAL: update this plan file when scope changes during implementation**
- Run tests after each change

## Testing Strategy
- **Unit tests**: Vitest + React Testing Library
- Test expanded vs collapsed rendering
- Test that all 6 nav items render with correct labels and icons
- Test active item highlighting
- Test logo rendering (with/without text)
- Test ARIA navigation landmark (`role="navigation"`, `aria-label`)

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with + prefix
- Document issues/blockers with warning prefix
- Update plan if implementation deviates from original scope

## Implementation Steps

### Task 1: Create SideNavbar component structure (TDD)
- [x] Write tests: SideNavbar renders with `role="navigation"` and `aria-label`
- [x] Write tests: expanded mode renders MediaPlansLogo + "MediaPlans" text
- [x] Write tests: expanded mode renders all 6 nav items with correct labels (Home, Shows, Calendar, Team, Guests, Manage)
- [x] Write tests: collapsed mode renders MediaPlansLogo without "MediaPlans" text
- [x] Write tests: collapsed mode renders all 6 nav items with `collapsed` prop
- [x] Implement `SideNavbar` in `src/components/layout/side-navbar.tsx`:
  - Props: `collapsed?: boolean`, `activeItem?: string`, `onItemClick?: (item: string) => void`, `className?: string`
  - Expanded: 228px wide, flex column, `bg-[var(--colour-interface-surface-base)]`, right border + shadow
  - Collapsed: 120px wide, flex column, same bg, no border/shadow
  - Logo section: `<MediaPlansLogo>` + conditional "MediaPlans" text (`text-semibold-l`)
  - Menu section: 6 `<NavbarItem>` components with correct icon pairs and labels
- [x] Run tests — must pass before next task

### Task 2: Implement active item and styling details (TDD)
- [x] Write tests: only the active item has `active={true}`, rest have `active={false}`
- [x] Write tests: `activeItem` prop controls which item is active (default: "home")
- [x] Write tests: `onItemClick` fires with item identifier when a nav item is clicked
- [x] Write tests: expanded mode has right border `--colour-interface-border-primary-light` and shadow
- [x] Write tests: collapsed mode has NO right border or shadow
- [x] Implement active item logic: compare `activeItem` prop to each item's identifier
- [x] Implement styling:
  - Expanded: `border-r border-[var(--colour-interface-border-primary-light)] shadow-[1px_0px_10px_0px_rgba(38,44,52,0.08)]`
  - Collapsed: no border/shadow
  - Gap between logo and menu: 80px (`gap-[80px]` or explicit spacing)
  - Menu items gap: 16px
  - Padding: `px-[12px] pt-[32px] pb-[60px]`
- [x] Run tests — must pass before next task

### Task 3: Create Storybook stories
- [ ] Create `src/components/layout/side-navbar.stories.tsx` with Meta setup
- [ ] Add `Expanded` story: full sidebar with Home active, all 6 items with correct labels
- [ ] Add `Collapsed` story: collapsed sidebar with Home active, icon-only items
- [ ] Add `ExpandedShowsActive` story: expanded with Shows as active item
- [ ] Add `SideBySide` story: both expanded and collapsed rendered side by side for visual comparison with Figma
- [ ] Verify all stories render correctly in Storybook
- [ ] Run tests — must pass before next task

### Task 4: Verify acceptance criteria
- [ ] Verify expanded mode matches Figma: 228px width, right border + shadow, logo + "MediaPlans" text, all 6 items with labels
- [ ] Verify collapsed mode matches Figma: 120px width, no border/shadow, logo icon only, icon-only items
- [ ] Verify exact item order: Home, Shows, Calendar, Team, Guests, Manage
- [ ] Verify exact icons: outline for inactive, solid for active
- [ ] Verify active item styling: shadow + semibold text + solid icon
- [ ] Run full test suite (unit tests)
- [ ] Run linter (`npm run lint`) — all issues must be fixed
- [ ] Verify Storybook builds without errors

### Task 5: [Final] Update documentation
- [ ] Update any relevant docs if new layout component patterns were discovered
- [ ] Ensure `src/components/layout/` directory is mentioned in project docs

## Technical Details

### Component API
```tsx
<SideNavbar
  collapsed={false}           // Expanded (228px) or collapsed (120px)
  activeItem="home"           // Which nav item is active
  onItemClick={(item) => {}}  // Callback when a nav item is clicked
  className="..."             // Optional className override
/>
```

### SideNavbar Props
```tsx
interface SideNavbarProps {
  collapsed?: boolean;                       // Default: false (expanded)
  activeItem?: NavItemId;                    // Default: "home"
  onItemClick?: (item: NavItemId) => void;   // Click handler
  className?: string;                        // Optional override
}

type NavItemId = "home" | "shows" | "calendar" | "team" | "guests" | "manage";
```

### Navigation Item Configuration
```tsx
const NAV_ITEMS = [
  { id: "home",     label: "Home",     icon: HomeSimpleDoor, activeIcon: HomeSimpleDoorSolid },
  { id: "shows",    label: "Shows",    icon: Tv,             activeIcon: TvSolid },
  { id: "calendar", label: "Calendar", icon: Calendar,       activeIcon: CalendarSolid },
  { id: "team",     label: "Team",     icon: Group,          activeIcon: GroupSolid },
  { id: "guests",   label: "Guests",   icon: UserSquare,     activeIcon: UserSquareSolid },
  { id: "manage",   label: "Manage",   icon: Wrench,         activeIcon: WrenchSolid },
] as const;
```

### Design Token References
```css
/* Surface */
--colour-interface-surface-base: white;

/* Border */
--colour-interface-border-primary-light: #eef2f7;

/* Text */
--colour-interface-text-heavy: #23262a;

/* Shadow (expanded only) */
box-shadow: 1px 0px 10px rgba(38,44,52,0.08);
```

### Component Structure (Expanded)
```
┌─────────────────────────┐
│ px-12 pt-32             │
│ ┌─ Logo ──────────────┐ │
│ │ [MP icon] MediaPlans │ │ ← pl-8, gap-12, text-semibold-l
│ └─────────────────────┘ │
│                         │
│    80px gap              │
│                         │
│ ┌─ Menu ──────────────┐ │
│ │ [●] Home    (active) │ │ ← NavbarItem active
│ │ [○] Shows           │ │ ← NavbarItem default
│ │ [○] Calendar        │ │   16px gap between items
│ │ [○] Team            │ │
│ │ [○] Guests          │ │
│ │ [○] Manage          │ │
│ └─────────────────────┘ │
│                  pb-60  │
│ border-r + shadow ──────│→
└─────────────────────────┘
  228px
```

## Post-Completion

**Manual verification:**
- Visual comparison with Figma: expanded and collapsed side by side
- Verify transition between collapsed/expanded feels smooth (if animated)
- Test with screen reader: navigation landmark announced, items readable
- Test keyboard navigation through nav items
