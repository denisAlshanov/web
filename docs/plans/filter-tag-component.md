# FilterTag Component

## Overview
Create a new `FilterTag` UI component (`src/components/ui/filter-tag.tsx`) — a pill-shaped filter chip used for toggling, selecting, and managing filters. Supports two modes: **non-editable** (read-only toggle) and **editable** (with edit/delete action buttons on hover, confirm icon when editing). Each mode has 6 visual states handled via CSS pseudo-classes and props.

## Context (from discovery)
- **No existing implementation** — this is a brand new component
- **Figma source**: [FilterTag in Design System](https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2204-675&m=dev)
- **Patterns**: CVA variants, `cn()` utility, `Icon` wrapper from `@/components/ui/icon`, design tokens as CSS custom properties
- **Related components**: `Button` (for icon prop pattern, focus ring pattern), `RolePill` (similar pill shape)
- **Icons needed**: `Plus`, `Xmark`, `EditPencil`, `Check`, `Trash` from `iconoir-react`

### State → Token Mapping (Non-editable)

| State | Background | Border | Text Color | Icon Color | Extra |
|-------|-----------|--------|------------|------------|-------|
| Default | `surface-base` (white) | 2px `border-primary-light` | `text-supporting` | `supporting` | — |
| Disabled | `surface-base` (white) | 2px `border-primary-light` | `text-supporting` | `supporting` | opacity-50 |
| Hover | `background-secondary-hover` | 2px `border-primary-light` | `text-supporting` | `supporting` | — |
| Active (pressed) | `background-secondary-active` | 2px `border-primary-light` | `text-default` | `default` | — |
| Focused | `surface-base` (white) | 2px `border-primary-light` + ring-2 `border-primary-focus` | `text-supporting` | `supporting` | focus ring |
| Selected | `background-inverse-default` | none | `text-onHeavy` | `onHeavy` | — |

### State → Token Mapping (Editable — inherits base from above, differences noted)

| State | Differences from non-editable |
|-------|-------------------------------|
| Default | Same as non-editable |
| Disabled | Same as non-editable |
| Hover | Same bg as default (white) + edit pencil & trash action icons appear |
| Active (editing) | Border changes to `border-primary-medium`, text becomes `text-default`, shows check icon instead of edit/trash |
| Focused | Same focus ring + edit pencil & trash action icons appear |
| Selected | Same as non-editable selected |

### Common Styles
- Height: 36px (`h-9`)
- Min-width: 64px
- Padding: 12px (`pad-m`)
- Gap: 4px (`gap-xs`)
- Border: 2px solid
- Border radius: `rad-button` (999px)
- Typography: `text-semibold-s` (14px, 600 weight, 16px line-height)

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- Make small, focused changes
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- **CRITICAL: update this plan file when scope changes during implementation**
- Use the `Icon` wrapper for all icons — never use raw iconoir components
- All colors/spacing/radii from design tokens — no hardcoded values

## Testing Strategy
- **Unit tests**: required for every task
- Cover both editable and non-editable modes
- Cover all interactive states and prop combinations

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create non-editable FilterTag with CVA variants
- [x] Create `src/components/ui/filter-tag.tsx`
- [x] Define `filterTagVariants` CVA with base styles: height (h-9), min-w (min-w-16), padding (pad-m), gap (gap-xs), border-radius (rad-button), typography (text-semibold-s), border (2px solid border-primary-light), transition-colors, cursor-pointer, inline-flex items-center justify-center
- [x] Add `selected` boolean variant: `false` = default styling, `true` = inverse bg + onHeavy text + no border
- [x] Add CSS pseudo-class states for non-selected: `hover:bg-[secondary-hover]`, `active:bg-[secondary-active] active:text-[default]`, `focus-visible:ring-2 ring-[border-primary-focus]`
- [x] Add `aria-disabled:opacity-50 aria-disabled:pointer-events-none` for disabled state
- [x] Define `FilterTagProps`: `children` (string), `selected?`, `disabled?`, `leadingIcon?` (ComponentType), `trailingIcon?` (ComponentType), `className?`, `onClick?`, plus standard button HTML attributes
- [x] Render as `<button>` with Icon wrapper for leading/trailing icons; icon color switches based on `selected` (onHeavy vs supporting)
- [x] Export `FilterTag`, `filterTagVariants`
- [x] Write unit tests: renders default state with text, renders with leading/trailing icons, applies selected styles, applies disabled opacity, forwards className
- [x] Write unit tests: onClick fires when not disabled, onClick does not fire when disabled
- [x] Run tests — must pass before next task

### Task 2: Add editable mode with action buttons
- [x] Add `editable?: boolean` prop to `FilterTagProps`
- [x] Add `editing?: boolean` prop — controlled state for "actively editing" (shows check icon, medium border)
- [x] Add callbacks: `onEdit?: () => void`, `onDelete?: () => void`, `onConfirm?: () => void`
- [x] When `editable` and not `selected` and not `disabled`: render edit (EditPencil) and delete (Trash) icon buttons, hidden by default, visible on hover via `group` + `group-hover:flex` pattern
- [x] When `editing`: show Check icon button instead of edit/trash, change border to `border-primary-medium`, text to `text-default`
- [x] Action icon buttons: small click targets (24px), prevent event propagation to parent button
- [x] Write unit tests: editable mode renders edit/delete buttons, editing mode renders confirm button
- [x] Write unit tests: onEdit/onDelete/onConfirm callbacks fire correctly
- [x] Write unit tests: action buttons not shown when selected or disabled
- [x] Run tests — must pass before next task

### Task 3: Add Storybook stories
- [x] Create `src/components/ui/filter-tag.stories.tsx`
- [x] Add `Default` story
- [x] Add stories: `WithLeadingIcon`, `WithTrailingIcon`, `WithBothIcons`
- [x] Add `Selected` story (dark bg)
- [x] Add `Disabled` story
- [x] Add hover/focus/active pseudo-state stories
- [x] Add `Editable` story (shows action buttons on hover)
- [x] Add `Editing` story (shows check icon, medium border)
- [x] Add `EditableSelected` story
- [x] Add `StateGrid` story showing all states side by side
- [x] Run tests — must pass before next task

### Task 4: Verify acceptance criteria
- [ ] All 6 non-editable states render correctly (Default, Disabled, Hover, Active, Focused, Selected)
- [ ] All 6 editable states render correctly with action buttons
- [ ] Icons use the `Icon` wrapper, not raw iconoir
- [ ] All colors from design tokens, no hardcoded values
- [ ] Run full test suite (`npm run test`)
- [ ] Run linter (`npm run lint`) — all issues must be fixed
- [ ] Visual comparison with Figma in Storybook

### Task 5: [Final] Update documentation
- [ ] Update this plan to completed status

*Note: ralphex automatically moves completed plans to `docs/plans/completed/`*

## Technical Details

### Component API
```tsx
interface FilterTagProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof filterTagVariants> {
  children: string;
  selected?: boolean;
  editable?: boolean;
  editing?: boolean;
  leadingIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  trailingIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  onEdit?: () => void;
  onDelete?: () => void;
  onConfirm?: () => void;
  className?: string;
}
```

### CVA Structure
```tsx
const filterTagVariants = cva(
  [
    "group inline-flex items-center justify-center",
    "h-9 min-w-16",
    "p-[var(--number-spacing-padding-pad-m)]",
    "gap-[var(--number-spacing-gap-gap-xs)]",
    "rounded-[var(--number-radius-rad-button)]",
    "text-semibold-s",
    "transition-colors cursor-pointer",
    "focus-visible:outline-none",
    "aria-disabled:opacity-50 aria-disabled:pointer-events-none",
  ],
  {
    variants: {
      selected: {
        false: [
          "bg-[var(--colour-interface-surface-base)]",
          "border-2 border-[var(--colour-interface-border-primary-light)]",
          "text-[color:var(--colour-interface-text-supporting)]",
          "hover:bg-[var(--colour-interface-background-secondary-hover)]",
          "active:bg-[var(--colour-interface-background-secondary-active)]",
          "active:text-[color:var(--colour-interface-text-default)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--colour-interface-border-primary-focus)]",
        ],
        true: [
          "bg-[var(--colour-interface-background-inverse-default)]",
          "border-2 border-transparent",
          "text-[color:var(--colour-interface-text-onHeavy)]",
        ],
      },
    },
    defaultVariants: { selected: false },
  }
);
```

### Focus State
Uses `focus-visible:ring-2` (box-shadow based) to create the outer focus ring, while the existing 2px border provides the inner border — matching the double-border effect in Figma without nested containers.

### Editable Action Buttons
Hidden by default via `hidden group-hover:flex` (or `opacity-0 group-hover:opacity-100`) on the action button wrapper. The `group` class on the root element enables hover-driven visibility.

### Icon Color Logic
- Non-selected: `supporting` (default icon color)
- Non-selected + active: `default` (heavier icon color)
- Selected: `onHeavy` (white)

## Post-Completion
- Visual QA in Storybook against Figma dev mode
- Test keyboard navigation (Tab to focus, Enter/Space to toggle)
- Verify hover action buttons don't shift layout
