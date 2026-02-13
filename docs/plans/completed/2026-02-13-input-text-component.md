# Plan: InputText Component

Implement InputText component from Figma design system (node 2139-864) - a text input with 7 visual states (Default, Hover, Focus, Active, Filled, Error, Disabled), optional leading/trailing icons, and optional helper text.

## Context

- Figma node: 2139-864 in Syncro MediaPlans Design System
- Component: InputText with states Default, Hover, Focus, Active, Filled, Error, Disabled
- Follows existing project patterns: CVA variants, design tokens, cn() helper, Icon wrapper

## Scope

- Files involved:
  - Create: `src/components/ui/input-text.tsx`
  - Create: `src/components/ui/input-text.stories.tsx`
- Related patterns: `src/components/ui/button.tsx` (CVA + cn pattern), `src/components/ui/icon.tsx` (Icon wrapper)
- Dependencies: `class-variance-authority`, `clsx`, `tailwind-merge` (already installed)

## Implementation Notes

- **Testing approach**: No test framework configured; validation via Storybook and linter
- Use native `<input>` element (no Radix needed for basic text input)
- All states except Error/Disabled are CSS-driven (hover:, focus-visible:, focus:not(:focus-visible):, placeholder-shown)
- Error is prop-driven; Disabled is native HTML attribute
- Focus state: 3px outer ring using box-shadow (matching Figma's double-border approach - inner 2px default border + outer 3px focus border)
- Typography: text-medium-m for input text (16px/20px/500), text-medium-s for helper text (14px/18px/500)

### Design Tokens (from tokens.css)

**Form borders:**
- `--colour-interface-form-border-default`: #BFC3C8 (Default, Disabled states)
- `--colour-interface-form-border-hover`: #A1A5AA (Hover state)
- `--colour-interface-form-border-focus`: #3AB6E5 (Focus ring - 3px outer border)
- `--colour-interface-form-border-active`: #787B80 (Active, Filled states)
- `--colour-interface-form-border-error`: #E31E1A (Error state)

**Text colors:**
- `--colour-interface-text-placeholder`: #787B80 (placeholder)
- `--colour-interface-text-default`: #44484C (hover/focus placeholder text)
- `--colour-interface-text-heavy`: #23262A (active/filled input text)
- `--colour-interface-text-supporting`: #64676C (helper text)
- `--colour-interface-text-semantic-error`: #C90000 (error helper text)

**Surface:**
- `--colour-interface-surface-base`: white (input background)

**Spacing & Radius:**
- `--number-radius-rad-input`: 12px
- `--number-spacing-padding-pad-m`: 12px (vertical padding, left padding)
- `--number-spacing-padding-pad-l`: 18px (right padding)
- `--number-spacing-padding-pad-xs`: 4px (helper text left padding)
- `--number-spacing-gap-gap-s`: 6px (icon-to-input gap)
- `--number-spacing-gap-gap-2xs`: 2px (input-to-helper gap)
- min-height: 44px

## Tasks

### Task 1: Create InputText component

**Files:**
- Create: `src/components/ui/input-text.tsx`

- [x] Create InputText component with forwardRef-free pattern (React 19 style, ref as prop)
- [x] Props: className, error (string | boolean), disabled, leadingIcon (ReactNode), trailingIcon (ReactNode), helperText (string), plus all native input HTML attributes via InputHTMLAttributes
- [x] Outer wrapper: flex col, gap 2px (gap-2xs), items-start
- [x] Input row: flex row, items-center, gap 6px (gap-s), white background, 2px solid border, 12px radius (rad-input), min-h 44px, pl 12px (pad-m), pr 18px (pad-l), py 12px (pad-m)
- [x] State: Default - border var(--colour-interface-form-border-default), placeholder text color var(--colour-interface-text-placeholder)
- [x] State: Hover - border var(--colour-interface-form-border-hover) via hover: pseudo on the wrapper div
- [x] State: Focus (keyboard) - 3px outer ring var(--colour-interface-form-border-focus) via focus-visible using box-shadow, inner border stays default
- [x] State: Active (mouse focus) - border var(--colour-interface-form-border-active) via focus-within:not(:has(:focus-visible)) or similar CSS approach
- [x] State: Filled - text color var(--colour-interface-text-heavy), handled naturally by the input element having a value
- [x] State: Error - border var(--colour-interface-form-border-error), helper text turns var(--colour-interface-text-semantic-error)
- [x] State: Disabled - opacity 50%, border-dashed, pointer-events-none via disabled attribute + aria-disabled
- [x] Optional leading icon slot (24px, left of input) wrapped in aria-hidden span
- [x] Optional trailing icon slot (24px, right of input) wrapped in aria-hidden span
- [x] Inner input element: flex-1, transparent background, no border/outline, text-medium-m, inherits text color
- [x] Optional helper text below input row: text-medium-s, pl 4px (pad-xs), color var(--colour-interface-text-supporting), or var(--colour-interface-text-semantic-error) when error

### Task 2: Create Storybook stories

**Files:**
- Create: `src/components/ui/input-text.stories.tsx`

- [x] Create stories file with meta for UI/InputText, following button.stories.tsx pattern
- [x] Default story
- [x] WithHelperText story
- [x] WithError story (error string displayed as helper text)
- [x] Disabled story
- [x] WithLeadingIcon story (using Icon component with iconoir icon)
- [x] WithTrailingIcon story
- [x] WithBothIcons story
- [x] Filled story (with defaultValue set)
- [x] StateGrid story showing all visual variants side by side for comparison with Figma

### Task 3: Lint and verify

- [x] Run `npm run lint` and fix any issues
- [x] Verify in Storybook that all states match Figma design

## Verification

- [x] Manual test: all 7 states visible and matching Figma screenshot in Storybook
- [x] Run linter: `npm run lint`
- [x] Verify component accepts all standard input HTML attributes (type, name, value, onChange, etc.)

## Cleanup

- [x] Move this plan to `docs/plans/completed/`
