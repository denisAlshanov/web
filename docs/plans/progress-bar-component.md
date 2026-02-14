# ProgressBar Component

## Overview
Create a new `ProgressBar` UI component (`src/components/ui/progress-bar.tsx`) — a segmented progress indicator with 10 pill-shaped segments. Accepts a `progress` value (0–1) that fills segments left-to-right: fully filled segments, one partially filled segment, and remaining empty segments. Used standalone or composed into other components (e.g., Toast auto-dismiss timer).

## Context (from discovery)
- **No existing implementation** — brand new component
- **Figma source**: [Progress Bar in Design System](https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2240-3467&m=dev)
- **Location**: `src/components/ui/` (generic UI primitive)
- **Consumer**: Toast component (planned in `toast-component.md`, Task 4)
- **No external dependencies** — pure CSS + React

### Figma Specs

| Property | Value |
|----------|-------|
| Segment count | 10 |
| Segment height | 8px (`h-2`) |
| Segment shape | Pill (rounded-full / 999px) |
| Gap between segments | 8px (`gap-2`) |
| Track color | `--colour-brandMode-primary-300` (#E2E6EB) |
| Fill color | `--colour-brandMode-primary-800` (#44484C) |
| Layout | Flex row, each segment `flex-1` |
| Fill rounding | Right side only (`rounded-r-full`) on partial fill |
| Total width | Fluid (fills container) |

### Fill Logic
- `progress` value 0–1 maps to segment fill:
  - `filledSegments = Math.floor(progress * 10)` — fully filled
  - `currentSegmentFill = (progress * 10) % 1` — partial fill width as percentage
  - Remaining segments: empty (track color only)
- At `progress = 0`: all segments empty
- At `progress = 1`: all segments fully filled

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- All colors from design tokens
- No animation logic in this component — animation is the consumer's responsibility (e.g., Toast manages its own timer)

## Testing Strategy
- **Unit tests**: required for every task
- Cover progress=0, progress=0.5, progress=1, edge cases (negative, >1)
- Cover segment count, fill behavior, className forwarding

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create ProgressBar component with segmented fill
- [ ] Create `src/components/ui/progress-bar.tsx`
- [ ] Define `ProgressBarProps`: `progress` (number, 0–1), `segments?` (number, default 10), `className?`
- [ ] Render flex row container with `gap-2` (8px) and full width
- [ ] Render `segments` count of pill-shaped divs: `flex-1 h-2 rounded-full overflow-hidden`
- [ ] Track color: `bg-[var(--colour-brandMode-primary-300)]` on each segment
- [ ] Fill logic: for each segment index `i`:
  - If `i < filledSegments`: fully filled (inner div with fill color at `w-full`)
  - If `i === filledSegments` and `currentSegmentFill > 0`: partially filled (inner div with fill color at `width: ${currentSegmentFill * 100}%`)
  - If `i > filledSegments`: empty (no inner div, track only)
- [ ] Fill inner div: `h-full rounded-r-full bg-[var(--colour-brandMode-primary-800)]`
- [ ] Clamp `progress` to 0–1 range internally (`Math.max(0, Math.min(1, progress))`)
- [ ] Forward `className` to root container via `cn()`
- [ ] Export `ProgressBar`
- [ ] Write unit tests: renders correct number of segments (default 10)
- [ ] Write unit tests: progress=0 renders all segments empty (no fill divs)
- [ ] Write unit tests: progress=1 renders all segments fully filled
- [ ] Write unit tests: progress=0.35 renders 3 fully filled + 1 partially filled (50%) + 6 empty
- [ ] Write unit tests: clamps negative and >1 values
- [ ] Write unit tests: custom segment count works
- [ ] Write unit tests: forwards className to root
- [ ] Run tests — must pass before next task

### Task 2: Add Storybook stories
- [ ] Create `src/components/ui/progress-bar.stories.tsx`
- [ ] Add `Empty` story (progress=0)
- [ ] Add `Partial` story (progress=0.35)
- [ ] Add `Half` story (progress=0.5)
- [ ] Add `Full` story (progress=1)
- [ ] Add `Interactive` story with Storybook controls for progress slider (0–1, step 0.01)
- [ ] Add `CustomSegments` story with 5 segments
- [ ] Run tests — must pass before next task

### Task 3: Verify acceptance criteria
- [ ] 10 segments render as pill-shaped bars with correct gap
- [ ] Fill progresses left-to-right matching progress value
- [ ] Track color uses `brandMode-primary-300` token
- [ ] Fill color uses `brandMode-primary-800` token
- [ ] Component fills container width (no fixed width)
- [ ] Run full test suite (`npm run test`)
- [ ] Run linter (`npm run lint`) — all issues must be fixed
- [ ] Visual comparison with Figma in Storybook

### Task 4: [Final] Update documentation
- [ ] Update this plan to completed status

*Note: ralphex automatically moves completed plans to `docs/plans/completed/`*

## Technical Details

### Component API
```tsx
interface ProgressBarProps {
  progress: number;          // 0–1, clamped internally
  segments?: number;         // default: 10
  className?: string;
}
```

### Implementation
```tsx
"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  segments?: number;
  className?: string;
}

export function ProgressBar({
  progress,
  segments = 10,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const filledCount = Math.floor(clamped * segments);
  const partialFill = (clamped * segments) % 1;

  return (
    <div className={cn("flex gap-2 w-full", className)}>
      {Array.from({ length: segments }, (_, i) => {
        const isFull = i < filledCount;
        const isPartial = i === filledCount && partialFill > 0;

        return (
          <div
            key={i}
            className="flex-1 h-2 rounded-full overflow-hidden bg-[var(--colour-brandMode-primary-300)]"
          >
            {(isFull || isPartial) && (
              <div
                className="h-full rounded-r-full bg-[var(--colour-brandMode-primary-800)]"
                style={{ width: isFull ? "100%" : `${partialFill * 100}%` }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
```

### Fill Calculation
- `progress = 0.35` with 10 segments:
  - `filledCount = Math.floor(3.5) = 3` → segments 0, 1, 2 fully filled
  - `partialFill = 3.5 % 1 = 0.5` → segment 3 filled at 50% width
  - Segments 4–9: empty (track color only)

## Post-Completion
- Visual QA in Storybook against Figma dev mode
- Verify fill transitions look smooth when animated by consumer (Toast)
- Test with different container widths to ensure fluid behavior
