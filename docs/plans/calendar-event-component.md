# CalendarEvent Component

## Overview
Create a new domain-specific `CalendarEvent` component (`src/components/features/calendar-event.tsx`) for displaying show/episode events in calendar views. Supports 4 size variants that adapt from full card layout (large) to compact single-row views (small/team), matching the schedule calendar UI in the design system.

## Context (from discovery)
- **No existing implementation** — brand new component
- **Figma source**: [CalendarEvent in Design System](https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2294-1264&m=dev)
- **Location**: `src/components/features/` (domain-specific, not a UI primitive)
- **API types**: `ShowResponse` (name, avatar_url, avatar_type), `EpisodeResponse` (scheduled_at, ends_at), `DefaultTeamMemberResponse` (user_id, role)
- **Patterns**: CVA for size variant, `cn()` utility, design tokens, `text-*` typography utilities

### Size Variants from Figma

| Variant | Height | Layout | Content |
|---------|--------|--------|---------|
| **`l` (Large)** | 106px | Card (column, rounded, bg) | 40px avatar + emoji, show name (heading-xs), time (text-medium-s), "Team" label + overlapping 20px team avatars |
| **`m` (Medium)** | 24px | Row | 24px avatar + emoji, time (text-medium-m, 113px wide), show name (text-semibold-m, truncated) |
| **`s` (Small)** | 24px | Row | 8px color dot, time (text-medium-xs, 40px wide), show name (text-semibold-xs, truncated) |
| **`team`** | 24px | Row | 8px color dot, time (text-medium-xs), overlapping 20px team avatars (4 max visible) |

### Token Mapping

| Element | Token / Value |
|---------|---------------|
| Large card bg | `--colour-interface-background-primary-default` |
| Large card radius | `--number-radius-rad-inner-card` (12px) |
| Large card padding | `--number-spacing-padding-pad-s` (8px) |
| Show name (large) | `text-heading-xs` (16px, 700 weight) — actually bold, not heading utility |
| Show name (medium) | `text-semibold-m` (16px, 600 weight) |
| Show name (small) | `text-semibold-xs` (12px, 600 weight) |
| Time (large) | `text-medium-s` (14px, 500 weight) |
| Time (medium) | `text-medium-m` (16px, 500 weight) |
| Time (small/team) | `text-medium-xs` (12px, 500 weight) |
| Text heavy | `--colour-interface-text-heavy` |
| Text default | `--colour-interface-text-default` |
| Large gap | `--number-spacing-gap-gap-s` (6px) |
| Small/team gap | `--number-spacing-gap-gap-xs` (4px) |
| Team avatar overlap (large) | -8px margin |
| Team avatar overlap (team variant) | -6px margin |

### Sub-components
1. **ShowAvatar** — Circular avatar with optional emoji overlay. Sizes: 40px (large), 24px (medium), 8px dot (small/team)
2. **TeamAvatarStack** — Overlapping row of circular team member avatars (20px each)

## Development Approach
- **Testing approach**: Regular (code first, then tests)
- Complete each task fully before moving to the next
- **CRITICAL: every task MUST include new/updated tests**
- **CRITICAL: all tests must pass before starting next task**
- **CRITICAL: update this plan file when scope changes during implementation**
- All colors/spacing/radii from design tokens
- Component props should be presentation-focused (not tightly coupled to API response shape)

## Testing Strategy
- **Unit tests**: required for every task
- Cover all 4 size variants, text truncation, avatar rendering, team avatar stacking

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with ➕ prefix
- Document issues/blockers with ⚠️ prefix

## Implementation Steps

### Task 1: Create ShowAvatar sub-component
- [ ] Create `src/components/features/calendar-event.tsx` with `ShowAvatar` internal component
- [ ] ShowAvatar renders a circular `<img>` at the given size with `object-cover rounded-full`
- [ ] Support `size` prop: `lg` (40px), `md` (24px), `sm` (8px — color dot only, no image)
- [ ] For `sm` size: render a plain colored circle (8px) using the show's avatar color, no actual image
- [ ] Optional `emoji` prop: overlay a small emoji icon centered on the avatar (20px on lg, 12px on md, hidden on sm)
- [ ] Fallback: if no avatarUrl, show colored circle with first letter of show name (matching AccountSettings pattern)
- [ ] Write unit tests: renders image at correct size, renders fallback, renders emoji overlay, sm renders dot
- [ ] Run tests — must pass before next task

### Task 2: Create TeamAvatarStack sub-component
- [ ] Add `TeamAvatarStack` internal component in same file
- [ ] Renders a row of overlapping 20px circular avatar images
- [ ] Accept `overlap` prop: spacing between avatars (default -8px for large, -6px for team variant)
- [ ] Accept `members` array with `{ avatarUrl, name }` shape
- [ ] Render with negative margin (`mr-[-8px]` or `mr-[-6px]`) + trailing positive padding to prevent clip
- [ ] Write unit tests: renders correct number of avatars, applies overlap margin, renders fallback initials
- [ ] Run tests — must pass before next task

### Task 3: Create CalendarEvent with large variant
- [ ] Define `CalendarEventProps`: `size` (`l` | `m` | `s` | `team`), `showName`, `time`, `avatarUrl?`, `emoji?`, `showColor?`, `teamMembers?`, `className?`, `onClick?`
- [ ] Implement `l` (large) variant: card layout with `bg-primary-default`, `rounded-inner-card`, `p-pad-s`, 106px height
- [ ] Large header section: ShowAvatar (lg) + show name (bold 16px, heavy color, truncated) + time (text-medium-s, default color)
- [ ] Large team section: "Team" label (text-semibold-s) + TeamAvatarStack with -8px overlap
- [ ] Export `CalendarEvent`
- [ ] Write unit tests: large variant renders show name, time, avatar, team section
- [ ] Write unit tests: large variant applies card bg and radius
- [ ] Run tests — must pass before next task

### Task 4: Add medium, small, and team variants
- [ ] Implement `m` (medium) variant: single row, 24px height, ShowAvatar (md) + time (text-medium-m, 113px fixed) + show name (text-semibold-m, truncated)
- [ ] Implement `s` (small) variant: single row, 24px height, ShowAvatar (sm = 8px dot) + time (text-medium-xs, 40px fixed) + show name (text-semibold-xs, truncated)
- [ ] Implement `team` variant: single row, 24px height, ShowAvatar (sm = 8px dot) + time (text-medium-xs) + TeamAvatarStack with -6px overlap
- [ ] Write unit tests: medium variant renders avatar, time, show name in row
- [ ] Write unit tests: small variant renders dot, time, truncated show name
- [ ] Write unit tests: team variant renders dot, time, team avatars
- [ ] Run tests — must pass before next task

### Task 5: Add Storybook stories
- [ ] Create `src/components/features/calendar-event.stories.tsx`
- [ ] Add `Large` story with sample show data and team members
- [ ] Add `Medium` story
- [ ] Add `Small` story
- [ ] Add `Team` story
- [ ] Add `AllSizes` grid story showing all 4 variants side by side
- [ ] Add `LongShowName` story demonstrating text truncation
- [ ] Add `NoAvatar` story showing fallback rendering
- [ ] Run tests — must pass before next task

### Task 6: Verify acceptance criteria
- [ ] All 4 variants render correctly matching Figma
- [ ] Show name truncates with ellipsis when too long
- [ ] Team avatars overlap correctly (-8px for large, -6px for team)
- [ ] Avatar emoji overlay positioned correctly per size
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
interface TeamMember {
  avatarUrl?: string;
  name: string;
}

interface CalendarEventProps {
  size: "l" | "m" | "s" | "team";
  showName: string;
  time: string;                              // formatted time range, e.g. "00:00-00:00"
  avatarUrl?: string;                        // show avatar image URL
  emoji?: string;                            // emoji character or URL for overlay
  showColor?: string;                        // fallback color for avatar dot/circle
  teamMembers?: TeamMember[];                // for large and team variants
  className?: string;
  onClick?: () => void;
}
```

### Layout Per Variant

**Large (`l`)**:
```
┌──────────────────────────────────┐
│ [Avatar+Emoji]  Show Name (bold) │  ← Header row
│                 00:00-00:00      │
│ Team                             │  ← Team section
│ [👤👤👤👤👤👤]                    │  ← Overlapping avatars
└──────────────────────────────────┘
```

**Medium (`m`)**:
```
[Avatar+Emoji] 00:00-00:00  Show Name (truncated)
```

**Small (`s`)**:
```
● -00  Show Name (truncated)
```

**Team**:
```
● -00  [👤👤👤👤]
```

### Avatar Sizing
- Large: 40px image, 20px emoji overlay centered
- Medium: 24px image, 12px emoji overlay centered
- Small/Team: 8px solid color dot, no emoji

### Team Avatar Stack
Negative margin creates overlap effect:
```tsx
<div className="flex items-center pr-[8px]">
  {members.map((m, i) => (
    <img key={i} className="size-5 rounded-full mr-[-8px] shrink-0" />
  ))}
</div>
```

## Post-Completion
- Visual QA in Storybook against Figma dev mode
- Test with real show data from API (avatar URLs, long names)
- Verify truncation behavior across different container widths
