# Page Header Component

## Overview
- Create the `PageHeader` layout component in `src/components/layout/page-header.tsx`
- The top header bar for the main content area, supporting two page levels (primary + sub-page), scroll state, and optional heading
- Composes `AccountSettings` trigger, `TabList` (tab navigation), back button, and menu button
- 8 total variants: 2 levels x 2 scroll states x 2 heading states
- Figma reference: https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2057-1865&m=dev

## Context (from discovery)
- **Files/components involved**: new `src/components/layout/page-header.tsx`, new `src/components/layout/page-header.stories.tsx`
- **Existing components used**:
  - `AccountSettings` trigger (prerequisite: `docs/plans/account-settings.md`)
  - `TabList` + `Tab` (prerequisite: `docs/plans/navigation-tabs.md`)
  - `<Icon>` wrapper (`src/components/ui/icon.tsx`)
  - `IconButton` (`src/components/ui/icon-button.tsx` — already exists)
- **Dependencies identified**: `iconoir-react` (`ArrowLeft`, `Menu` — both confirmed available)
- **Prerequisite plans**: `account-settings.md` (AccountSettings trigger) and `navigation-tabs.md` (TabList/Tab) must be implemented first

### Figma Design Specifications

#### Level 1 — Primary Page (with heading + tabs)
| Property | Value | Token |
|----------|-------|-------|
| Background | white | `--colour-interface-surface-base` |
| Gap (heading area → tabs) | 36px | — |
| Page heading | bold 36px/48px line-height | `text-heading-l`, `--colour-interface-text-heavy` |
| Heading left offset | 12px | — |
| Account Settings | right-aligned, 16px from top, 54px from right | — |
| Tab View | full-width, from `navigation-tabs.md` | — |
| Header section height | 140px (with heading), 80px (without heading) | — |

#### Level 2 — Sub-page (with back arrow + menu)
| Property | Value | Token |
|----------|-------|-------|
| Background | white | `--colour-interface-surface-base` |
| Gap (heading area → inner nav) | 4px | — |
| Padding bottom | 12px | — |
| Page heading | bold 24px/32px line-height | `text-heading-m`, `--colour-interface-text-heavy` |
| Heading left offset | 12px | — |
| Account Settings | same position as Lvl 1 | — |
| Back button | `ArrowLeft` icon, 40x40 pill, left side | — |
| Menu button | `Menu` (hamburger) icon, 40x40 pill, right side | — |
| Helper text (optional) | 16px medium, `--colour-interface-text-supporting` | `text-medium-m` |
| Inner nav height | 48px | — |
| Inner nav right padding | 48px | — |
| Header section height | 96px (with heading), 80px (without heading) | — |

#### Scroll State (both levels)
| Property | Value | Token |
|----------|-------|-------|
| Bottom border | 1px solid | `--colour-interface-border-primary-light` (#eef2f7) |
| Shadow | `0px 4px 8px rgba(67,73,82,0.04)` | — |

#### Icons (all from iconoir-react/regular)
| Usage | Icon | Confirmed |
|-------|------|-----------|
| Back button (Lvl 2) | `ArrowLeft` | yes |
| Menu button (Lvl 2) | `Menu` | yes |

## Development Approach
- **Testing approach**: TDD (tests first)
- **Prerequisites**: `AccountSettings` and `TabList`/`Tab` must be implemented first
- Complete each task fully before moving to the next
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task** — no exceptions
- **CRITICAL: update this plan file when scope changes during implementation**

## Testing Strategy
- **Unit tests**: Vitest + React Testing Library
- Test Level 1 rendering: heading, account settings, tab view
- Test Level 2 rendering: heading, back arrow, menu button, account settings
- Test scroll state: border and shadow applied when scroll=true
- Test showHeading toggle
- Test optional elements: tabbedView, showMenu, showHelperText

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with + prefix
- Document issues/blockers with warning prefix

## Implementation Steps

### Task 1: Implement Level 1 PageHeader (TDD)
- [x] Write tests: Level 1 renders page heading (`text-heading-l`) when showHeading=true
- [x] Write tests: Level 1 hides heading when showHeading=false (header height shrinks to 80px)
- [x] Write tests: Level 1 renders AccountSettings trigger (right-aligned)
- [x] Write tests: Level 1 renders TabList when tabbedView=true, hides when false
- [x] Implement Level 1 `PageHeader` in `src/components/layout/page-header.tsx`:
  - Props: `level?: 1 | 2`, `heading?: string`, `showHeading?: boolean`, `scroll?: boolean`, `tabbedView?: boolean`, `tabs?: ReactNode`, `accountSettings?: ReactNode`, `onBackClick?: () => void`, `showMenu?: boolean`, `onMenuClick?: () => void`, `helperText?: string`, `showHelperText?: boolean`, `className?: string`
  - Container: `bg-[var(--colour-interface-surface-base)]`, flex column
  - Header area: heading left, AccountSettings right
  - Tab area: renders `tabs` slot (accepts `<TabList>` children)
  - Gap: 36px between header and tabs
- [x] Run tests — must pass before next task

### Task 2: Implement Level 2 PageHeader (TDD)
- [ ] Write tests: Level 2 renders page heading (`text-heading-m`) when showHeading=true
- [ ] Write tests: Level 2 hides heading when showHeading=false
- [ ] Write tests: Level 2 renders back arrow button (`ArrowLeft` icon) on left
- [ ] Write tests: Level 2 renders menu button (`Menu` icon) on right when showMenu=true
- [ ] Write tests: Level 2 renders helper text when showHelperText=true
- [ ] Write tests: back button fires `onBackClick` callback when clicked
- [ ] Write tests: menu button fires `onMenuClick` callback when clicked
- [ ] Implement Level 2 layout:
  - Header area: heading left (24px bold), AccountSettings right
  - Inner navigation bar: back arrow (40x40 pill) left, button container (helper text + menu) right
  - Gap: 4px, padding-bottom: 12px
  - Inner nav right padding: 48px
- [ ] Run tests — must pass before next task

### Task 3: Implement scroll state styling (TDD)
- [ ] Write tests: scroll=false has no bottom border or shadow
- [ ] Write tests: scroll=true adds bottom border (`--colour-interface-border-primary-light`) and shadow
- [ ] Write tests: scroll state works for both Level 1 and Level 2
- [ ] Implement scroll conditional styling:
  - `scroll && "border-b border-[var(--colour-interface-border-primary-light)] shadow-[0px_4px_8px_0px_rgba(67,73,82,0.04)]"`
- [ ] Run tests — must pass before next task

### Task 4: Create Storybook stories
- [ ] Create `src/components/layout/page-header.stories.tsx` with Meta setup
- [ ] Add `Level1WithHeading` story: primary page with heading + tabs
- [ ] Add `Level1NoHeading` story: primary page tabs only
- [ ] Add `Level1Scrolled` story: primary page scrolled (with border + shadow)
- [ ] Add `Level2WithHeading` story: sub-page with heading + back arrow + menu
- [ ] Add `Level2NoHeading` story: sub-page back arrow + menu only
- [ ] Add `Level2Scrolled` story: sub-page scrolled
- [ ] Add `Level2WithHelperText` story: sub-page with helper text next to menu
- [ ] Add `AllVariants` story: grid showing all 8 variants
- [ ] Verify all stories render correctly in Storybook
- [ ] Run tests — must pass before next task

### Task 5: Verify acceptance criteria
- [ ] Verify Level 1 matches Figma: heading (36px bold), account settings (right), tab view (below)
- [ ] Verify Level 2 matches Figma: heading (24px bold), back arrow (left), menu (right), account settings (right)
- [ ] Verify scroll state: border + shadow applied correctly for both levels
- [ ] Verify showHeading toggle changes header height (Lvl 1: 140px→80px, Lvl 2: 96px→80px)
- [ ] Verify icons: `ArrowLeft` for back, `Menu` for hamburger
- [ ] Run full test suite (unit tests)
- [ ] Run linter (`npm run lint`) — all issues must be fixed
- [ ] Verify Storybook builds without errors

### Task 6: [Final] Update documentation
- [ ] Update any relevant docs if new layout patterns were discovered
- [ ] Ensure layout component patterns are documented

## Technical Details

### Component API
```tsx
// Level 1 — Primary page with heading + tabs
<PageHeader
  level={1}
  heading="Shows"
  showHeading={true}
  scroll={false}
  tabbedView={true}
  tabs={
    <TabList>
      <Tab value="upcoming">Upcoming</Tab>
      <Tab value="past">Past</Tab>
    </TabList>
  }
  accountSettings={<AccountSettings userName="Alexander Plushev" ... />}
/>

// Level 2 — Sub-page with back + menu
<PageHeader
  level={2}
  heading="Show Details"
  showHeading={true}
  scroll={false}
  onBackClick={() => router.back()}
  showMenu={true}
  onMenuClick={() => openMenu()}
  helperText="Draft"
  showHelperText={true}
  accountSettings={<AccountSettings userName="Alexander Plushev" ... />}
/>
```

### PageHeader Props
```tsx
interface PageHeaderProps {
  level?: 1 | 2;                          // Default: 1
  heading?: string;                        // Page title text
  showHeading?: boolean;                   // Default: true
  scroll?: boolean;                        // Default: false
  className?: string;

  // Level 1 specific
  tabbedView?: boolean;                    // Default: true
  tabs?: React.ReactNode;                  // TabList slot

  // Level 2 specific
  onBackClick?: () => void;                // Back arrow click handler
  showMenu?: boolean;                      // Default: true
  onMenuClick?: () => void;                // Menu button click handler
  helperText?: string;                     // Optional helper text
  showHelperText?: boolean;                // Default: false

  // Shared
  accountSettings?: React.ReactNode;       // AccountSettings trigger slot
}
```

### Visual Structure

**Level 1:**
```
┌──────────────────────────────────────────────┐
│                          [AccountSettings ▾] │ ← 16px top, 54px right
│ Heading (36px bold)                          │ ← 12px left
│                                              │
│ ─── 36px gap ─────────────────────────────── │
│                                              │
│ [+Tab] [+Tab] [+Tab] [+Tab] ...             │ ← TabList
│ ─────────────────────────────────────────── │ ← tab border
└──────────────────────────────────────────────┘
```

**Level 2:**
```
┌──────────────────────────────────────────────┐
│                          [AccountSettings ▾] │
│ Heading (24px bold)                          │
│ ── 4px gap ──────────────────────────────── │
│ [←]                        [helper] [≡]     │ ← inner nav (48px h)
│ ── 12px padding-bottom ─────────────────── │
└──────────────────────────────────────────────┘
```

### Design Token References
```css
/* Surface */
--colour-interface-surface-base: white;

/* Text */
--colour-interface-text-heavy: #23262a;
--colour-interface-text-supporting: #64676c;

/* Border (scroll state) */
--colour-interface-border-primary-light: #eef2f7;

/* Shadow (scroll state) */
box-shadow: 0px 4px 8px rgba(67,73,82,0.04);

/* Radius (icon buttons) */
--number-radius-rad-button: 999px;
```

## Post-Completion

**Manual verification:**
- Visual comparison with all 8 Figma variants in Storybook
- Verify scroll state transition feels natural (can use IntersectionObserver or scroll event)
- Test responsive behavior (if content overflows)
- Verify icon button hit targets are at least 40x40px
