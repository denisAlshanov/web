# TeamMemberTip Component

## Overview
Create a new `TeamMemberTip` UI component (`src/components/ui/team-member-tip.tsx`) — a small circular team member avatar with an optional hover tooltip showing the member's name. Used in team avatar stacks within CalendarEvent and potentially other team-related views.

## Context (from discovery)
- **No existing implementation** — brand new component
- **Figma source**: [TeamMemberTip in Design System](https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2303-1161&m=dev)
- **Location**: `src/components/ui/` (generic avatar+tooltip primitive)
- **No tooltip library installed** — implementing as custom CSS hover tooltip
- **Consumer**: CalendarEvent component (planned in `calendar-event-component.md`)
- **Related**: AccountSettings already has avatar rendering with fallback initials (pattern to follow)

### Figma Specs

| Property | Size `m` | Size `s` |
|----------|----------|----------|
| Avatar diameter | 24px | 20px |
| Avatar shape | Circle (rounded-full) | Circle (rounded-full) |

### Tooltip Specs (shown on hover)
| Property | Value |
|----------|-------|
| Background | `--colour-interface-background-tertiary-default` (#EEEEEE) |
| Border radius | `--number-radius-rad-modal` (18px) |
| Height | 32px |
| Min width | 44px |
| Padding | `px-pad-m` (12px) `py-pad-s` (8px) |
| Typography | `text-medium-s` (14px, 500 weight, 18px line-height) |
| Text color | `--colour-interface-text-default` (#44484C) |
| Text align | Center, truncated with ellipsis |
| Position | Centered above avatar, 44px offset from top |
| Pointer | Small downward-pointing arrow below the pill, centered |

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- Custom CSS hover tooltip using `group` + `group-hover:` pattern
- All colors/spacing/radii from design tokens

## Testing Strategy
- **Unit tests**: required for every task
- Cover both sizes, tooltip visibility, fallback avatar, className forwarding

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create TeamMemberTip with avatar and CVA size variant
- [ ] Create `src/components/ui/team-member-tip.tsx`
- [ ] Define `teamMemberTipVariants` CVA with `size` variant: `m` (24px → `size-6`) and `s` (20px → `size-5`)
- [ ] Render circular avatar `<img>` with `rounded-full object-cover` at variant size
- [ ] Add fallback: if no `avatarUrl`, show colored circle with first letter of `name` (same pattern as AccountSettings)
- [ ] Add `group` class to root for hover tooltip
- [ ] Define `TeamMemberTipProps`: `name` (string), `avatarUrl?` (string), `size?` (`m` | `s`, default `m`), `className?`
- [ ] Export `TeamMemberTip`, `teamMemberTipVariants`
- [ ] Write unit tests: renders avatar image at correct size, renders fallback initial, forwards className
- [ ] Write unit tests: size `m` renders 24px, size `s` renders 20px
- [ ] Run tests — must pass before next task

### Task 2: Add hover tooltip with pointer arrow
- [ ] Add tooltip container: absolutely positioned above avatar, hidden by default, visible on `group-hover:`
- [ ] Tooltip pill: tertiary-default bg, rad-modal radius, h-8, min-w-11, px-pad-m py-pad-s, text-medium-s, text-default color, centered text, truncated with ellipsis, whitespace-nowrap
- [ ] Tooltip pointer: small CSS triangle (or inline SVG) pointing downward, centered below the pill
- [ ] Position tooltip centered above avatar with appropriate offset (~44px above top of avatar)
- [ ] Add `aria-label` on the avatar for screen readers (tooltip is visual-only, name is accessible via label)
- [ ] Write unit tests: tooltip text renders with correct name
- [ ] Write unit tests: tooltip has correct accessibility attributes
- [ ] Run tests — must pass before next task

### Task 3: Add Storybook stories
- [ ] Create `src/components/ui/team-member-tip.stories.tsx`
- [ ] Add `DefaultMedium` story (size m, with avatar)
- [ ] Add `DefaultSmall` story (size s, with avatar)
- [ ] Add `WithTooltipHover` story with pseudo hover state to show tooltip
- [ ] Add `FallbackAvatar` story (no avatarUrl, shows initial)
- [ ] Add `AvatarStack` story showing multiple TeamMemberTips overlapping (preview for CalendarEvent usage)
- [ ] Run tests — must pass before next task

### Task 4: Verify acceptance criteria
- [ ] Both sizes render correctly (24px and 20px)
- [ ] Tooltip appears on hover with name, centered above avatar
- [ ] Tooltip pointer arrow points down correctly
- [ ] Fallback avatar shows initial when no image
- [ ] All colors from design tokens
- [ ] Run full test suite (`npm run test`)
- [ ] Run linter (`npm run lint`) — all issues must be fixed
- [ ] Visual comparison with Figma in Storybook

### Task 5: [Final] Update documentation
- [ ] Update this plan to completed status

*Note: ralphex automatically moves completed plans to `docs/plans/completed/`*

## Technical Details

### Component API
```tsx
interface TeamMemberTipProps extends VariantProps<typeof teamMemberTipVariants> {
  name: string;
  avatarUrl?: string;
  size?: "m" | "s";
  className?: string;
}
```

### CVA Structure
```tsx
const teamMemberTipVariants = cva(
  "group relative shrink-0 rounded-full",
  {
    variants: {
      size: {
        m: "size-6",  // 24px
        s: "size-5",  // 20px
      },
    },
    defaultVariants: { size: "m" },
  }
);
```

### Tooltip Implementation
```tsx
{/* Tooltip — visible on hover */}
<div className={cn(
  "absolute left-1/2 -translate-x-1/2 bottom-full mb-2",
  "opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
  "z-10",
)}>
  {/* Pill */}
  <div className={cn(
    "flex items-center justify-center",
    "h-8 min-w-[44px] px-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-s)]",
    "bg-[var(--colour-interface-background-tertiary-default)]",
    "rounded-[var(--number-radius-rad-modal)]",
    "text-medium-s text-[color:var(--colour-interface-text-default)]",
    "whitespace-nowrap overflow-hidden text-ellipsis text-center",
  )}>
    {name}
  </div>
  {/* Pointer arrow */}
  <div className="flex justify-center">
    <svg width="24" height="8" viewBox="0 0 24 8" className="text-[var(--colour-interface-background-tertiary-default)]">
      <path d="M12 8L8 0H16L12 8Z" fill="currentColor" />
    </svg>
  </div>
</div>
```

### Fallback Avatar
```tsx
{avatarUrl ? (
  <img
    src={avatarUrl}
    alt={name}
    className="size-full rounded-full object-cover"
  />
) : (
  <div
    aria-label={name}
    className={cn(
      "size-full rounded-full flex items-center justify-center",
      "bg-[var(--colour-interface-background-singleTone-hover)]",
      "text-[color:var(--colour-interface-text-default)]",
      size === "m" ? "text-medium-xs" : "text-[10px] font-medium",
    )}
  >
    {name.charAt(0).toUpperCase()}
  </div>
)}
```

## Post-Completion
- Visual QA in Storybook against Figma dev mode
- Test tooltip positioning when avatar is near container edges
- Verify overlapping avatar stacks don't clip tooltips (z-index)
