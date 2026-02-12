# Typography System Implementation

## Overview

Implement the complete typography system from the Figma design system. This involves:
1. Switching the project font from Geist Sans to Plus Jakarta Sans
2. Adding typography CSS custom properties (font-size, line-height, font-weight, letter-spacing) to the design token pipeline
3. Creating Tailwind CSS v4 utility classes for all 14 text styles
4. Updating existing components and layouts to use the new font

## Typography Styles from Figma

| Style | Weight | Size/Line-Height | Extra |
|---|---|---|---|
| Heading/xl | Bold 700 | 52px/64px | |
| Heading/l | Bold 700 | 36px/48px | |
| Heading/m | Bold 700 | 24px/32px | |
| Heading/s | Bold 700 | 18px/24px | |
| Heading/xs | Bold 700 | 16px/20px | |
| Heading/Eyebrow | SemiBold 600 | 14px/20px | uppercase |
| Text/SemiBold/l | 600 | 18px/24px | |
| Text/SemiBold/m | 600 | 16px/20px | |
| Text/SemiBold/s | 600 | 14px/16px | |
| Text/SemiBold/xs | 600 | 12px/16px | |
| Text/Medium/l | 500 | 18px/24px | |
| Text/Medium/m | 500 | 16px/20px | |
| Text/Medium/s | 500 | 14px/18px | |
| Text/Medium/xs | 500 | 12px/16px | |

## Context

- **Files involved:**
  - Modify: `src/app/layout.tsx` (swap Geist for Plus Jakarta Sans)
  - Modify: `src/app/globals.css` (add typography utility classes via @theme and @utility, update body font)
  - Modify: `src/styles/tokens.css` (will be auto-regenerated)
  - Modify: `scripts/transform-tokens.ts` (add typography token processing)
  - Create: `tokens/typography.tokens.json` (typography tokens in DTCG format)
- **Related patterns:** existing design token pipeline (DTCG JSON -> CSS custom properties), Tailwind v4 @theme inline block in globals.css
- **Dependencies:** Plus Jakarta Sans (available via `next/font/google`, no new npm packages needed)

## Implementation Strategy

- Complete each task fully before moving to the next
- Verify each step by running `npm run dev` or `npm run tokens:build` as appropriate
- No test framework is configured, so verification is manual (browser devtools)

## Tasks

### Task 1: Switch font from Geist to Plus Jakarta Sans

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [x] In `src/app/layout.tsx`: replace `Geist` and `Geist_Mono` imports with `Plus_Jakarta_Sans` from `next/font/google`
- [x] Configure Plus Jakarta Sans with weights `[500, 600, 700]`, subsets `['latin']`, and CSS variable `--font-plus-jakarta`
- [x] Update body `className` to use the new font variable
- [x] In `src/app/globals.css`: update `--font-sans` to reference `--font-plus-jakarta`, update body `font-family`
- [x] Run `npm run dev` to verify font loads correctly in the browser

### Task 2: Add typography tokens to the design token pipeline

**Files:**
- Create: `tokens/typography.tokens.json`
- Modify: `scripts/transform-tokens.ts`

- [x] Create `tokens/typography.tokens.json` with all 14 text styles in DTCG format, storing font-size, line-height, font-weight, letter-spacing, and text-transform per style
- [x] Modify `scripts/transform-tokens.ts` to read `typography.tokens.json` and emit CSS custom properties for each style (e.g. `--typography-heading-xl-font-size: 52px`, `--typography-heading-xl-line-height: 64px`, etc.)
- [x] Run `npm run tokens:build` to regenerate `src/styles/tokens.css` with typography variables included
- [x] Verify the generated CSS contains all expected typography custom properties

### Task 3: Create Tailwind typography utility classes

**Files:**
- Modify: `src/app/globals.css`

- [x] Add `@utility` rules in `src/app/globals.css` for each text style that compose the typography CSS custom properties (e.g. `.text-heading-xl` applies font-size, line-height, font-weight, letter-spacing from the corresponding tokens)
- [x] Include the eyebrow's `text-transform: uppercase` in its utility class
- [x] Run `npm run dev` and verify utility classes work by inspecting elements in browser devtools
- [x] Run `npm run build` to confirm no build errors

## Verification

- [ ] Manual test: open the app in browser, inspect body font is Plus Jakarta Sans
- [ ] Manual test: apply each typography utility class to a test element and verify styles match the Figma spec
- [ ] Run `npm run build` — must succeed with no errors
- [ ] Run `npm run lint` — must pass

## Post-Implementation

- [ ] Update `CLAUDE.md` if font variable name or typography patterns need documenting
- [ ] Move this plan to `docs/plans/completed/`
