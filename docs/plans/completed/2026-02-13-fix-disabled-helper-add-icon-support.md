# Fix InputText Disabled Helper & Add Icon Support

Fix InputText helper text visibility in disabled state and add leading/trailing icon support per Figma spec (node 2139-864).

Two issues:
1. **Disabled state**: opacity-50 is currently applied only to the input wrapper div, so helper text below it is NOT dimmed. Figma shows opacity-50 on the entire container including helper text.
2. **Icon support**: Figma spec includes optional leadingIcon and trailingIcon slots inside the input row. Current component has no icon props.

## Context

- **Files involved:**
  - Modify: `src/components/ui/input-text.tsx`
  - Modify: `src/components/ui/input-text.stories.tsx`
- **Related patterns**: Icon wrapper component at `src/components/ui/icon.tsx` (uses iconoir-react), CVA-based variants, `cn()` utility
- **Dependencies**: `iconoir-react` (already installed), Icon component (already exists)

## Strategy

- **Testing approach**: Visual verification via Storybook (no test framework configured)
- Complete each task fully before moving to the next

## Task 1: Fix helper text disabled state

**Files:**
- Modify: `src/components/ui/input-text.tsx`

**Steps:**
- [x] Move `opacity-50` from the input wrapper div to the outer container div when disabled, so helper text also gets dimmed
- [x] Keep `pointer-events-none` on the outer container as well
- [x] Keep the disabled border override (`has-[:not(:placeholder-shown)]:border-default`) on the input wrapper
- [x] Verify the outer container already has `aria-disabled` set (it does)

## Task 2: Add leading and trailing icon support

**Files:**
- Modify: `src/components/ui/input-text.tsx`

**Steps:**
- [x] Add `leadingIcon` and `trailingIcon` props to `InputTextProps` (type: `React.ReactNode`)
- [x] Render `leadingIcon` before the input element and `trailingIcon` after it, inside the input wrapper row
- [x] Icons inherit the container's text color via `currentColor`; in disabled state the `opacity-50` on the container handles dimming
- [x] Icon color in non-disabled states should follow the input text color pattern: supporting color for default/placeholder, darker for hover/active/filled (this is already handled by the `group-hover` and `group-focus-within` patterns on the wrapper)

## Task 3: Update Storybook stories

**Files:**
- Modify: `src/components/ui/input-text.stories.tsx`

**Steps:**
- [x] Add argTypes for `leadingIcon` and `trailingIcon`
- [x] Add `WithLeadingIcon` story using an iconoir-react icon wrapped in the Icon component
- [x] Add `WithTrailingIcon` story
- [x] Add `WithBothIcons` story
- [x] Update StateGrid story to include icon variants for visual comparison
- [x] Add `DisabledWithHelper` story that explicitly shows the fixed disabled + helper text state

## Task 4: Lint and visual verification

**Steps:**
- [x] Run `npm run lint` — must pass
- [x] Verify in Storybook: disabled state dims both input and helper text
- [x] Verify in Storybook: icons render in correct positions with correct sizing
