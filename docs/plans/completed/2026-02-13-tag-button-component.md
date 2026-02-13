# TagButton Component

Implement TagButton component - a small (24px) circular icon button with default and destructive variants, following existing IconButton patterns.

The TagButton is a minimal inline action button (24x24px) used for actions like tag removal or inline editing. It has two variants (default, destructive) with 5 interactive states each (default, hover, active, focused, disabled).

## Context

- Files involved:
  - Create: `src/components/ui/tag-button.tsx`
  - Create: `src/components/ui/tag-button.stories.tsx`
- Related patterns: `src/components/ui/icon-button.tsx` (same CVA + cn + Slot pattern)
- Dependencies: `class-variance-authority`, `@radix-ui/react-slot` (already installed)

## Implementation Notes

- Follow the existing three-step CVA pattern (variants definition, props interface, component export)
- All colors from design tokens in `src/styles/tokens.css`
- Use the `Icon` wrapper component for icon rendering
- `asChild` support via Radix Slot for composition flexibility
- Reuse `button-utils.tsx` for disabled+asChild handling and Spinner

## Tasks

### Task 1: Create TagButton component

**Files:**
- Create: `src/components/ui/tag-button.tsx`

- [x] Define `tagButtonVariants` with CVA:
  - Base: `inline-flex items-center justify-center shrink-0 rounded-full size-6 transition-colors cursor-pointer`
  - Focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colour-interface-button-border-focus-default)]`
  - Disabled: `aria-disabled:opacity-50 aria-disabled:pointer-events-none`
  - Variant "default":
    - `bg-transparent`
    - `text-[color:var(--colour-interface-button-icon-secondary)]`
    - `hover:bg-[var(--colour-interface-button-background-secondary-hover)]`
    - `active:bg-[var(--colour-interface-button-background-secondary-active)]`
  - Variant "destructive":
    - `bg-transparent`
    - `text-[color:var(--colour-interface-icon-semantic-danger)]`
    - `hover:bg-[var(--colour-interface-button-background-semantic-danger-hover)]`
    - `active:bg-[var(--colour-interface-button-background-semantic-danger-active)]`
    - `focus-visible:ring-[var(--colour-interface-button-border-focus-destructive)]`
- [x] Define `TagButtonProps` interface (icon, aria-label required, variant, asChild, isLoading, disabled)
- [x] Implement component following IconButton pattern (asChild handling, disabled event stripping, loading state)
- [x] Icon rendered at 24px (full size of container) using a span wrapper with `size-6`

### Task 2: Create Storybook stories

**Files:**
- Create: `src/components/ui/tag-button.stories.tsx`

- [x] Create stories for both default and destructive variants
- [x] Add stories for all interactive states (hover, active, focused, disabled) using pseudo-states addon
- [x] Add story showing usage with different Iconoir icons
- [x] Add story demonstrating the asChild pattern (e.g., wrapping a link)

### Task 3: Verify

- [x] Run `npm run lint` and fix any issues
- [x] Visually verify in Storybook that all states match the Figma design

## Post-Implementation

- [x] Move this plan to `docs/plans/completed/`
