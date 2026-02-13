# Login Page Implementation

Redesign the Login Page to match the Figma design. The page features:
- MediaPlans "MP" monogram logo (top-left, 200x200 area)
- "Sign In to MediaPlans." heading (text-heading-l)
- Subtitle text (text-medium-l)
- "Continue with Google" button (tertiary variant, lg size, with Google icon)
- White background with rounded corners
- Error state handling preserved from current implementation

## Context

- Files involved:
  - Modify: `src/app/login/page.tsx` (main login page)
  - Create: `src/components/ui/mediaplans-logo.tsx` (SVG logo component)
  - Create: `src/components/ui/google-icon.tsx` (Google "G" icon component)
- Related patterns: Button component (tertiary variant), typography utilities, design tokens
- Dependencies: None new — uses existing Button component and design tokens
- Figma: https://www.figma.com/design/D8ZhjgOIoPF5hKMGIMaQkR/MediaPlans---Main?node-id=409-16354&m=dev

## Implementation Strategy

- Follow existing component patterns (named exports, design tokens, cn utility)
- Use the existing Button component with tertiary variant and lg size for the Google sign-in button
- Extract the Google SVG logo and MediaPlans logo into reusable components
- Keep the existing auth logic (signIn, signOut, error handling, callbackUrl validation)

## Tasks

### Task 1: Create MediaPlans logo SVG component

**Files:**
- Create: `src/components/ui/mediaplans-logo.tsx`

Steps:
- [x] Download the MediaPlans "MP" monogram SVG from Figma asset URL
- [x] Create a simple MediaPlansLogo component that renders the SVG inline
- [x] Accept width/height props with default 200x200
- [x] Use design token color for the logo (`--colour/interface/text/heavy`)

### Task 2: Create Google icon component

**Files:**
- Create: `src/components/ui/google-icon.tsx`

Steps:
- [x] Extract the inline Google "G" SVG from the current login page into its own component
- [x] Accept a size prop (default 24)
- [x] Keep the official Google brand colors (these are brand-mandated, not design tokens)

### Task 3: Redesign the login page to match Figma

**Files:**
- Modify: `src/app/login/page.tsx`

Steps:
- [x] Replace the current placeholder layout with the Figma design layout
- [x] Add MediaPlans logo in the top-left corner (32px from top and left)
- [x] Center the content block vertically with heading, subtitle, and button
- [x] Use `text-heading-l` for "Sign In to MediaPlans." heading
- [x] Use `text-medium-l` for the subtitle text
- [x] Use the existing Button component (`variant="tertiary"`, `size="lg"`) with Google icon as `leadingIcon`
- [x] Apply white background using design token (`--colour/interface/surface/page`)
- [x] Style the error state using design tokens instead of hardcoded red colors
- [x] Preserve the existing auth logic: signIn, signOut, callbackUrl handling, Suspense boundary
- [x] Ensure the page is responsive (content remains centered on all screen sizes)

### Task 4: Lint check

Steps:
- [x] Run `npm run lint` and fix any issues

## Verification

- [x] Visual comparison: login page matches Figma design
- [x] Run `npm run lint` — must pass
- [x] Test Google sign-in flow works end-to-end
- [x] Verify error state displays correctly
- [x] Check responsiveness on different viewport sizes

## Cleanup

- [x] Move this plan to `docs/plans/completed/`
