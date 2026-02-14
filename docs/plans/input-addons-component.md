# InputAddons Component

## Overview
Create a new `InputAddons` UI component (`src/components/ui/input-addons.tsx`) — a text input with optional leading and/or trailing text addon blocks. Addons are static text regions (e.g., "https//:" prefix, ".io" suffix) rendered flush inside the input border with a secondary background. Supports 7 visual states: Default, Hover, Focus, Active, Filled, Error, Disabled. Includes optional helper/error text below the input.

## Context (from discovery)
- **No existing implementation** — brand new component
- **Figma source**: [InputAddons in Design System](https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2106-1960&m=dev)
- **Location**: `src/components/ui/` (form primitive)
- **Existing InputText**: `src/components/ui/input-text.tsx` — handles icon-based inputs; this component is separate (text addons, not icons)
- **Patterns to follow**: InputText's `has-[:focus...]` state selectors, helper/error text, disabled handling, focus ring via box-shadow

### State → Token Mapping

| State | Outer Border | Addon Separator Border | Text Color | Extra |
|-------|-------------|----------------------|------------|-------|
| Default | `form-border-default` | `form-border-default` | `text-placeholder` | — |
| Hover | `form-border-hover` | `form-border-hover` | `text-default` | — |
| Focus | `form-border-default` + 3px ring `form-border-focus` | `form-border-default` | `text-default` | box-shadow ring |
| Active | `form-border-active` | `form-border-active` | `text-heavy` | cursor in input |
| Filled | `form-border-active` | `form-border-default` | `text-heavy` | value present |
| Error | `form-border-error` | `form-border-error` | `text-default` | error helper text |
| Disabled | `form-border-default` | `form-border-default` | `text-placeholder` | opacity-50 |

### Layout Specs
- Input container height: 48px (`h-12`)
- Border: 2px solid, `rad-input` radius (12px)
- Gap between elements: `gap-s` (6px)
- Background: `surface-base` (white)
- Addon background: `surface-secondary` (#F5F5F5)
- Addon text: `text-medium-m` (16px, 500 weight), `text-heavy` color
- Addon padding: `pl-pad-m pr-pad-s` (lead), `pl-pad-s pr-pad-m` (trail)
- Addon has inner border on the side adjacent to the outer container border (left for lead, right for trail), which creates a visual continuation of the outer border
- Addon corners match the outer border radius on their respective side
- Input text: `text-medium-m`, placeholder `text-placeholder`, filled `text-heavy`
- Helper text: `text-medium-s`, `text-supporting` (or `text-semantic-error` for error)
- Focus ring: `box-shadow: 0 0 0 3px var(--form-border-focus)` (same as InputText)

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- Follow existing InputText patterns for state management (`has-[:focus...]` selectors)
- All colors/spacing/radii from design tokens

## Testing Strategy
- **Unit tests**: required for every task
- Cover all 7 states, lead-only, trail-only, both addons, no addons, error/helper text, disabled, className forwarding

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create InputAddons with base layout and state-aware borders
- [ ] Create `src/components/ui/input-addons.tsx`
- [ ] Define `InputAddonsProps` extending `React.InputHTMLAttributes<HTMLInputElement>`: `leadAddon?` (string), `trailAddon?` (string), `error?` (string | boolean), `helperText?` (string), `className?`, `ref?`
- [ ] Render outer wrapper: `flex flex-col gap-[gap-2xs] items-start` (same as InputText)
- [ ] Render input container: `flex items-stretch h-12 border-2 rounded-[rad-input] bg-[surface-base]` with state-aware border classes using `has-[:focus...]` pattern from InputText
- [ ] Add error border overrides (must override hover/focus/active states, matching InputText pattern)
- [ ] Add disabled state: `opacity-50 pointer-events-none` on outer wrapper
- [ ] Render `<input>` element: `flex-1 min-w-0 bg-transparent border-none outline-none text-medium-m` with placeholder/filled text colors
- [ ] Forward all standard input HTML attributes and ref to the `<input>` element
- [ ] Export `InputAddons`
- [ ] Write unit tests: renders input element, forwards ref, forwards standard HTML attributes (name, value, onChange)
- [ ] Write unit tests: disabled state applies opacity and prevents interaction
- [ ] Write unit tests: forwards className to root wrapper
- [ ] Run tests — must pass before next task

### Task 2: Add lead and trail addon blocks
- [ ] When `leadAddon` is set, render lead addon block: `flex items-center bg-[surface-secondary] rounded-l-[rad-input] border-l-2 pl-[pad-m] pr-[pad-s]` with text in `text-medium-m text-heavy`
- [ ] When `trailAddon` is set, render trail addon block: `flex items-center bg-[surface-secondary] rounded-r-[rad-input] border-r-2 pl-[pad-s] pr-[pad-m]` with text in `text-medium-m text-heavy text-right`
- [ ] Addon border color tracks the outer container state — apply same `has-[:focus...]` border-color selectors to addon borders (via group selector on the input container)
- [ ] When no addons, input gets its own horizontal padding (`px-[pad-m]`)
- [ ] When lead addon present, adjust input left padding (reduced, gap provides spacing)
- [ ] When trail addon present, adjust input right padding similarly
- [ ] Write unit tests: lead addon renders with correct text
- [ ] Write unit tests: trail addon renders with correct text
- [ ] Write unit tests: both addons render together
- [ ] Write unit tests: neither addon renders when props not provided (input still works)
- [ ] Run tests — must pass before next task

### Task 3: Add helper text and error state
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

### Task 4: Add Storybook stories
- [ ] Create `src/components/ui/input-addons.stories.tsx`
- [ ] Add `Default` story with both addons (lead="https//:", trail=".io")
- [ ] Add `LeadAddonOnly` story (just prefix)
- [ ] Add `TrailAddonOnly` story (just suffix)
- [ ] Add `NoAddons` story (plain input, edge case)
- [ ] Add `Filled` story with pre-filled value
- [ ] Add `WithError` story showing error message
- [ ] Add `WithHelperText` story showing helper text
- [ ] Add `Disabled` story
- [ ] Add `StateGrid` story showing all 7 states
- [ ] Run tests — must pass before next task

### Task 5: Verify acceptance criteria
- [ ] All 7 states render correctly (Default, Hover, Focus, Active, Filled, Error, Disabled)
- [ ] Lead and trail addons independently optional
- [ ] Addon separator border color tracks input state
- [ ] Focus ring appears as 3px outer ring (box-shadow)
- [ ] Error state overrides all borders to error color
- [ ] Helper/error text renders with correct styling and ARIA attributes
- [ ] Addon text uses `text-heavy` color, not placeholder color
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
interface InputAddonsProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leadAddon?: string;
  trailAddon?: string;
  error?: string | boolean;
  helperText?: string;
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

### Addon Layout
```tsx
{/* Lead Addon */}
{leadAddon && (
  <div className={cn(
    "flex items-center shrink-0",
    "bg-[var(--colour-interface-surface-secondary)]",
    "rounded-l-[var(--number-radius-rad-input)]",
    "border-l-2 border-solid",
    "pl-[var(--number-spacing-padding-pad-m)] pr-[var(--number-spacing-padding-pad-s)]",
    "text-medium-m text-[color:var(--colour-interface-text-heavy)]",
    // Border color tracks container state via group selectors
    "border-[var(--colour-interface-form-border-default)]",
    "group-hover:border-[var(--colour-interface-form-border-hover)]",
    // ... same pattern for active/focus/error
  )}>
    {leadAddon}
  </div>
)}

{/* Input */}
<input
  className={cn(
    "flex-1 min-w-0 bg-transparent border-none outline-none",
    "text-medium-m",
    "placeholder:text-[color:var(--colour-interface-text-placeholder)]",
    "group-hover:placeholder:text-[color:var(--colour-interface-text-default)]",
    "focus:placeholder:text-[color:var(--colour-interface-text-default)]",
    "text-[color:var(--colour-interface-text-heavy)]",
    !leadAddon && "pl-[var(--number-spacing-padding-pad-m)]",
    !trailAddon && "pr-[var(--number-spacing-padding-pad-m)]",
  )}
  placeholder={placeholder}
  {...props}
/>

{/* Trail Addon */}
{trailAddon && (
  <div className={cn(
    "flex items-center shrink-0",
    "bg-[var(--colour-interface-surface-secondary)]",
    "rounded-r-[var(--number-radius-rad-input)]",
    "border-r-2 border-solid",
    "pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)]",
    "text-medium-m text-[color:var(--colour-interface-text-heavy)]",
    // Border color tracks container state
  )}>
    {trailAddon}
  </div>
)}
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
- Test addon text truncation with very long addon strings
- Verify focus ring appearance matches InputText's ring
- Test keyboard navigation: Tab to focus, type to fill
