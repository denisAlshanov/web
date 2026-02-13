# Select Dropdown Primitives

Implement SelectDropdownItem and SelectDropdown visual primitives
from Figma (node 2101:745). These are building-block components
only (no trigger/popover behavior). The dropdown panel has an
optional search input and a scrollable list of items. Each item
supports 5 visual states: Default, Hover, Focus, Active, Disabled,
with an optional leading icon.

## Context

- **Files involved:**
  - Create: `src/components/ui/select-dropdown-item.tsx`
  - Create: `src/components/ui/select-dropdown-item.stories.tsx`
  - Create: `src/components/ui/select-dropdown.tsx`
  - Create: `src/components/ui/select-dropdown.stories.tsx`
- **Related patterns:** InputText component (form tokens, state styling), Button component (CVA variants, Icon wrapper usage)
- **Dependencies:** class-variance-authority, iconoir-react (already installed)

## Implementation Notes

- Use CVA for SelectDropdownItem state variant (default, hover, focus, active, disabled) — state prop controls visual appearance only, hover/focus CSS pseudo-classes also apply for interactive use
- SelectDropdown is a container with optional search input slot and children for items
- All colors/spacing/radii use design tokens from `tokens.css`
- Icons use the existing `Icon` wrapper component (`src/components/ui/icon.tsx`)
- No Radix UI primitives needed (visual building blocks only)
- Follow project conventions: `"use client"`, ref forwarding, `cn()` utility, aria attributes
- No test framework configured — skip test steps, rely on Storybook stories and lint

## Task 1 — SelectDropdownItem component

**Files:**
- Create: `src/components/ui/select-dropdown-item.tsx`

**Steps:**
- [ ] Create SelectDropdownItem with CVA variants for state (default, hover, focus, active, disabled)
- [ ] Props: state variant, optional leadingIcon (React.ReactNode), children for label text, disabled, className, ref, standard div HTML attributes
- [ ] Default state: white bg, supporting text color, optional icon
- [ ] Hover state: bg form/surface/hover (#F7FBFF), also apply via CSS hover pseudo-class
- [ ] Focus state: 2px border form/border/focus (#3AB6E5), also apply via CSS focus-visible pseudo-class
- [ ] Active state: bg form/surface/active (#F2F6FC), text color changes to default (#44484C)
- [ ] Disabled state: opacity-50, pointer-events-none
- [ ] Item height: 44px, horizontal padding: pad-m (12px), gap between icon and text: gap-xs (4px)
- [ ] Typography: text-medium-m (16px/20px medium weight)
- [ ] Run lint: `npm run lint`

## Task 2 — SelectDropdownItem Storybook stories

**Files:**
- Create: `src/components/ui/select-dropdown-item.stories.tsx`

**Steps:**
- [ ] Create stories: Default, Hover, Focus, Active, Disabled
- [ ] Create story with leading icon (using iconoir-react Plus icon via Icon wrapper)
- [ ] Create StateGrid story showing all 5 states side by side
- [ ] Run Storybook build check

## Task 3 — SelectDropdown container component

**Files:**
- Create: `src/components/ui/select-dropdown.tsx`

**Steps:**
- [ ] Create SelectDropdown container component
- [ ] Props: showSearch (boolean, default false), searchPlaceholder (string), onSearchChange callback, children (for dropdown items), className, ref
- [ ] Container styling: white bg, rounded-[rad-input] (12px), box-shadow (0px 1px 8px rgba(38,44,52,0.04)), overflow-clip, no padding, flex column, gap-0
- [ ] When showSearch is true, render the existing InputText component at the top (or a search-specific input with search icon)
- [ ] Children slot for SelectDropdownItem list
- [ ] Run lint: `npm run lint`

## Task 4 — SelectDropdown Storybook stories

**Files:**
- Create: `src/components/ui/select-dropdown.stories.tsx`

**Steps:**
- [ ] Create Default story with multiple items
- [ ] Create WithSearch story showing the search input
- [ ] Create WithIcons story showing items with leading icons
- [ ] Create MixedStates story showing items in various states (one active, one disabled, rest default)
- [ ] Run lint: `npm run lint`

## Verification

- [ ] Run `npm run lint` — must pass
- [ ] Visual review in Storybook: items match Figma states
- [ ] Verify all design tokens are used (no hardcoded colors/spacing)

## Cleanup

- [ ] Move this plan to `docs/plans/completed/`
