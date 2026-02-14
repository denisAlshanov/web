# SortingPill Component

## Overview
Create a new `SortingPill` UI component (`src/components/ui/sorting-pill.tsx`) — a pill-shaped dropdown trigger for sorting. Shows "Sort by" label with a chevron that flips when expanded. Composes with the existing `SelectDropdown` and `SelectDropdownItem` components for the dropdown panel.

The component has 7 visual states: Default, Disabled, Hover, Active (pressed), Focused (keyboard), Expanded (dropdown open), and Filled (value selected with heavier border).

## Context (from discovery)
- **No existing implementation** — brand new component
- **Figma source**: [Sorting in Design System](https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2204-2042&m=dev)
- **Reuses**: `SelectDropdown` for dropdown panel, `SelectDropdownItem` for dropdown items
- **Patterns from**: `Select` component (open/close/escape/click-outside logic), `Button` (icon prop pattern, CVA structure)
- **Icons**: `NavArrowDown`, `NavArrowUp` from `iconoir-react` via `Icon` wrapper

### State → Token Mapping

| State | Background | Border | Text Color | Chevron Icon | Extra |
|-------|-----------|--------|------------|-------------|-------|
| Default | `surface-base` | 2px `border-primary-light` | `text-supporting` | NavArrowDown / `supporting` | — |
| Disabled | `surface-base` | 2px `border-primary-light` | `text-supporting` | NavArrowDown / `supporting` | opacity-50 |
| Hover | `background-secondary-hover` | 2px `border-primary-light` | `text-supporting` | NavArrowDown / `supporting` | — |
| Active (pressed) | `background-secondary-active` | 2px `border-primary-light` | `text-default` | NavArrowDown / `default` | — |
| Focused | `surface-base` | 2px `border-primary-light` + ring-2 `border-primary-focus` | `text-supporting` | NavArrowDown / `supporting` | focus ring |
| Expanded (open) | `surface-base` | 2px `border-primary-light` | `text-default` | NavArrowUp / `default` | dropdown visible |
| Filled (value selected) | `surface-base` | 2px `border-primary-heavy` | `text-default` | NavArrowDown / `default` | heavier border |

### Common Styles
- Height: 36px (`h-9`)
- Min-width: 64px
- Padding: `pl-12px pr-8px py-12px` (asymmetric — less right padding for chevron)
- Gap: 4px (`gap-xs`)
- Border radius: `rad-button` (999px, pill)
- Typography: `text-semibold-s` (14px, 600 weight, 16px line-height)
- Optional leading icon slot
- Dropdown: positioned absolute below trigger, uses `SelectDropdown` with `rad-input` radius

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- **CRITICAL: update this plan file when scope changes during implementation**
- Reuse open/close/escape/click-outside pattern from existing `Select` component
- Use `Icon` wrapper for all icons
- All colors/spacing/radii from design tokens

## Testing Strategy
- **Unit tests**: required for every task
- Cover all 7 states, open/close behavior, keyboard interactions, option selection

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create SortingPill trigger with CVA variants and open/close logic
- [ ] Create `src/components/ui/sorting-pill.tsx`
- [ ] Define `sortingPillVariants` CVA with base styles: h-9, min-w-16, pl-pad-m, pr-pad-s, py-pad-m, gap-xs, rad-button, text-semibold-s, border-2, transition-colors, cursor-pointer, inline-flex items-center
- [ ] Add CSS pseudo-class states: `hover:bg-[secondary-hover]`, `active:bg-[secondary-active] active:text-[default]`, `focus-visible:ring-2 ring-[border-primary-focus]`, `aria-disabled:opacity-50 aria-disabled:pointer-events-none`
- [ ] Handle visual variants for trigger: open state (text-default), filled state (border-primary-heavy, text-default), default state (border-primary-light, text-supporting)
- [ ] Define `SortingPillProps`: `placeholder` (default "Sort by"), `value?`, `options` (array of `{value, label, icon?}`), `onValueChange?`, `leadingIcon?`, `disabled?`, `open?`, `onOpenChange?`, `className?`
- [ ] Implement controlled/uncontrolled open state pattern (same as `Select`)
- [ ] Render chevron: `NavArrowUp` when open, `NavArrowDown` when closed; icon color switches to `default` when open/filled/active, `supporting` otherwise
- [ ] Add open/close behavior: click outside closes, Escape closes + returns focus, focusout closes (reuse pattern from `Select`)
- [ ] Export `SortingPill`, `sortingPillVariants`
- [ ] Write unit tests: renders with placeholder text, renders value when provided, chevron flips on open
- [ ] Write unit tests: click toggles open state, Escape closes, click outside closes
- [ ] Write unit tests: disabled state prevents interaction, forwards className
- [ ] Run tests — must pass before next task

### Task 2: Compose dropdown panel with SelectDropdown
- [ ] When open, render `SelectDropdown` positioned absolutely below trigger (top-full, z-50, mt-gap-2xs)
- [ ] Map `options` prop to `SelectDropdownItem` children inside `SelectDropdown`
- [ ] Highlight currently selected option via `selected` prop on `SelectDropdownItem`
- [ ] Handle option click: call `onValueChange`, close dropdown, return focus to trigger
- [ ] Set appropriate ARIA attributes: `aria-haspopup="listbox"`, `aria-expanded` on trigger
- [ ] Write unit tests: dropdown renders when open, options are clickable
- [ ] Write unit tests: selecting an option calls onValueChange and closes dropdown
- [ ] Write unit tests: selected option has aria-selected
- [ ] Run tests — must pass before next task

### Task 3: Add Storybook stories
- [ ] Create `src/components/ui/sorting-pill.stories.tsx`
- [ ] Add `Default` story with sample sorting options
- [ ] Add `Filled` story showing a selected value
- [ ] Add `Disabled` story
- [ ] Add `WithLeadingIcon` story
- [ ] Add `Expanded` story (open by default) showing dropdown
- [ ] Add hover/focus/active pseudo-state stories
- [ ] Add `StateGrid` story showing all visual states
- [ ] Run tests — must pass before next task

### Task 4: Verify acceptance criteria
- [ ] All 7 states render correctly (Default, Disabled, Hover, Active, Focused, Expanded, Filled)
- [ ] Chevron flips between down/up on open/close
- [ ] Filled state shows heavier border
- [ ] Dropdown uses existing `SelectDropdown`/`SelectDropdownItem` components
- [ ] Keyboard: Tab to focus, Enter/Space to open, Escape to close
- [ ] Icons use the `Icon` wrapper
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
interface SortingOption {
  value: string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

interface SortingPillProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "children"> {
  placeholder?: string;        // default: "Sort by"
  value?: string;              // currently selected option value
  options: SortingOption[];    // available sorting options
  onValueChange?: (value: string) => void;
  leadingIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  open?: boolean;              // controlled open state
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
```

### CVA Structure
```tsx
const sortingPillVariants = cva(
  [
    "inline-flex items-center",
    "h-9 min-w-16",
    "pl-[var(--number-spacing-padding-pad-m)] pr-[var(--number-spacing-padding-pad-s)] py-[var(--number-spacing-padding-pad-m)]",
    "gap-[var(--number-spacing-gap-gap-xs)]",
    "rounded-[var(--number-radius-rad-button)]",
    "border-2 border-solid",
    "text-semibold-s text-center",
    "transition-colors cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colour-interface-border-primary-focus)]",
    "aria-disabled:opacity-50 aria-disabled:pointer-events-none",
  ],
  {
    variants: {
      visual: {
        default: [
          "bg-[var(--colour-interface-surface-base)]",
          "border-[var(--colour-interface-border-primary-light)]",
          "text-[color:var(--colour-interface-text-supporting)]",
          "hover:bg-[var(--colour-interface-background-secondary-hover)]",
          "active:bg-[var(--colour-interface-background-secondary-active)]",
          "active:text-[color:var(--colour-interface-text-default)]",
        ],
        open: [
          "bg-[var(--colour-interface-surface-base)]",
          "border-[var(--colour-interface-border-primary-light)]",
          "text-[color:var(--colour-interface-text-default)]",
        ],
        filled: [
          "bg-[var(--colour-interface-surface-base)]",
          "border-[var(--colour-interface-border-primary-heavy)]",
          "text-[color:var(--colour-interface-text-default)]",
          "hover:bg-[var(--colour-interface-background-secondary-hover)]",
          "active:bg-[var(--colour-interface-background-secondary-active)]",
        ],
      },
    },
    defaultVariants: { visual: "default" },
  }
);
```

### Open/Close Logic
Follows the same pattern as `Select` component:
- `useRef` for root container and trigger button
- Click outside detection via `mousedown` event listener on document
- Escape key closes dropdown and returns focus to trigger
- Focus-out with `requestAnimationFrame` check
- Close deduplication guard via `closeFiredRef`

### Dropdown Positioning
```tsx
{isOpen && !disabled && (
  <div className="absolute top-full left-0 z-50 mt-[var(--number-spacing-gap-gap-2xs)]">
    <SelectDropdown>
      {options.map((option) => (
        <SelectDropdownItem
          key={option.value}
          selected={option.value === value}
          leadingIcon={option.icon && <Icon icon={option.icon} color="supporting" size="md" />}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </SelectDropdownItem>
      ))}
    </SelectDropdown>
  </div>
)}
```

## Post-Completion
- Visual QA in Storybook against Figma dev mode
- Test keyboard navigation: Tab → focus, Enter/Space → open, arrow keys in dropdown, Escape → close
- Verify dropdown alignment with trigger pill
