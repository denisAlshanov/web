# Toast Component

## Overview
Create a new `Toast` UI component (`src/components/ui/toast.tsx`) — a notification card with 5 semantic types (Neutral, Error, Info, Success, Warning). Features heading + body text, semantic icons, optional close button, optional action button, and a self-managed segmented progress bar that auto-dismisses the toast.

## Context (from discovery)
- **No existing implementation** — brand new component
- **Figma source**: [Toast in Design System](https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2463-3084&m=dev)
- **Custom icons needed**: 5 new solid SVGs in `src/components/ui/icons/` (project already has 6 custom solid icons following this pattern)
- **Existing Button component**: Can compose with `Button` for the optional action button
- **Icon wrapper**: Must use `Icon` component from `@/components/ui/icon`

### Type → Token Mapping

| Type | Background | Heading Color | Icon | Button BG |
|------|-----------|---------------|------|-----------|
| Neutral | `background-primary-default` | `text-heavy` | WarningCircleSolid | `button-bg-primary-default` |
| Error | `background-semantic-error-default` | `text-semantic-error` | XmarkCircleSolid | `button-bg-semantic-error-default` |
| Info | `background-semantic-info-default` | `text-semantic-info` | InfoCircleSolid | `button-bg-semantic-info-default` |
| Success | `background-semantic-success-default` | `text-semantic-success` | CheckCircleSolid | `button-bg-semantic-success-default` |
| Warning | `background-semantic-warning-default` | `text-semantic-warning` | WarningTriangleSolid | `button-bg-semantic-warning-default` |

### Layout Specs
- Width: 532px
- Border radius: `--number-radius-rad-toast` (16px)
- Shadow: `0px 1px 8px rgba(38,44,52,0.12)` (heavier than standard)
- Padding: `pt-pad-s` (8px top), no bottom padding (progress bar flush)
- Content padding: `pl-pad-m pr-pad-xs` (12px left, 4px right)
- Gap between content and progress bar: `gap-l` (18px)
- Heading: `text-heading-s` (18px, 700 weight, 24px line-height)
- Body: `text-medium-m` (16px, 500 weight, 20px line-height), text-default color
- Body text color: always `text-default` regardless of type
- Close button: 40px hit area, Xmark icon
- Progress bar: 10 segments, 8px tall, 8px gap, pill-shaped, track `brandmode-primary-300`, fill `brandmode-primary-800`

### Icons Needed (custom solid SVGs)
1. `WarningCircleSolid` — filled warning circle (Neutral)
2. `XmarkCircleSolid` — filled X circle (Error)
3. `InfoCircleSolid` — filled info circle (Info)
4. `CheckCircleSolid` — filled check circle (Success)
5. `WarningTriangleSolid` — filled warning triangle (Warning)

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- Self-managed timer with configurable duration for auto-dismiss
- Use `Icon` wrapper for all icons
- All colors/spacing/radii from design tokens

## Testing Strategy
- **Unit tests**: required for every task
- Cover all 5 types, closable/not closable, with/without button, progress animation, auto-dismiss

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create 5 custom solid icon SVGs
- [ ] Create `src/components/ui/icons/warning-circle-solid.tsx` — filled warning circle (24x24, `fill="currentColor"`)
- [ ] Create `src/components/ui/icons/xmark-circle-solid.tsx` — filled X circle
- [ ] Create `src/components/ui/icons/info-circle-solid.tsx` — filled info circle
- [ ] Create `src/components/ui/icons/check-circle-solid.tsx` — filled check circle
- [ ] Create `src/components/ui/icons/warning-triangle-solid.tsx` — filled warning triangle
- [ ] Export all 5 from `src/components/ui/icons/index.ts`
- [ ] Write unit tests: each icon renders an SVG with correct viewBox and fill="currentColor"
- [ ] Run tests — must pass before next task

### Task 2: Create Toast component with CVA type variants
- [ ] Create `src/components/ui/toast.tsx`
- [ ] Define `toastVariants` CVA with `type` variant: `neutral`, `error`, `info`, `success`, `warning` — each sets background color
- [ ] Base styles: w-[532px], rounded-rad-toast, shadow, pt-pad-s, flex col, gap-l, overflow-clip
- [ ] Content row: leading icon (24px, type-specific solid icon via Icon wrapper), text container (heading + body), buttons container
- [ ] Heading: text-heading-s, type-specific semantic text color
- [ ] Body: text-medium-m, text-default color (constant across all types)
- [ ] Map each type to its corresponding solid icon component
- [ ] Define `ToastProps`: `type`, `heading`, `body?`, `closable?` (default true), `onClose?`, `className?`
- [ ] Export `Toast`, `toastVariants`
- [ ] Write unit tests: renders heading and body for each type, correct icon per type, correct heading color per type
- [ ] Write unit tests: close button renders when closable=true, hidden when false, fires onClose
- [ ] Run tests — must pass before next task

### Task 3: Add optional action button
- [ ] Add `actionLabel?: string` and `onAction?: () => void` props
- [ ] When `actionLabel` is set, render a Button (sm size) using the type's semantic button variant
- [ ] Map toast type to Button variant: neutral→primary, error→error, info→info, success→success, warning→warning
- [ ] Position button below the close button in the buttons container
- [ ] Write unit tests: action button renders with correct label, fires onAction
- [ ] Write unit tests: action button not rendered when actionLabel is undefined
- [ ] Run tests — must pass before next task

### Task 4: Add segmented progress bar with auto-dismiss timer
- [ ] Create internal `ProgressBar` sub-component: 10 segments in a flex row with gap-2 (8px)
- [ ] Each segment: flex-1, h-2 (8px), rounded-full, track color `brandmode-primary-300`
- [ ] Fill: first N segments fully filled, current segment partially filled (animated width), remaining empty
- [ ] Accept `progress` prop (0-1) to control fill level
- [ ] Add `duration?: number` prop to Toast (default e.g. 5000ms) — total auto-dismiss time
- [ ] Use `useEffect` + `requestAnimationFrame` or `setInterval` to animate progress from 0 to 1 over duration
- [ ] When progress reaches 1, call `onClose`
- [ ] Pause progress on hover (resume on mouse leave)
- [ ] Write unit tests: progress bar renders 10 segments
- [ ] Write unit tests: auto-dismiss calls onClose after duration (use fake timers)
- [ ] Write unit tests: progress pauses on hover
- [ ] Run tests — must pass before next task

### Task 5: Add Storybook stories
- [ ] Create `src/components/ui/toast.stories.tsx`
- [ ] Add `Neutral` story (default)
- [ ] Add `Error`, `Info`, `Success`, `Warning` stories
- [ ] Add `WithActionButton` story
- [ ] Add `NotClosable` story (closable=false)
- [ ] Add `AllTypes` grid story showing all 5 types stacked
- [ ] Add `AutoDismiss` story with short duration to demo progress bar
- [ ] Run tests — must pass before next task

### Task 6: Verify acceptance criteria
- [ ] All 5 types render with correct semantic colors, icons, and heading colors
- [ ] Close button works and fires onClose
- [ ] Action button uses correct semantic Button variant per type
- [ ] Progress bar animates and auto-dismisses
- [ ] Hover pauses progress
- [ ] Icons use the `Icon` wrapper
- [ ] All colors from design tokens
- [ ] Run full test suite (`npm run test`)
- [ ] Run linter (`npm run lint`) — all issues must be fixed
- [ ] Visual comparison with Figma in Storybook

### Task 7: [Final] Update documentation
- [ ] Update this plan to completed status

*Note: ralphex automatically moves completed plans to `docs/plans/completed/`*

## Technical Details

### Component API
```tsx
type ToastType = "neutral" | "error" | "info" | "success" | "warning";

interface ToastProps extends VariantProps<typeof toastVariants> {
  type?: ToastType;
  heading: string;
  body?: string;
  closable?: boolean;          // default: true
  onClose?: () => void;
  actionLabel?: string;        // if set, shows action button
  onAction?: () => void;
  duration?: number;           // auto-dismiss time in ms (default: 5000)
  className?: string;
}
```

### CVA Structure
```tsx
const toastVariants = cva(
  [
    "w-[532px] overflow-clip",
    "flex flex-col",
    "gap-[var(--number-spacing-gap-gap-l)]",
    "pt-[var(--number-spacing-padding-pad-s)]",
    "rounded-[var(--number-radius-rad-toast)]",
    "shadow-[0px_1px_8px_rgba(38,44,52,0.12)]",
  ],
  {
    variants: {
      type: {
        neutral: "bg-[var(--colour-interface-background-primary-default)]",
        error: "bg-[var(--colour-interface-background-semantic-error-default)]",
        info: "bg-[var(--colour-interface-background-semantic-info-default)]",
        success: "bg-[var(--colour-interface-background-semantic-success-default)]",
        warning: "bg-[var(--colour-interface-background-semantic-warning-default)]",
      },
    },
    defaultVariants: { type: "neutral" },
  }
);
```

### Type → Config Map
```tsx
const toastConfig: Record<ToastType, {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  headingColor: string;
  buttonVariant: ButtonVariant;
}> = {
  neutral: {
    icon: WarningCircleSolid,
    headingColor: "text-[color:var(--colour-interface-text-heavy)]",
    buttonVariant: "primary",
  },
  error: {
    icon: XmarkCircleSolid,
    headingColor: "text-[color:var(--colour-interface-text-semantic-error)]",
    buttonVariant: "error",
  },
  // ... info, success, warning
};
```

### Progress Bar Logic
- 10 segments, each represents 10% of duration
- `progress` value 0-1 maps to: `filledSegments = Math.floor(progress * 10)`, `currentSegmentFill = (progress * 10) % 1`
- Timer uses `requestAnimationFrame` for smooth 60fps animation
- `onMouseEnter` pauses by storing elapsed time, `onMouseLeave` resumes from stored position

### Icon Color
All toast icons use `fill="currentColor"`. The icon color inherits from a wrapper that sets the semantic text color for that type. Since the Icon wrapper may not have a direct "semantic" mapping for all toast types, the icon can be wrapped in a `<span>` with the appropriate text color class.

## Post-Completion
- Visual QA in Storybook against Figma dev mode
- Test auto-dismiss timing accuracy
- Test hover-to-pause behavior
- Consider toast container/stack component for managing multiple toasts (future work)
