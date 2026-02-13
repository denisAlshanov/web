# Fix TagButton Icon Size to 16px

Fix TagButton icon size to 16px to match Figma design spec (node 2484-3568). Currently the icon SVG fills the full 24px container via `[&>svg]:size-full`; it should be 16px (centered within the 24px button).

## Context

- Files involved:
  - `src/components/ui/tag-button.tsx` (icon wrapper SVG sizing)
  - `src/components/ui/tag-button.stories.tsx` (update Icon size prop to `sm` for consistency)
- Related patterns: Icon component has `size="sm"` (16px), `size="md"` (24px default)
- Dependencies: none

## Strategy

- No test framework configured; verification via lint and build
- Single straightforward CSS class change plus stories alignment

## Task 1: Fix icon SVG size in TagButton

**Files:**
- Modify: `src/components/ui/tag-button.tsx`

- [x] On line 123, change the icon wrapper span from `[&>svg]:size-full` (which makes SVG 24px) to `[&>svg]:size-4` (which makes SVG 16px)
- [x] The span container stays at `size-6` (24px) so the 16px icon is centered within it

## Task 2: Update stories to pass size="sm" to Icon

**Files:**
- Modify: `src/components/ui/tag-button.stories.tsx`

- [x] Update all `<Icon>` usages to include `size="sm"` so the Icon component itself renders at 16px
- [x] This ensures the Icon's own width/height attributes match the CSS constraint

## Task 3: Verify

- [x] Run lint: `npm run lint`
- [x] Run build: `npm run build`

## Cleanup

- [x] Move this plan to `docs/plans/completed/`
