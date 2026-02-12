# Button Component

Create a Button component following the Figma design system with 8 variants, 3 sizes, icon support, loading state, and Storybook stories.

## Context

- Figma source: https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/?node-id=2019-133
- 8 style variants: primary, secondary, tertiary, destructive, error, info, success, warning
- 3 sizes: sm (48px), md (52px), lg (60px)
- States: default, hover, active, focused (4px focus ring), disabled (opacity-50), loading (opacity-80)
- Each button supports optional leading/trailing icons (24x24, via the Icon component)
- All colors from design tokens in tokens.css
- Typography: lg=text-semibold-l, md=text-semibold-m, sm=text-semibold-s

## Files involved

- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/button.stories.tsx`
- Modify: `package.json` (add @radix-ui/react-slot)

## Related patterns

- Follow CVA pattern from `docs/component-creation-guide.md`
- Use `cn()` from `src/lib/utils.ts`
- Use `Icon` wrapper from `src/components/ui/icon.tsx` for icon integration
- Design tokens from `src/styles/tokens.css`

## Dependencies

- `@radix-ui/react-slot` (for asChild pattern) - needs to be installed

## Approach

- Code first, then Storybook stories
- No test framework configured, so Storybook stories serve as visual tests
- Lint check after implementation

## Tasks

### Task 1: Install @radix-ui/react-slot dependency

**Files:**
- Modify: `package.json`

- [x] Run `npm install @radix-ui/react-slot`

### Task 2: Create the Button component

**Files:**
- Create: `src/components/ui/button.tsx`

- [x] Define CVA variants with all 8 style variants (primary, secondary, tertiary, destructive, error, info, success, warning)
- [x] Define 3 size variants (sm, md, lg) with exact Figma padding/height/typography
- [x] Implement states: hover, active (CSS pseudo-classes), focus-visible (4px ring with --colour-interface-button-border-focus-default), disabled (opacity-50, pointer-events-none), loading (opacity-80, pointer-events-none)
- [x] Support `asChild` via @radix-ui/react-slot
- [x] Support optional `leadingIcon` and `trailingIcon` props (React.ReactNode)
- [x] Support `isLoading` prop with spinner indicator
- [x] Export both `Button` component and `buttonVariants`

### Task 3: Set up Storybook and create Button stories

**Files:**
- Create: `.storybook/main.ts`
- Create: `.storybook/preview.ts`
- Create: `src/components/ui/button.stories.tsx`

- [x] Install Storybook dev dependencies (`npx storybook@latest init --skip-install`, then install)
- [x] Create story file with stories for: Default, all 8 variants, all 3 sizes, Disabled, Loading, WithLeadingIcon, WithTrailingIcon, WithBothIcons, StateGrid (all variants in a grid)
- [x] Verify Storybook runs with `npm run storybook`

### Task 4: Verify build and lint

- [x] Run `npm run lint` - must pass
- [x] Run `npm run build` - must pass

## Acceptance criteria

- [ ] Button renders with all 8 Figma variants
- [ ] All 3 sizes match Figma specifications
- [ ] Focus ring matches Figma (4px border, --colour-interface-button-border-focus-default)
- [ ] Loading and disabled states work correctly
- [ ] Leading/trailing icon slots work
- [ ] asChild pattern works (for wrapping Next.js Link)
- [ ] Storybook stories cover all variants and states
- [ ] Lint and build pass

## Cleanup

- [ ] Move this plan to `docs/plans/completed/`
