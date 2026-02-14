# RolePill Component — Extract & Expand

## Overview
Extract the existing `RolePill` from `account-settings.tsx` into its own standalone component (`src/components/ui/role-pill.tsx`), expand it from 2 roles to all 5 Figma roles (Host, Director, Producer, Editor, Designer), and add hover/focus interactive states. Each role maps to a distinct semantic color from the design token system.

## Context (from discovery)
- **Existing implementation**: `src/components/ui/account-settings.tsx` lines 77–108 — only `host` and `producer` roles, no interactive states
- **Existing tests**: `src/components/ui/__tests__/role-pill.test.tsx` — tests for 2 roles + typography
- **Consumers**: `AccountSettingsDropdown` in `account-settings.tsx` (line 172), `account-settings.stories.tsx`
- **Patterns**: CVA variants, `cn()` utility, design tokens as CSS custom properties, `text-medium-s` typography utility
- **Figma source**: [RolePill in Design System](https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2038-236&m=dev)

### Role → Token Mapping (from Figma)

| Role | Default BG | Hover BG | Focus BG | Focus Border |
|------|-----------|----------|----------|--------------|
| host | `--colour-interface-background-primary-default` | `--colour-interface-background-primary-hover` | `--colour-interface-background-primary-focus` | `--colour-interface-border-primary-focus` |
| director | `--colour-interface-background-semantic-info-default` | `--colour-interface-background-semantic-info-hover` | `--colour-interface-background-semantic-info-default` | `--colour-interface-border-primary-focus` |
| producer | `--colour-interface-background-semantic-danger-hover` | `--colour-interface-background-semantic-danger-active` | `--colour-interface-background-semantic-danger-hover` | `--colour-interface-border-semantic-danger-focus` |
| editor | `--colour-interface-background-semantic-success-default` | `--colour-interface-background-semantic-success-hover` | `--colour-interface-background-semantic-success-default` | `--colour-interface-border-primary-focus` |
| designer | `--colour-interface-background-semantic-warning-default` | `--colour-interface-background-semantic-warning-hover` | `--colour-interface-background-semantic-warning-default` | `--colour-interface-border-primary-focus` |

### Common Styles
- Padding: `px-[var(--number-spacing-padding-pad-m)]` (12px) `py-[var(--number-spacing-padding-pad-s)]` (8px)
- Border radius: `rounded-[var(--number-radius-rad-pill)]` (999px)
- Typography: `text-medium-s` (14px, 500 weight, 18px line-height)
- Text color: `text-[color:var(--colour-interface-text-default)]`
- Focus state: 2px solid border with role-specific focus border token
- Text: lowercase role name

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- Make small, focused changes
- **CRITICAL: every task MUST include new/updated tests** for code changes in that task
- **CRITICAL: all tests must pass before starting next task**
- **CRITICAL: update this plan file when scope changes during implementation**
- Run tests after each change
- Maintain backward compatibility (re-export from account-settings)

## Testing Strategy
- **Unit tests**: required for every task
- Cover all 5 roles × 3 states + className forwarding + default role

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create standalone RolePill component file
- [ ] Create `src/components/ui/role-pill.tsx` with CVA variants for all 5 roles
- [ ] Define `rolePillVariants` with base styles (padding, radius, typography, text color)
- [ ] Add `role` variant with all 5 options: `host`, `director`, `producer`, `editor`, `designer`
- [ ] Each role variant includes: default bg, `hover:` bg, `focus-visible:` bg + border
- [ ] Export `RolePill`, `rolePillVariants`, and `RolePillProps` type
- [ ] Write unit tests for all 5 roles (default bg token applied)
- [ ] Write unit tests for className forwarding and default rendering
- [ ] Run tests — must pass before next task

### Task 2: Update account-settings.tsx to use extracted component
- [ ] Remove `RolePill`, `rolePillVariants`, and `RolePillProps` from `account-settings.tsx`
- [ ] Import `RolePill` and `rolePillVariants` from `@/components/ui/role-pill`
- [ ] Re-export `RolePill` and `rolePillVariants` from `account-settings.tsx` for backward compat
- [ ] Update the `roles` type in `AccountSettingsDropdownProps` to accept all 5 roles
- [ ] Verify existing `role-pill.test.tsx` still passes (update import path)
- [ ] Verify existing `account-settings` tests still pass
- [ ] Run tests — must pass before next task

### Task 3: Add Storybook stories for RolePill
- [ ] Create `src/components/ui/role-pill.stories.tsx`
- [ ] Add `Default` story with `host` role
- [ ] Add individual stories for each role: `Host`, `Director`, `Producer`, `Editor`, `Designer`
- [ ] Add `AllRoles` grid story showing all 5 roles side by side
- [ ] Add hover/focus pseudo-state stories
- [ ] Run tests — must pass before next task

### Task 4: Verify acceptance criteria
- [ ] All 5 roles render with correct semantic background colors
- [ ] Hover state changes background color per role
- [ ] Focus-visible state shows 2px border + correct background per role
- [ ] Backward compatibility maintained (account-settings re-exports work)
- [ ] Run full test suite (`npm run test`)
- [ ] Run linter (`npm run lint`) — all issues must be fixed
- [ ] Visual comparison with Figma in Storybook

### Task 5: [Final] Update documentation
- [ ] Update this plan to `completed` status

## Technical Details

### CVA Structure
```tsx
const rolePillVariants = cva(
  "inline-flex items-center justify-center px-[...] py-[...] rounded-[...] text-medium-s text-[color:...] transition-colors focus-visible:outline-none focus-visible:ring-0",
  {
    variants: {
      role: {
        host: "bg-[...] hover:bg-[...] focus-visible:bg-[...] focus-visible:border-2 focus-visible:border-[...]",
        director: "...",
        producer: "...",
        editor: "...",
        designer: "...",
      },
    },
    defaultVariants: { role: "host" },
  }
);
```

### Props Interface
```tsx
interface RolePillProps extends VariantProps<typeof rolePillVariants> {
  role: "host" | "director" | "producer" | "editor" | "designer";
  className?: string;
}
```

## Post-Completion
- Visual QA in Storybook against Figma dev mode
- Verify in AccountSettings dropdown with all 5 roles
