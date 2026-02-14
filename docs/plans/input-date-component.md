# InputDate Component

## Overview
Create a new `InputDate` UI component (`src/components/ui/input-date.tsx`) — a text input styled for date entry with a trailing calendar icon addon block. Pure visual input only (no date picker popover). Supports optional leading and trailing icons in the main input area. Has 7 visual states: Default, Hover, Focus, Active, Filled, Error, Disabled. Includes optional helper/error text.

## Context (from discovery)
- **No existing implementation** — brand new component
- **Figma source**: [InputDate in Design System](https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2106-2966&m=dev)
- **Location**: `src/components/ui/` (form primitive)
- **Existing InputText**: `src/components/ui/input-text.tsx` — handles icon-based inputs; this component adds a trailing addon block (different layout)
- **InputAddons plan exists**: `docs/plans/input-addons-component.md` — similar trailing addon pattern but with text; this component is standalone
- **Calendar icon**: `Calendar` from `iconoir-react` via `Icon` wrapper (outline style, verify against Figma during implementation)
- **Patterns to follow**: InputText's `has-[:focus...]` state selectors, helper/error text, disabled handling, focus ring via box-shadow

### State → Token Mapping

| State | Outer Border | Addon Border | Text Color | Extra |
|-------|-------------|-------------|------------|-------|
| Default | `form-border-default` | `form-border-default` | `text-placeholder` | — |
| Hover | `form-border-hover` | `form-border-hover` | `text-default` | — |
| Focus | `form-border-default` + 3px ring `form-border-focus` | `form-border-default` | `text-default` | box-shadow ring |
| Active | `form-border-active` | `form-border-active` | `text-heavy` | cursor in input |
| Filled | `form-border-default` | `form-border-default` | `text-heavy` | value present |
| Error | `form-border-error` | `form-border-error` | `text-default` | error helper text |
| Disabled | `form-border-default` | `form-border-default` | `text-placeholder` | opacity-50 |

### Layout Specs
- Input container height: 48px (`h-12`)
- Border: 2px solid, `rad-input` radius (12px)
- Gap between elements: `gap-s` (6px)
- Padding: `pl-pad-m pr-0` (left padding on container, no right padding — addon is flush right)
- Background: `surface-base` (white)
- Calendar addon: `surface-secondary` bg (#F5F5F5), right-rounded, `border-r-2`, `h-[44px]`, `pl-pad-s pr-pad-m`, contains 24px calendar icon
- Calendar addon border color tracks input state
- Optional leading icon: 24px, inside main input area
- Optional trailing icon: 24px, inside main input area (before the calendar addon)
- Input text: `text-medium-m`, placeholder `text-placeholder`, filled `text-heavy`
- Placeholder: "01.01.2026" (date format)
- Helper text: `text-medium-s`, `text-supporting` (or `text-semantic-error` for error)
- Focus ring: `box-shadow: 0 0 0 3px var(--form-border-focus)` (same as InputText)

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- Follow existing InputText patterns for state management (`has-[:focus...]` selectors)
- Use `Icon` wrapper for all icons — never use raw iconoir components
- All colors/spacing/radii from design tokens

## Testing Strategy
- **Unit tests**: required for every task
- Cover all 7 states, with/without leading icon, with/without trailing icon, error/helper text, disabled, className forwarding

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create InputDate with base layout, state-aware borders, and calendar addon
- [ ] Create `src/components/ui/input-date.tsx`
- [ ] Define `InputDateProps` extending `React.InputHTMLAttributes<HTMLInputElement>`: `error?` (string | boolean), `helperText?` (string), `leadingIcon?` (ReactNode), `trailingIcon?` (ReactNode), `className?`, `ref?`
- [ ] Render outer wrapper: `flex flex-col gap-[gap-2xs] items-start` with disabled `opacity-50 pointer-events-none`
- [ ] Render input container: `group flex items-stretch h-12 border-2 rounded-[rad-input] bg-[surface-base] pl-[pad-m] pr-0 gap-[gap-s]` with state-aware border classes using `has-[:focus...]` pattern from InputText
- [ ] Add error border overrides (must override hover/focus/active states, matching InputText pattern)
- [ ] Render optional leading icon slot: `shrink-0 flex items-center` with `aria-hidden`
- [ ] Render `<input>` element: `flex-1 min-w-0 bg-transparent border-none outline-none text-medium-m` with placeholder/filled text colors (same as InputText)
- [ ] Render optional trailing icon slot (before calendar addon): `shrink-0 flex items-center` with `aria-hidden`
- [ ] Render calendar addon block: `flex items-center shrink-0 bg-[surface-secondary] rounded-r-[rad-input] border-r-2 h-[44px] pl-[pad-s] pr-[pad-m]` — addon border color tracks container state via `group-hover:` / `group-has-[:focus...]:` selectors
- [ ] Render `Calendar` icon from iconoir-react via `Icon` wrapper (size `md`, color `default`) inside addon
- [ ] Forward all standard input HTML attributes and ref to the `<input>` element
- [ ] Export `InputDate`
- [ ] Write unit tests: renders input element with default placeholder, forwards ref, forwards standard HTML attributes
- [ ] Write unit tests: calendar addon always renders with calendar icon
- [ ] Write unit tests: leading icon renders when provided, hidden when not
- [ ] Write unit tests: trailing icon renders when provided, hidden when not
- [ ] Write unit tests: disabled state applies opacity and prevents interaction
- [ ] Write unit tests: forwards className to root wrapper
- [ ] Run tests — must pass before next task

### Task 2: Add helper text and error state
- [ ] Add helper text below input container: `text-medium-s text-[text-supporting] pl-[pad-xs]`
- [ ] Error message overrides helper text: `text-[text-semantic-error]` with `aria-live="polite"`
- [ ] Set `aria-invalid` on input when error is truthy and not disabled
- [ ] Set `aria-describedby` linking input to helper/error text element
- [ ] Generate stable IDs with `React.useId()` (same pattern as InputText)
- [ ] Write unit tests: helper text renders below input
- [ ] Write unit tests: error message replaces helper text with error styling
- [ ] Write unit tests: aria-invalid set on input when error
- [ ] Write unit tests: aria-describedby links input to description
- [ ] Run tests — must pass before next task

### Task 3: Add Storybook stories
- [ ] Create `src/components/ui/input-date.stories.tsx`
- [ ] Add `Default` story with date placeholder
- [ ] Add `WithLeadingIcon` story
- [ ] Add `WithTrailingIcon` story
- [ ] Add `WithBothIcons` story (leading + trailing)
- [ ] Add `Filled` story with pre-filled date value
- [ ] Add `WithError` story showing error message
- [ ] Add `WithHelperText` story showing helper text
- [ ] Add `Disabled` story
- [ ] Add `StateGrid` story showing all 7 states
- [ ] Run tests — must pass before next task

### Task 4: Verify acceptance criteria
- [ ] All 7 states render correctly (Default, Hover, Focus, Active, Filled, Error, Disabled)
- [ ] Calendar icon addon always visible with secondary background
- [ ] Addon border color tracks input state
- [ ] Focus ring appears as 3px outer ring (box-shadow)
- [ ] Error state overrides all borders to error color
- [ ] Helper/error text renders with correct styling and ARIA attributes
- [ ] Leading/trailing icon slots work independently
- [ ] Calendar icon uses `Icon` wrapper, not raw iconoir
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
interface InputDateProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}
```

### State Management
Follows the same `has-[:focus...]` CSS selector pattern as `InputText`:

```tsx
// Input container border states
cn(
  "group flex items-stretch h-12",
  "pl-[var(--number-spacing-padding-pad-m)] pr-0",
  "gap-[var(--number-spacing-gap-gap-s)]",
  "border-2 border-solid rounded-[var(--number-radius-rad-input)]",
  "bg-[var(--colour-interface-surface-base)]",
  // Default
  "border-[var(--colour-interface-form-border-default)]",
  // Hover
  "hover:border-[var(--colour-interface-form-border-hover)]",
  // Active (mouse focus)
  "has-[:focus:not(:focus-visible)]:border-[var(--colour-interface-form-border-active)]",
  // Filled
  "has-[:not(:placeholder-shown)]:border-[var(--colour-interface-form-border-active)]",
  // Focus (keyboard) — 3px outer ring via box-shadow
  "has-[:focus-visible]:shadow-[0_0_0_3px_var(--colour-interface-form-border-focus)]",
  "has-[:focus-visible]:border-[var(--colour-interface-form-border-default)]",
  // Transition
  "transition-[border-color,box-shadow]",
)
```

### Calendar Addon Layout
```tsx
{/* Calendar icon addon — always rendered */}
<div className={cn(
  "flex items-center shrink-0",
  "bg-[var(--colour-interface-surface-secondary)]",
  "rounded-r-[var(--number-radius-rad-input)]",
  "border-r-2 border-solid",
  "h-[44px]",
  "pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)]",
  // Border color tracks container state via group selectors
  "border-[var(--colour-interface-form-border-default)]",
  "group-hover:border-[var(--colour-interface-form-border-hover)]",
  // ... same pattern for active/focus/error
)}>
  <Icon icon={Calendar} color="default" size="md" />
</div>
```

### Input Element
```tsx
<input
  ref={ref}
  id={id}
  disabled={disabled}
  aria-invalid={(!!error && !disabled) || undefined}
  aria-describedby={mergedDescribedBy}
  className={cn(
    "flex-1 min-w-0 bg-transparent border-none outline-none",
    "text-medium-m",
    "placeholder:text-[color:var(--colour-interface-text-placeholder)]",
    "group-hover:placeholder:text-[color:var(--colour-interface-text-default)]",
    "group-focus-within:placeholder:text-[color:var(--colour-interface-text-default)]",
    "text-[color:var(--colour-interface-text-heavy)]",
  )}
  placeholder={placeholder}
  {...props}
/>
```

### Helper / Error Text
Same pattern as InputText:
```tsx
{displayHelperText && (
  <p
    id={descriptionId}
    aria-live={error && !disabled ? "polite" : undefined}
    className={cn(
      "text-medium-s pl-[var(--number-spacing-padding-pad-xs)]",
      error && !disabled
        ? "text-[color:var(--colour-interface-text-semantic-error)]"
        : "text-[color:var(--colour-interface-text-supporting)]",
    )}
  >
    {displayHelperText}
  </p>
)}
```

## Post-Completion
- Visual QA in Storybook against Figma dev mode
- Verify calendar icon matches Figma (outline `Calendar` from iconoir vs custom `CalendarSolid`)
- Test with different date formats in placeholder
- Future: compose with date picker popover component
