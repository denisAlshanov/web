# InputTime Component

## Overview
Create a new `InputTime` UI component (`src/components/ui/input-time.tsx`) — a time input with a trailing clock icon addon block and a dropdown panel for selecting time slots. Supports optional leading and trailing icons in the main input area. Has 7 visual states: Default, Hover, Focus, Active (with dropdown open), Filled, Error, Disabled. Includes optional helper/error text. Composes with existing `SelectDropdown` and `SelectDropdownItem` for the dropdown panel.

## Context (from discovery)
- **No existing implementation** — brand new component
- **Figma source**: [InputTime in Design System](https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2107-5612&m=dev)
- **Location**: `src/components/ui/` (form primitive)
- **Reuses**: `SelectDropdown` for dropdown panel, `SelectDropdownItem` for time option rows
- **Patterns from**: `Select` component (open/close/escape/click-outside logic), `InputText` (state selectors, helper/error text)
- **Clock icon**: `Clock` from `iconoir-react` via `Icon` wrapper (outline style, verify against Figma)
- **InputDate plan**: `docs/plans/input-date-component.md` — very similar structure (standalone, no shared base)

### State → Token Mapping

| State | Outer Border | Addon Border | Text Color | Extra |
|-------|-------------|-------------|------------|-------|
| Default | `form-border-default` | `form-border-default` | `text-placeholder` | — |
| Hover | `form-border-hover` | `form-border-hover` | `text-default` | — |
| Focus | `form-border-default` + 3px ring `form-border-focus` | `form-border-default` | `text-default` | box-shadow ring |
| Active | `form-border-active` | `form-border-active` | `text-heavy` | dropdown open |
| Filled | `form-border-default` | `form-border-default` | `text-heavy` | value present |
| Error | `form-border-error` | `form-border-error` | `text-default` | error helper text |
| Disabled | `form-border-default` | `form-border-default` | `text-placeholder` | opacity-50 |

### Layout Specs
- Input container height: 48px (`h-12`)
- Border: 2px solid, `rad-input` radius (12px)
- Gap between elements: `gap-s` (6px)
- Padding: `pl-pad-m pr-0` (left padding on container, addon flush right)
- Background: `surface-base` (white)
- Clock addon: `surface-secondary` bg, right-rounded, `border-r-2`, `h-[44px]`, `pl-pad-s pr-pad-m`, contains 24px clock icon
- Placeholder: "0:00 AM" (12-hour format)
- Dropdown: positioned absolutely below input (`top-[52px]`), uses `SelectDropdown`, shadow `0px_1px_8px_rgba(38,44,52,0.04)`, `rad-input` radius
- Time options: 30-minute intervals (e.g., 8:00 AM, 8:30 AM, 9:00 AM, ...)

### Dropdown Specs
- Uses existing `SelectDropdown` component (positioned below trigger)
- Each option uses `SelectDropdownItem` (44px height, `text-medium-m`, `text-supporting` color)
- Dropdown appears in Active state, dismisses on selection/escape/click-outside
- Max height with scrolling (inherits from `SelectDropdown`)

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- Follow existing `Select` patterns for open/close/escape/click-outside logic
- Follow existing `InputText` patterns for state management (`has-[:focus...]` selectors)
- Use `Icon` wrapper for all icons — never use raw iconoir components
- All colors/spacing/radii from design tokens

## Testing Strategy
- **Unit tests**: required for every task
- Cover all 7 states, dropdown open/close, time selection, keyboard interactions, with/without icons, error/helper text, disabled

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create InputTime with base layout, state-aware borders, and clock addon
- [ ] Create `src/components/ui/input-time.tsx`
- [ ] Define `TimeOption` type: `{ value: string; label: string }`
- [ ] Define `InputTimeProps`: `value?` (string), `options` (TimeOption[]), `onValueChange?` (callback), `placeholder?` (default "0:00 AM"), `error?` (string | boolean), `helperText?` (string), `leadingIcon?` (ReactNode), `trailingIcon?` (ReactNode), `disabled?`, `open?`, `onOpenChange?`, `className?`
- [ ] Render outer wrapper: `relative flex flex-col gap-[gap-2xs] items-start` with disabled `opacity-50 pointer-events-none`
- [ ] Render input container as `<button>` trigger: `group flex items-stretch h-12 border-2 rounded-[rad-input] bg-[surface-base] pl-[pad-m] pr-0 gap-[gap-s]` with state-aware border classes
- [ ] Implement controlled/uncontrolled open state pattern (same as `Select`)
- [ ] Display selected time label when value is set, placeholder otherwise
- [ ] Text styling: placeholder `text-placeholder`, filled `text-heavy`, hover/open `text-default`
- [ ] Render optional leading icon slot with `aria-hidden`
- [ ] Render optional trailing icon slot (before clock addon) with `aria-hidden`
- [ ] Render clock addon block: `flex items-center shrink-0 bg-[surface-secondary] rounded-r-[rad-input] border-r-2 h-[44px] pl-[pad-s] pr-[pad-m]` — addon border color tracks trigger state via `group-*:` selectors
- [ ] Render `Clock` icon from iconoir-react via `Icon` wrapper (size `md`, color `default`) inside addon
- [ ] Add error border overrides (must override hover/focus states)
- [ ] Add focus ring: `focus-visible:shadow-[0_0_0_3px_var(--form-border-focus)]`
- [ ] Export `InputTime`
- [ ] Write unit tests: renders with placeholder text, renders selected value when provided
- [ ] Write unit tests: clock addon always renders with clock icon
- [ ] Write unit tests: leading/trailing icon slots render when provided
- [ ] Write unit tests: disabled state applies opacity and prevents interaction
- [ ] Write unit tests: forwards className to root wrapper
- [ ] Run tests — must pass before next task

### Task 2: Add dropdown with time options using SelectDropdown
- [ ] When open, render `SelectDropdown` positioned absolutely below trigger (`top-full mt-1 left-0 right-0 z-50`)
- [ ] Map `options` prop to `SelectDropdownItem` children inside `SelectDropdown`
- [ ] Highlight currently selected option via `selected` prop on `SelectDropdownItem`
- [ ] Handle option click: call `onValueChange`, close dropdown, return focus to trigger
- [ ] Add open/close behavior: click trigger toggles, click outside closes, Escape closes + returns focus (reuse pattern from `Select`)
- [ ] Set ARIA attributes: `aria-haspopup="listbox"`, `aria-expanded` on trigger, `role="listbox"` on dropdown, `role="option"` on items
- [ ] Write unit tests: click trigger opens dropdown, click again closes
- [ ] Write unit tests: options render inside dropdown when open
- [ ] Write unit tests: selecting option calls onValueChange, closes dropdown
- [ ] Write unit tests: Escape closes dropdown, click outside closes dropdown
- [ ] Write unit tests: selected option has aria-selected
- [ ] Run tests — must pass before next task

### Task 3: Add helper text and error state
- [ ] Add helper text below input container: `text-medium-s text-[text-supporting] pl-[pad-xs]`
- [ ] Error message overrides helper text: `text-[text-semantic-error]` with `aria-live="polite"`
- [ ] Set `aria-invalid` on trigger when error is truthy and not disabled
- [ ] Generate stable IDs with `React.useId()` for `aria-describedby` linking
- [ ] Write unit tests: helper text renders below input
- [ ] Write unit tests: error message replaces helper text with error styling
- [ ] Write unit tests: aria-invalid set when error
- [ ] Run tests — must pass before next task

### Task 4: Add Storybook stories
- [ ] Create `src/components/ui/input-time.stories.tsx`
- [ ] Add `Default` story with 30-minute interval time options
- [ ] Add `WithLeadingIcon` story
- [ ] Add `Filled` story with pre-selected time
- [ ] Add `Expanded` story (open by default) showing dropdown
- [ ] Add `WithError` story showing error message
- [ ] Add `WithHelperText` story showing helper text
- [ ] Add `Disabled` story
- [ ] Add `StateGrid` story showing all 7 states
- [ ] Run tests — must pass before next task

### Task 5: Verify acceptance criteria
- [ ] All 7 states render correctly (Default, Hover, Focus, Active, Filled, Error, Disabled)
- [ ] Clock icon addon always visible with secondary background
- [ ] Addon border color tracks trigger state
- [ ] Dropdown opens on click, closes on selection/escape/click-outside
- [ ] Focus ring appears as 3px outer ring (box-shadow)
- [ ] Error state overrides all borders to error color
- [ ] Helper/error text renders with correct styling and ARIA attributes
- [ ] Dropdown uses existing `SelectDropdown`/`SelectDropdownItem` components
- [ ] Clock icon uses `Icon` wrapper, not raw iconoir
- [ ] All colors from design tokens
- [ ] Run full test suite (`npm run test`)
- [ ] Run linter (`npm run lint`) — all issues must be fixed
- [ ] Visual comparison with Figma in Storybook

### Task 6: [Final] Update documentation
- [ ] Update this plan to completed status

*Note: ralphex automatically moves completed plans to `docs/plans/completed/`*

## Technical Details

### Component API
```tsx
interface TimeOption {
  value: string;   // e.g., "08:00", "08:30"
  label: string;   // e.g., "8:00 AM", "8:30 AM"
}

interface InputTimeProps {
  value?: string;                      // selected time option value
  options: TimeOption[];               // available time slots
  onValueChange?: (value: string) => void;
  placeholder?: string;               // default: "0:00 AM"
  error?: string | boolean;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  open?: boolean;                      // controlled open state
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
```

### Trigger Layout
```tsx
// Trigger button with state-aware borders
<button
  type="button"
  role="combobox"
  aria-haspopup="listbox"
  aria-expanded={isOpen}
  aria-disabled={disabled || undefined}
  disabled={disabled}
  className={cn(
    "group flex items-stretch h-12 w-full",
    "pl-[var(--number-spacing-padding-pad-m)] pr-0",
    "gap-[var(--number-spacing-gap-gap-s)]",
    "border-2 border-solid rounded-[var(--number-radius-rad-input)]",
    "bg-[var(--colour-interface-surface-base)]",
    "cursor-pointer",
    // Default border
    "border-[var(--colour-interface-form-border-default)]",
    // Hover
    "hover:border-[var(--colour-interface-form-border-hover)]",
    // Focus (keyboard)
    "focus-visible:shadow-[0_0_0_3px_var(--colour-interface-form-border-focus)]",
    "focus-visible:border-[var(--colour-interface-form-border-default)]",
    "focus-visible:outline-none",
    // Transition
    "transition-[border-color,box-shadow]",
    // Open state
    isOpen && "border-[var(--colour-interface-form-border-active)]",
    // Filled state (when not open)
    !isOpen && value && "border-[var(--colour-interface-form-border-default)]",
    // Error overrides
    error && !disabled && "border-[var(--colour-interface-form-border-error)]",
    error && !disabled && "hover:border-[var(--colour-interface-form-border-error)]",
  )}
  onClick={handleToggle}
>
  {/* ... icons, text, clock addon */}
</button>
```

### Clock Addon
```tsx
{/* Clock icon addon — always rendered */}
<div className={cn(
  "flex items-center shrink-0",
  "bg-[var(--colour-interface-surface-secondary)]",
  "rounded-r-[var(--number-radius-rad-input)]",
  "border-r-2 border-solid",
  "h-[44px]",
  "pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)]",
  // Border color tracks trigger state via group selectors
  "border-[var(--colour-interface-form-border-default)]",
  "group-hover:border-[var(--colour-interface-form-border-hover)]",
  isOpen && "border-[var(--colour-interface-form-border-active)]",
  error && !disabled && "border-[var(--colour-interface-form-border-error)]",
)}>
  <Icon icon={Clock} color="default" size="md" />
</div>
```

### Dropdown Positioning
```tsx
{isOpen && !disabled && (
  <div className="absolute top-full left-0 right-0 z-50 mt-1">
    <SelectDropdown>
      {options.map((option) => (
        <SelectDropdownItem
          key={option.value}
          selected={option.value === value}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </SelectDropdownItem>
      ))}
    </SelectDropdown>
  </div>
)}
```

### Open/Close Logic
Follows the same pattern as `Select` component:
- `useRef` for root container and trigger button
- Click outside detection via `mousedown` event listener on document
- Escape key closes dropdown and returns focus to trigger
- Close deduplication guard via `closeFiredRef`

## Post-Completion
- Visual QA in Storybook against Figma dev mode
- Verify clock icon matches Figma (outline `Clock` from iconoir)
- Test keyboard navigation: Tab to focus, Enter/Space to open, Escape to close
- Test dropdown scroll behavior with many time options
- Future: consider sharing base layout with InputDate if patterns solidify
