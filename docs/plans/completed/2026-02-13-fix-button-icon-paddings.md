# Fix Button Icon Container Padding

Fix the icon container sizing in the Button component to match Figma specs. In Figma, leading/trailing icon containers are 12px wide (not 24px), with the 24px icon overflowing into the button padding. Currently our code uses `size-6` (24x24) containers, making buttons with icons wider than designed.

The fix: change icon wrapper from `size-6` (24x24) to `w-3 h-6` (12x24) with `overflow-visible` and proper alignment (leading icon aligned right, trailing icon aligned left).

## Context

- **Files involved:**
  - Modify: `src/components/ui/button.tsx` (icon wrapper spans on lines 161, 165)
  - Modify: `src/components/ui/button.stories.tsx` (add stories for visual verification)
- **Related patterns:** Figma Icon Container pattern (`w-[12px] h-[24px]` with overflow)
- **Dependencies:** none

## Implementation Notes

- No test framework configured; visual verification via Storybook
- Lint must pass after changes

## Tasks

### Task 1: Fix icon container sizing in Button component

**Files:**
- Modify: `src/components/ui/button.tsx`

- [x] Change the leading icon span (line 161) from `size-6` to `w-3 h-6 overflow-visible` with the icon positioned to overflow right (into padding area)
- [x] Change the trailing icon span (line 165) from `size-6` to `w-3 h-6 overflow-visible` with the icon positioned to overflow left (into padding area)
- [x] The inner icon (passed as ReactNode) needs a wrapper that is 24x24 absolutely positioned: leading icon uses `right-0` (overflows left into padding), trailing icon uses `left-0` (overflows right into padding)
- [x] Run linter: `npm run lint`

### Task 2: Update Storybook stories for visual verification

**Files:**
- Modify: `src/components/ui/button.stories.tsx`

- [x] Add a story "IconSizeGrid" that renders all 3 sizes (sm, md, lg) with leading icon, trailing icon, and both icons side-by-side for easy visual comparison with Figma
- [x] Run linter: `npm run lint`

## Verification

- [x] Run linter: `npm run lint`
- [x] Manual test: Open Storybook, compare buttons with icons against Figma specs for all 3 sizes
- [x] Verify icon overflow doesn't get clipped by parent containers
