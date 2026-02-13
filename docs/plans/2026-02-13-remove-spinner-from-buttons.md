# Remove Spinner from All Button Loading States

## Overview

Currently all three button components (Button, IconButton, TagButton) show a spinning SVG when `isLoading=true`. This plan removes the Spinner entirely so loading buttons just show their normal content with the existing opacity/pointer-events styling already in place.

- **Files involved:**
  - `src/components/ui/button-utils.tsx` (remove Spinner component)
  - `src/components/ui/button.tsx` (show normal content during loading)
  - `src/components/ui/icon-button.tsx` (show normal content during loading)
  - `src/components/ui/tag-button.tsx` (show normal content during loading)
- **Related patterns:** existing disabled/loading opacity and pointer-events styling
- **Dependencies:** none

## Implementation Notes

- Complete each task fully before moving to the next
- No test framework is configured, so verification is via lint, build, and Storybook

---

## Task 1 — Remove Spinner usage from Button

**Files:**
- Modify: `src/components/ui/button.tsx`

- [x] Remove `Spinner` from the import list in button.tsx
- [x] Remove `{isLoading && <Spinner />}` line entirely
- [x] Change `{leadingIcon && !isLoading && ...}` to just `{leadingIcon && ...}` (stop hiding icon during loading)
- [x] Change `{trailingIcon && !isLoading && ...}` to just `{trailingIcon && ...}` (stop hiding icon during loading)
- [x] Verify in Storybook that loading buttons show text and icons normally

## Task 2 — Remove Spinner usage from IconButton

**Files:**
- Modify: `src/components/ui/icon-button.tsx`

- [ ] Remove `Spinner` from the import list in icon-button.tsx
- [ ] Replace the ternary `{isLoading ? <Spinner /> : <span>...</span>}` with just the icon span (always show icon)
- [ ] Verify in Storybook that loading icon buttons show their icon normally

## Task 3 — Remove Spinner usage from TagButton

**Files:**
- Modify: `src/components/ui/tag-button.tsx`

- [ ] Remove `Spinner` from the import list in tag-button.tsx
- [ ] Replace the ternary `{isLoading ? <Spinner /> : <span>...</span>}` with just the icon span (always show icon)
- [ ] Verify in Storybook that loading tag buttons show their icon normally

## Task 4 — Remove Spinner component definition

**Files:**
- Modify: `src/components/ui/button-utils.tsx`

- [ ] Delete the `Spinner` function component from button-utils.tsx
- [ ] Ensure no other files in the codebase import Spinner

## Task 5 — Verification

- [ ] Run `npm run lint` — must pass
- [ ] Run `npm run build` — must pass
- [ ] Visual check in Storybook: Button, IconButton, TagButton loading stories show content without spinners
