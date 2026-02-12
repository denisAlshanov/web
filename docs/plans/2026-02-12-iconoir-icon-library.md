# Integrate Iconoir as Main Icon Library

Integrate Iconoir as the main icon library with a reusable Icon wrapper component that uses design tokens for coloring.

## Context

- **Files involved:**
  - `package.json` (add iconoir-react, clsx, tailwind-merge dependencies)
  - `src/components/ui/icon.tsx` (new - Icon wrapper component with CVA variants)
  - `src/lib/utils.ts` (new - cn() helper utility)
- **Related patterns:** CVA for variants, design tokens for colors (`tokens.css` already has icon color tokens), cn() utility for className merging
- **Dependencies:** `iconoir-react`, `clsx`, `tailwind-merge`, `class-variance-authority`

## Implementation Notes

- **Testing approach:** Manual verification via dev server (no test framework configured)
- Storybook is not yet installed, so no stories in this plan
- Iconoir defaults: Optical Size 24px, Stroke Weight 2 (per spec)

## Task 1: Install dependencies and create utility helpers

**Files:**
- Modify: `package.json` (via npm install)
- Create: `src/lib/utils.ts`

- [x] Install dependencies: `npm install iconoir-react clsx tailwind-merge class-variance-authority`
- [x] Create `src/lib/utils.ts` with `cn()` helper (clsx + tailwind-merge)
- [x] Run `npm run lint` - must pass

## Task 2: Create the Icon wrapper component

**Files:**
- Create: `src/components/ui/icon.tsx`

- [ ] Create `src/components/ui/` directory
- [ ] Create `src/components/ui/icon.tsx` with:
  - Accept any Iconoir icon component via an `icon` prop
  - Default size: 24px, default strokeWidth: 2 (matching the spec)
  - CVA color variants mapped to design tokens:
    - `heavy` (default) → `var(--colour-interface-icon-heavy)`
    - `default` → `var(--colour-interface-icon-default)`
    - `supporting` → `var(--colour-interface-icon-supporting)`
    - `onHeavy` → `var(--colour-interface-icon-onHeavy)`
    - `error` → `var(--colour-interface-icon-semantic-error)`
    - `info` → `var(--colour-interface-icon-semantic-info)`
    - `success` → `var(--colour-interface-icon-semantic-success)`
    - `warning` → `var(--colour-interface-icon-semantic-warning)`
    - `danger` → `var(--colour-interface-icon-semantic-danger)`
  - CVA size variants: `sm` (16), `md` (24 - default), `lg` (32)
  - Forward className and other HTML/SVG attributes
  - Use `cn()` for class merging
- [ ] Verify the dev server starts without errors: `npm run dev`
- [ ] Verify an icon renders correctly by temporarily adding one to the home page, then removing it

## Validation

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Icon renders at correct size (24px) and stroke weight (2)

## Completion

- [ ] Update `CLAUDE.md` if internal patterns changed (add note about icon usage convention)
- [ ] Move this plan to `docs/plans/completed/`
