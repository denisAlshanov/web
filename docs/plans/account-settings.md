# Account Settings Component

## Overview
- Create the Account Settings component system: a trigger button with a dropdown menu showing user profile info and settings links
- Three sub-components: `AccountSettingsItem` (menu item primitive), `AccountSettingsDropdown` (dropdown panel), `AccountSettings` (composed trigger + popover)
- Built on `@radix-ui/react-popover` for accessible open/close, focus management, click-outside-to-close, and positioning
- All in `src/components/ui/` as reusable primitives
- Figma reference: https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2038-240&m=dev

## Context (from discovery)
- **Files/components involved**: new `src/components/ui/account-settings.tsx`, new `src/components/ui/account-settings.stories.tsx`
- **Related patterns found**: CVA variants (`button.tsx`), `cn()` utility, `<Icon>` wrapper (`icon.tsx`), existing Select component (custom dropdown pattern)
- **Dependencies identified**: `@radix-ui/react-popover` (to install), `iconoir-react` (icons: `User`, `LogOut`, `NavArrowDown`, `NavArrowUp` — all confirmed available)
- **No prerequisite plans**: all icons are standard iconoir outline icons

### Figma Design Specifications

#### Account Settings Trigger (collapsed button)
| Property | Value | Token |
|----------|-------|-------|
| Padding | 12px all | `--number-spacing-padding-pad-m` |
| Gap | 6px | `--number-spacing-gap-gap-s` |
| Border radius | 12px | `--number-radius-rad-inner-card` |
| Text | "Alexander Plushev" (dynamic) | `text-semibold-m` (16px/600) |
| Text color | `#44484c` | `--colour-interface-text-default` |
| Chevron icon | `NavArrowDown` (closed) / `NavArrowUp` (open) | 24x24 |
| Default bg | white | `--colour-interface-background-singleTone-default` |
| Hover bg | `#f5f5f5` | `--colour-interface-background-singleTone-hover` |
| Focus bg | white + 3px border `#3ab6e5` | `--colour-interface-background-singleTone-focus` + `--colour-interface-border-primary-focus` |
| Active bg | `#eee` | `--colour-interface-background-singleTone-active` |

#### Account Settings Item (menu item)
| Property | Value | Token |
|----------|-------|-------|
| Padding | 12px vertical, 8px left, 12px right | `pad-m`, `pad-s`, `pad-m` |
| Gap | 6px | `--number-spacing-gap-gap-s` |
| Border radius | 12px | `--number-radius-rad-inner-card` |
| Icon | 24x24 | — |
| Text | 16px/500 | `text-medium-m` |

**Default style states:**
| State | Background | Token |
|-------|-----------|-------|
| Default | white | `--colour-interface-background-singleTone-default` |
| Hover | `#f5f5f5` | `--colour-interface-background-singleTone-hover` |
| Focus | white + 3px border `#3ab6e5` | `--colour-interface-background-singleTone-focus` + `--colour-interface-border-primary-focus` |
| Active | `#eee` | `--colour-interface-background-singleTone-active` |
| Text color | `#44484c` | `--colour-interface-text-default` |

**Danger style states:**
| State | Background | Token |
|-------|-----------|-------|
| Default | white | `--colour-interface-background-semantic-danger-default` |
| Hover | `#fce3e7` | `--colour-interface-background-semantic-danger-hover` |
| Focus | white | `--colour-interface-background-semantic-danger-focus` |
| Active | `#f8b8c2` | `--colour-interface-background-semantic-danger-active` |
| Text color | `#a3113b` | `--colour-interface-text-semantic-danger` |
| Icon color | `#a3113b` | `--colour-interface-icon-semantic-danger` (via `<Icon color="danger">`) |

#### Account Settings Dropdown (panel)
| Property | Value | Token |
|----------|-------|-------|
| Background | white | `--colour-interface-surface-base` |
| Border radius | 18px | `--number-radius-rad-modal` |
| Shadow | `0px 1px 8px rgba(38,44,52,0.04)` | — |
| Padding | 24px top, 12px left, 24px right, 18px bottom | `pad-xl`, `pad-m`, `pad-xl`, `pad-l` |
| Gap (sections) | 24px | `--number-spacing-gap-gap-xl` |

**Profile Info section:**
| Property | Value |
|----------|-------|
| Avatar | 64x64 circle image |
| Name | "Alexander Plushev" — bold 18px/24px (`text-heading-s` or custom bold) — `--colour-interface-text-heavy` |
| Role pills gap | 6px |
| Gap (avatar to name) | 12px |

**Role Pills:**
| Role | Background | Token |
|------|-----------|-------|
| host | `#f7fbff` | `--colour-interface-background-primary-default` |
| producer | `#fce3e7` | `--colour-interface-background-semantic-danger-hover` |
| Text | 14px/500 `text-medium-s`, color `--colour-interface-text-default` |
| Padding | 8px vertical, 12px horizontal |
| Radius | 999px (pill) | `--number-radius-rad-pill` |

**Menu section:**
| Property | Value |
|----------|-------|
| "SETTINGS" header | 14px/600 uppercase, `--colour-interface-text-supporting` (`text-heading-eyebrow`) |
| Header padding bottom | 4px |
| Items gap | 6px |
| Item 1 | "Account Info" — Default style, `User` icon |
| Item 2 | "Log out" — Danger style, `LogOut` icon |

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
- Test AccountSettingsItem: Default and Danger style rendering, icon and text content
- Test AccountSettingsDropdown: profile info rendering, role pills, menu items
- Test AccountSettings: trigger renders name + chevron, popover opens/closes, accessible attributes
- Test keyboard: Escape to close, focus management

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with + prefix
- Document issues/blockers with warning prefix
- Update plan if implementation deviates from original scope

## Implementation Steps

### Task 1: Install Radix Popover dependency
- [x] Install `@radix-ui/react-popover` via npm
- [x] Verify import works
- [x] Run tests — must pass before next task

### Task 2: Implement AccountSettingsItem with CVA variants (TDD)
- [x] Write tests: Default style renders icon + text with correct colors
- [x] Write tests: Danger style renders icon + text with danger colors (#a3113b)
- [x] Write tests: accepts custom `icon` prop (React component) and `children` text
- [x] Write tests: component renders as a button by default
- [x] Implement `AccountSettingsItem` in `src/components/ui/account-settings.tsx`:
  - CVA `intent` variant: `default` and `danger`
  - Base: `flex items-center gap-[var(--number-spacing-gap-gap-s)] pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-m)] rounded-[var(--number-radius-rad-inner-card)] text-medium-m cursor-pointer transition-colors`
  - Default style:
    - `bg-[var(--colour-interface-background-singleTone-default)]`
    - `hover:bg-[var(--colour-interface-background-singleTone-hover)]`
    - `focus-visible:bg-[var(--colour-interface-background-singleTone-focus)] focus-visible:ring-3 focus-visible:ring-[var(--colour-interface-border-primary-focus)]`
    - `active:bg-[var(--colour-interface-background-singleTone-active)]`
    - Text: `text-[color:var(--colour-interface-text-default)]`
  - Danger style:
    - `bg-[var(--colour-interface-background-semantic-danger-default)]`
    - `hover:bg-[var(--colour-interface-background-semantic-danger-hover)]`
    - `focus-visible:bg-[var(--colour-interface-background-semantic-danger-focus)]`
    - `active:bg-[var(--colour-interface-background-semantic-danger-active)]`
    - Text: `text-[color:var(--colour-interface-text-semantic-danger)]`
- [x] Run tests — must pass before next task

### Task 3: Implement RolePill sub-component (TDD)
- [x] Write tests: "host" role renders with blue-ish bg (`--colour-interface-background-primary-default`)
- [x] Write tests: "producer" role renders with pink bg (`--colour-interface-background-semantic-danger-hover`)
- [x] Write tests: renders role text (lowercase) with correct typography (`text-medium-s`)
- [x] Implement `RolePill` in `src/components/ui/account-settings.tsx`:
  - CVA `role` variant: `host` and `producer`
  - Base: `inline-flex items-center justify-center px-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-s)] rounded-[var(--number-radius-rad-pill)] text-medium-s text-[color:var(--colour-interface-text-default)]`
  - host: `bg-[var(--colour-interface-background-primary-default)]`
  - producer: `bg-[var(--colour-interface-background-semantic-danger-hover)]`
- [x] Run tests — must pass before next task

### Task 4: Implement AccountSettingsDropdown panel (TDD)
- [x] Write tests: renders avatar image (64x64)
- [x] Write tests: renders user name ("Alexander Plushev") with bold 18px styling
- [x] Write tests: renders role pills ("host", "producer")
- [x] Write tests: renders "SETTINGS" header (uppercase, supporting color)
- [x] Write tests: renders "Account Info" item with `User` icon (Default style)
- [x] Write tests: renders "Log out" item with `LogOut` icon (Danger style)
- [x] Implement `AccountSettingsDropdown` in `src/components/ui/account-settings.tsx`:
  - Props: `userName: string`, `avatarUrl?: string`, `roles: Array<"host" | "producer">`, `onAccountInfoClick?: () => void`, `onLogoutClick?: () => void`
  - Container: white bg, rounded-18px (rad-modal), shadow, asymmetric padding (24px top, 12px left, 24px right, 18px bottom)
  - Profile section: avatar (64x64 circle) + name (bold 18px, `--colour-interface-text-heavy`) + role pills
  - Menu section: "SETTINGS" header (`text-heading-eyebrow`) + AccountSettingsItem entries
- [x] Run tests — must pass before next task

### Task 5: Implement AccountSettings composed widget (TDD)
- [x] Write tests: trigger renders user name + NavArrowDown icon when closed
- [x] Write tests: trigger renders user name + NavArrowUp icon when open
- [x] Write tests: clicking trigger opens the dropdown
- [x] Write tests: dropdown has correct ARIA attributes (role, aria-expanded)
- [x] Write tests: pressing Escape closes the dropdown
- [x] Implement `AccountSettings` in `src/components/ui/account-settings.tsx`:
  - Uses `@radix-ui/react-popover` (Root, Trigger, Content)
  - Trigger: flex row, name text (`text-semibold-m`) + chevron icon (NavArrowDown/NavArrowUp based on open state)
  - Trigger states via CVA: default, hover, focus, active (same as the item default style)
  - Content: renders `AccountSettingsDropdown` inside popover
  - Props: `userName`, `avatarUrl`, `roles`, `onAccountInfoClick`, `onLogoutClick`, `className`
- [x] Run tests — must pass before next task

### Task 6: Create Storybook stories
- [x] Create `src/components/ui/account-settings.stories.tsx` with Meta setup
- [x] Add `Default` story: AccountSettings trigger (closed state)
- [x] Add `Open` story: AccountSettings with dropdown open (showing full dropdown panel)
- [x] Add `ItemDefault` story: AccountSettingsItem with Default style in all states
- [x] Add `ItemDanger` story: AccountSettingsItem with Danger style in all states
- [x] Add `DropdownPanel` story: standalone AccountSettingsDropdown panel
- [x] Add `RolePills` story: host and producer pills side by side
- [x] Verify all stories render correctly in Storybook
- [x] Run tests — must pass before next task

### Task 7: Verify acceptance criteria
- [x] Verify trigger matches Figma: name + chevron, 4 state backgrounds
- [x] Verify dropdown matches Figma: avatar, name (bold 18px), role pills, "SETTINGS" header, menu items
- [x] Verify "Account Info" item uses `User` icon with default styling
- [x] Verify "Log out" item uses `LogOut` icon with danger red (#a3113b) styling
- [x] Verify role pills: "host" (blue bg), "producer" (pink bg)
- [x] Verify popover opens/closes correctly with click and Escape
- [x] Run full test suite (unit tests)
- [x] Run linter (`npm run lint`) — all issues must be fixed
- [x] Verify Storybook builds without errors

### Task 8: [Final] Update documentation
- [x] Update any relevant docs if new patterns were discovered (Radix Popover usage)
- [x] Add AccountSettings components to component inventory

## Technical Details

### Component API

```tsx
// Full composed widget
<AccountSettings
  userName="Alexander Plushev"
  avatarUrl="/avatars/user.jpg"
  roles={["host", "producer"]}
  onAccountInfoClick={() => router.push("/settings")}
  onLogoutClick={() => signOut()}
/>

// Individual menu item (reusable)
<AccountSettingsItem
  icon={User}
  intent="default"
  onClick={() => {}}
>
  Account Info
</AccountSettingsItem>

<AccountSettingsItem
  icon={LogOut}
  intent="danger"
  onClick={() => {}}
>
  Log out
</AccountSettingsItem>

// Role pill (reusable)
<RolePill role="host" />
<RolePill role="producer" />
```

### Props Interfaces

```tsx
// Menu item
interface AccountSettingsItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accountSettingsItemVariants> {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

// Role pill
interface RolePillProps extends VariantProps<typeof rolePillVariants> {
  role: "host" | "producer";
  className?: string;
}

// Dropdown panel
interface AccountSettingsDropdownProps {
  userName: string;
  avatarUrl?: string;
  roles: Array<"host" | "producer">;
  onAccountInfoClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

// Full widget
interface AccountSettingsProps extends AccountSettingsDropdownProps {
  className?: string;
}
```

### Icon Mapping (all from iconoir-react/regular)
| Usage | Icon | Import |
|-------|------|--------|
| Account Info menu item | `User` | `import { User } from "iconoir-react"` |
| Log out menu item | `LogOut` | `import { LogOut } from "iconoir-react"` |
| Trigger chevron (closed) | `NavArrowDown` | `import { NavArrowDown } from "iconoir-react"` |
| Trigger chevron (open) | `NavArrowUp` | `import { NavArrowUp } from "iconoir-react"` |

### Design Token References
```css
/* Backgrounds */
--colour-interface-background-singleTone-default: white;
--colour-interface-background-singleTone-hover: #f5f5f5;
--colour-interface-background-singleTone-focus: white;
--colour-interface-background-singleTone-active: #eee;
--colour-interface-background-primary-default: #f7fbff;
--colour-interface-background-semantic-danger-default: white;
--colour-interface-background-semantic-danger-hover: #fce3e7;
--colour-interface-background-semantic-danger-focus: white;
--colour-interface-background-semantic-danger-active: #f8b8c2;
--colour-interface-surface-base: white;

/* Text */
--colour-interface-text-heavy: #23262a;
--colour-interface-text-default: #44484c;
--colour-interface-text-supporting: #64676c;
--colour-interface-text-semantic-danger: #a3113b;

/* Border */
--colour-interface-border-primary-focus: #3ab6e5;

/* Radius */
--number-radius-rad-inner-card: 12px;
--number-radius-rad-modal: 18px;
--number-radius-rad-pill: 999px;

/* Spacing */
--number-spacing-gap-gap-s: 6px;
--number-spacing-gap-gap-xl: 24px;
--number-spacing-padding-pad-s: 8px;
--number-spacing-padding-pad-m: 12px;
--number-spacing-padding-pad-l: 18px;
--number-spacing-padding-pad-xl: 24px;
```

## Post-Completion

**Manual verification:**
- Visual comparison with Figma for trigger (all 4 states) and dropdown panel
- Verify popover positioning (aligned to trigger, doesn't overflow viewport)
- Test click-outside-to-close behavior
- Test keyboard navigation: Tab through items, Escape to close
- Test with screen reader: trigger announces expanded/collapsed state
