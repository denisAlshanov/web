# Icon Button Component

## Overview

Implement the IconButton component from Figma (node 2023-13910). This is a circular/pill icon-only button with 5 style variants (primary, secondary, tertiary, ghost, destructive), 4 sizes (lg/md/sm/xs), and full state support (hover, active, focus, disabled, loading). Follows the same CVA + design-token pattern as the existing Button component.

## Context

- Files involved:
  - Create: `src/components/ui/icon-button.tsx`
  - Create: `src/components/ui/icon-button.stories.tsx`
  - Modify: `src/components/ui/button.tsx` (extract shared helpers)
- Related patterns: `src/components/ui/button.tsx` (CVA pattern, asChild, disabled handling), `src/components/ui/icon.tsx` (Icon wrapper)
- Dependencies: None new (uses existing `@radix-ui/react-slot`, `class-variance-authority`, `iconoir-react`)

## Approach

- Testing approach: Storybook visual testing (no test framework configured)
- Follow existing Button component patterns exactly (CVA, asChild, disabled handling, focus ring)
- All colors/spacing/radii from design tokens
- Complete each task fully before moving to the next

## Task 1 - Create the IconButton component

**Files:**
- Create: `src/components/ui/icon-button.tsx`

- [x] Define `iconButtonVariants` using CVA with these variants:
  - **variant**: primary, secondary, tertiary, ghost, destructive
    - primary: `bg-[var(--colour-interface-button-background-primary-default)]`, hover/active states
    - secondary: white bg + 2.5px border `var(--colour-interface-button-border-secondary-default)`, hover/active bg+border
    - tertiary: `bg-[var(--colour-interface-button-background-tertiary-default)]` + 2.5px border, hover/active
    - ghost: no bg default, hover uses secondary-hover bg, active uses secondary-active bg
    - destructive: `bg-[var(--colour-interface-button-background-destructive-default)]`, hover/active states
  - **size**: lg (60px), md (52px), sm (48px), xs (40px) - fixed square dimensions via `size-[Npx]`
  - Focus ring: 4px ring with `var(--colour-interface-button-border-focus-default)` (same as Button)
  - Disabled: opacity-50 via `aria-disabled:opacity-50 aria-disabled:pointer-events-none`
- [x] Define `IconButtonProps` extending `React.ButtonHTMLAttributes<HTMLButtonElement>` + `VariantProps`:
  - `icon` prop: ReactNode for the icon content
  - `asChild` prop for composition
  - `isLoading` prop
- [x] Implement the IconButton function component:
  - Reuse the same asChild/Slot pattern from Button
  - Reuse the same disabled handling logic from Button (stripChildEventHandlers, preventActivation, preventKeyboardActivation) - import from shared util
  - Loading state shows Spinner (same as Button) with opacity-80 and active-state bg
  - Icon centered in the button, always 24px
  - Export as named exports: `IconButton`, `iconButtonVariants`

## Task 2 - Create Storybook stories

**Files:**
- Create: `src/components/ui/icon-button.stories.tsx`

- [x] Create story file following the same pattern as `button.stories.tsx`:
  - Meta with all argTypes (variant, size, isLoading, disabled)
  - Default story
  - Stories for each variant (Primary, Secondary, Tertiary, Ghost, Destructive)
  - Stories for each size (XS, SM, MD, LG)
  - Disabled and Loading state stories
  - StateGrid story showing all variants x sizes in a matrix
- [x] Verify stories render correctly in Storybook

## Task 3 - Refactor shared disabled-handling logic

**Files:**
- Modify: `src/components/ui/button.tsx` (extract shared helpers)
- Modify: `src/components/ui/icon-button.tsx` (import shared helpers)

- [x] Extract `stripChildEventHandlers`, `preventActivation`, `preventKeyboardActivation`, and `Spinner` into a shared location (either a local `button-utils.ts` or co-located in the same file if importing between button files is preferred)
- [x] Update Button imports to use the shared source
- [x] Verify Button still works correctly after refactor

## Verification

- [x] Run `npm run lint` - must pass
- [x] Run Storybook and visually verify all variants/sizes/states match the Figma spec
- [x] Verify Button component still works after refactor

## Cleanup

- [x] Move this plan to `docs/plans/completed/`
