# Dropdown Menu Component

## Overview
- Create the Dropdown Menu component system: a trigger button with a dropdown panel of actionable menu items
- Three sub-components: `DropdownMenuItem` (item primitive), `DropdownMenuContent` (panel container), `DropdownMenu` (composed trigger + dropdown)
- Built on `@radix-ui/react-dropdown-menu` for accessible keyboard navigation, ARIA menu roles, focus management, and click-outside-to-close
- All in `src/components/ui/` as reusable primitives
- Figma reference: https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2070-1382&m=dev

## Context (from discovery)
- **Files/components involved**: new `src/components/ui/dropdown-menu.tsx`, new `src/components/ui/dropdown-menu.stories.tsx`
- **Related patterns found**: CVA variants (`button.tsx`, `icon-button.tsx`), `cn()` utility, `<Icon>` wrapper (`icon.tsx`), `IconButton` component (`icon-button.tsx`)
- **Dependencies identified**: `@radix-ui/react-dropdown-menu` (to install), `iconoir-react` (icons: `Menu`, `Plus` — both confirmed available)
- **Existing components reused**: `IconButton` (for the hamburger trigger), `<Icon>` wrapper (for menu item icons)
- **No prerequisite plans**: all icons are standard iconoir outline icons

### Figma Design Specifications

#### Drop Down Menu Item (`_Drop Down Menu Item`)
| Property | Value | Token |
|----------|-------|-------|
| Height | 40px | — |
| Padding left | 8px | `--number-spacing-padding-pad-s` |
| Padding right | 12px | `--number-spacing-padding-pad-m` |
| Padding vertical | 12px | `--number-spacing-padding-pad-m` |
| Gap (icon to text) | 6px | `--number-spacing-gap-gap-s` |
| Icon size | 24x24 | — |
| Text | 14px / 500 weight / 18px line-height | `text-medium-s` |
| Text color | `#44484c` | `--colour-interface-text-default` |
| Width | full (stretches to container) | — |

**Item states:**
| State | Background | Token |
|-------|-----------|-------|
| Default | `#fafafa` | `--colour-interface-background-secondary-default` |
| Hover | `#f5f5f5` | `--colour-interface-background-secondary-hover` |
| Focus | `#fafafa` + 3px border `#3ab6e5` | `--colour-interface-background-secondary-focus` + `--colour-interface-border-primary-focus` |
| Active | `#eee` | `--colour-interface-background-secondary-active` |

#### Drop Down Menu (container panel)
| Property | Value | Token |
|----------|-------|-------|
| Layout | flex column, no gap | — |
| Min-width | 120px | — |
| Overflow | clip | — |
| Border radius | 18px | `--number-radius-rad-modal` |
| Shadow | `0px 1px 8px rgba(38,44,52,0.04)` | — |
| Padding | 0 | — |
| Background | transparent (items provide bg) | — |

#### Menu (composed trigger + dropdown)
| Property | Value | Token |
|----------|-------|-------|
| Trigger | 40x40 pill, `Menu` (hamburger) icon | — |
| Trigger radius | 999px | `--number-radius-rad-button` |
| showMenu=true | trigger + dropdown (6px gap) | `--number-spacing-gap-gap-s` |
| showMenu=false | trigger only (no dropdown) | — |

#### Icons (all from iconoir-react/regular)
| Usage | Icon | Confirmed |
|-------|------|-----------|
| Menu trigger | `Menu` | yes |
| Item placeholder | `Plus` | yes (items accept any icon) |

## Development Approach
- **Testing approach**: TDD (tests first)
- Complete each task fully before moving to the next
- Make small, focused changes
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task** — no exceptions
- **CRITICAL: update this plan file when scope changes during implementation**
- Run tests after each change

## Testing Strategy
- **Unit tests**: Vitest + React Testing Library
- Test DropdownMenuItem: renders icon + text, all 4 state styles
- Test DropdownMenuContent: renders items, min-width, rounded corners, shadow
- Test DropdownMenu: trigger opens/closes, keyboard navigation (arrow keys), Escape to close
- Test accessibility: `role="menu"`, `role="menuitem"`, `aria-expanded`

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with + prefix
- Document issues/blockers with warning prefix
- Update plan if implementation deviates from original scope

## Implementation Steps

### Task 1: Install Radix Dropdown Menu dependency
- [x] Install `@radix-ui/react-dropdown-menu` via npm
- [x] Verify import works
- [x] Run tests — must pass before next task

### Task 2: Implement DropdownMenuItem with CVA variants (TDD)
- [x] Write tests: renders icon (via `<Icon>` wrapper) + text label
- [x] Write tests: Default state has `--colour-interface-background-secondary-default` background
- [x] Write tests: component renders as a menu item (Radix `DropdownMenu.Item`)
- [x] Write tests: accepts custom `icon` prop (React component) and `children` text
- [x] Write tests: accepts `onClick` handler and fires when clicked
- [x] Implement `DropdownMenuItem` in `src/components/ui/dropdown-menu.tsx`:
  - CVA base: `flex items-center h-[40px] gap-[var(--number-spacing-gap-gap-s)] pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-m)] w-full text-medium-s text-[color:var(--colour-interface-text-default)] cursor-pointer transition-colors`
  - Default: `bg-[var(--colour-interface-background-secondary-default)]`
  - Hover: `hover:bg-[var(--colour-interface-background-secondary-hover)]` / `data-[highlighted]:bg-[var(--colour-interface-background-secondary-hover)]`
  - Focus: `focus-visible:bg-[var(--colour-interface-background-secondary-focus)] focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-[var(--colour-interface-border-primary-focus)]`
  - Active: `active:bg-[var(--colour-interface-background-secondary-active)]`
- [x] Run tests — must pass before next task

### Task 3: Implement DropdownMenuContent panel (TDD)
- [x] Write tests: renders children (DropdownMenuItem items)
- [x] Write tests: has min-width of 120px
- [x] Write tests: has correct border-radius (18px) and shadow
- [x] Write tests: overflow is clipped (rounded corners work with items)
- [x] Implement `DropdownMenuContent` in `src/components/ui/dropdown-menu.tsx`:
  - Wraps `Radix.DropdownMenuContent`
  - Styles: `flex flex-col min-w-[120px] overflow-clip rounded-[var(--number-radius-rad-modal)] shadow-[0px_1px_8px_0px_rgba(38,44,52,0.04)]`
  - Accept `className`, `align`, `sideOffset` props
  - Default `sideOffset`: 6px (gap between trigger and dropdown)
- [x] Run tests — must pass before next task

### Task 4: Implement DropdownMenu composed widget (TDD)
- [x] Write tests: renders trigger button (hamburger `Menu` icon, 40x40 pill)
- [x] Write tests: clicking trigger opens the dropdown
- [x] Write tests: dropdown has correct ARIA attributes (`role="menu"`, `aria-expanded`)
- [x] Write tests: pressing Escape closes the dropdown
- [x] Write tests: renders custom trigger when `trigger` prop is provided
- [x] Implement `DropdownMenu` in `src/components/ui/dropdown-menu.tsx`:
  - Exports `DropdownMenu` (Root), `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`
  - `DropdownMenu` = Radix `DropdownMenu.Root`
  - `DropdownMenuTrigger` = Radix `DropdownMenu.Trigger` (uses `asChild` to wrap `IconButton` or custom trigger)
  - Props forwarded to Radix: `open`, `onOpenChange`, `modal`
- [x] Run tests — must pass before next task

### Task 5: Create Storybook stories
- [x] Create `src/components/ui/dropdown-menu.stories.tsx` with Meta setup
- [x] Add `Default` story: DropdownMenu with hamburger trigger and several items
- [x] Add `WithIcons` story: items with various iconoir icons (Plus, Edit, Copy, etc.)
- [x] Add `ItemStates` story: grid showing all 4 item states (Default, Hover, Focus, Active)
- [x] Add `MenuPanel` story: standalone DropdownMenuContent panel with items
- [x] Add `CustomTrigger` story: using a Button as trigger instead of IconButton
- [x] Verify all stories render correctly in Storybook
- [x] Run tests — must pass before next task

### Task 6: Verify acceptance criteria
- [x] Verify item matches Figma: icon + text, 40px height, 4 state backgrounds
- [x] Verify panel matches Figma: rounded 18px, shadow, min-width 120px, overflow clip
- [x] Verify trigger: 40x40 pill, hamburger `Menu` icon
- [x] Verify dropdown opens/closes correctly with click and Escape
- [x] Verify keyboard navigation: arrow keys between items, Enter/Space to activate
- [x] Verify `role="menu"` and `role="menuitem"` ARIA attributes
- [x] Run full test suite (unit tests)
- [x] Run linter (`npm run lint`) — all issues must be fixed
- [x] Verify Storybook builds without errors

### Task 7: [Final] Update documentation
- [ ] Update any relevant docs if new patterns were discovered (Radix DropdownMenu usage)
- [ ] Ensure dropdown-menu components are documented

## Technical Details

### Component API
```tsx
// Full composed dropdown menu
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <IconButton
      icon={<Icon icon={Menu} />}
      aria-label="Open menu"
      variant="ghost"
      size="xs"
    />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" sideOffset={6}>
    <DropdownMenuItem icon={Plus} onClick={() => {}}>
      Add item
    </DropdownMenuItem>
    <DropdownMenuItem icon={Edit} onClick={() => {}}>
      Edit
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Props Interfaces
```tsx
// Menu item
interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item> {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  className?: string;
}

// Content panel
interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content> {
  className?: string;
}
```

### Icon Mapping (all from iconoir-react/regular)
| Usage | Icon | Import |
|-------|------|--------|
| Menu trigger | `Menu` | `import { Menu } from "iconoir-react"` |
| Item placeholder | `Plus` | `import { Plus } from "iconoir-react"` |

### Design Token References
```css
/* Backgrounds (secondary — note: different from singletone used in navbar/account-settings) */
--colour-interface-background-secondary-default: #fafafa;
--colour-interface-background-secondary-hover: #f5f5f5;
--colour-interface-background-secondary-focus: #fafafa;
--colour-interface-background-secondary-active: #eee;

/* Text */
--colour-interface-text-default: #44484c;

/* Border */
--colour-interface-border-primary-focus: #3ab6e5;

/* Radius */
--number-radius-rad-modal: 18px;
--number-radius-rad-button: 999px;

/* Spacing */
--number-spacing-gap-gap-s: 6px;
--number-spacing-padding-pad-s: 8px;
--number-spacing-padding-pad-m: 12px;
```

### Visual Structure
```
Trigger (40x40 pill):
┌───┐
│ ≡ │  ← Menu (hamburger) icon
└───┘

Dropdown panel:
┌─────────────────────┐
│ [+] Text            │ ← DropdownMenuItem (bg: #fafafa)
│ [+] Text            │ ← DropdownMenuItem
│ [+] Text            │ ← DropdownMenuItem
│ [+] Text            │ ← DropdownMenuItem
└─────────────────────┘
  ↑ rounded 18px, shadow, min-w 120px, overflow clip
```

## Post-Completion

**Manual verification:**
- Visual comparison with Figma for item states (Default, Hover, Focus, Active)
- Verify dropdown positioning (aligned to trigger, doesn't overflow viewport)
- Test click-outside-to-close behavior
- Test keyboard navigation: arrow keys between items, Enter to activate, Escape to close
- Test with screen reader: menu announces role, items are navigable
