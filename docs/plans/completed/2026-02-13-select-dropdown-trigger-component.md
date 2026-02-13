# Select Component (Dropdown Trigger)

Implement a Select component (dropdown trigger) matching the Figma Dropdown design (node 2101:765). This is the trigger/input portion that composes with the existing SelectDropdown and SelectDropdownItem primitives. It manages open/close state, displays placeholder or selected value, optional leading icon, helper text, error state, disabled state, and all visual states (default, hover, focus, active, filled, error, disabled) using CSS pseudo-classes and design tokens.

## Context

- Files involved:
  - Create: `src/components/ui/select.tsx` (main Select component)
  - Create: `src/components/ui/select.stories.tsx` (Storybook stories)
  - Reference: `src/components/ui/input-text.tsx` (pattern for form field states, helper text, error handling)
  - Reference: `src/components/ui/select-dropdown.tsx` (dropdown panel primitive)
  - Reference: `src/components/ui/select-dropdown-item.tsx` (dropdown item primitive)
  - Reference: `src/components/ui/icon.tsx` (Icon wrapper)
- Related patterns: InputText's approach to border states via CSS pseudo-classes (hover, focus-visible, active), error/disabled handling, helper text with aria-describedby
- Dependencies: `iconoir-react` (NavArrowDown, NavArrowUp icons), existing ui primitives

## Implementation Strategy

- Follow InputText patterns for border state management, helper text, and error display
- Use a button as the trigger element (accessible select pattern)
- Manage open/close state internally, expose via controlled props (open/onOpenChange)
- Position the SelectDropdown panel absolutely below the trigger
- Use Iconoir NavArrowDown/NavArrowUp for the chevron indicator
- All colors, spacing, radii via design tokens - no hardcoded values
- No test framework is configured, so no automated tests (per CLAUDE.md)

## Tasks

### Task 1: Create Select component

**Files:**
- Create: `src/components/ui/select.tsx`

- [x] Create the Select component with these props:
  - `placeholder` (string) - placeholder text when no value selected
  - `value` (string) - currently selected display text
  - `leadingIcon` (ReactNode) - optional leading icon
  - `helperText` (string) - optional helper text below the trigger
  - `error` (string | boolean) - error state, string shows as error helper text
  - `disabled` (boolean) - disabled state
  - `open` (boolean) - controlled open state (optional)
  - `onOpenChange` ((open: boolean) => void) - controlled open callback
  - `children` (ReactNode) - SelectDropdown content rendered in the panel
  - `className` (string) - override for root element
- [x] Implement visual states matching Figma spec:
  - Default: border-default, placeholder text color
  - Hover: border-hover, text darkens (CSS hover:)
  - Focus: 3px outer ring (box-shadow) with focus color, inner border stays default (CSS focus-visible)
  - Active (open): border-active, heavy text color, NavArrowUp icon
  - Filled (value present, closed): border-active, heavy text color, NavArrowDown icon
  - Error: border-error (overrides all other border states), red helper text
  - Disabled: 50% opacity, pointer-events-none, default border
- [x] Render the dropdown panel (children wrapped in a positioned container) when open
  - Position absolutely below the trigger with the shadow from Figma spec
- [x] Handle click-outside to close, Escape key to close
- [x] Wire up aria attributes: aria-expanded, aria-haspopup="listbox", aria-describedby for helper text, aria-disabled

### Task 2: Create Storybook stories

**Files:**
- Create: `src/components/ui/select.stories.tsx`

- [x] Create stories matching the Figma documentation page states:
  - Default (placeholder only)
  - WithHelperText
  - WithLeadingIcon
  - Filled (with a value set)
  - Error (with error message)
  - Disabled
  - Open (showing dropdown panel with SelectDropdownItem children)
  - StateGrid (all states side-by-side for Figma comparison)

## Verification

- [x] Manual test: open Storybook, verify each state matches the Figma screenshot
- [x] Run linter: `npm run lint`
- [x] Verify component uses only design tokens (no hardcoded colors/spacing)

## Docs

- [x] Move this plan to `docs/plans/completed/` when done
