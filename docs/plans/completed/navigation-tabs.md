# Navigation Tabs Component

## Overview
- Create a reusable Navigation Tab system (`Tab`, `TabList`, `TabContent`) as a UI primitive in `src/components/ui/`
- Built on `@radix-ui/react-tabs` for accessible keyboard navigation, ARIA roles, and roving focus
- Styled with CVA variants and design tokens to match the Figma design (node `2057:1510`)
- Two visual sub-components: individual `Tab` (4 states: Default, Hover, Focus, Active) and `TabList` container bar

## Context (from discovery)
- **Files/components involved**: new files in `src/components/ui/tabs.tsx`, `src/components/ui/tabs.stories.tsx`
- **Related patterns found**: CVA variants (`button.tsx`), `cn()` utility, `<Icon>` wrapper, Radix Slot pattern (`asChild`)
- **Dependencies identified**: `@radix-ui/react-tabs` (to install), `class-variance-authority`, `iconoir-react`, existing design tokens
- **Figma reference**: https://www.figma.com/design/40fC5TqHXkPTDJCMyhAHH1/Syncro-%7C-MediaPlans-Design-System?node-id=2057-1510&m=dev

### Figma Design Specifications
| Property | Value | Token |
|----------|-------|-------|
| Tab padding | 8px left, 12px right, 8px top/bottom | `pad-s`, `pad-m`, `pad-s` |
| Tab gap (icon to text) | 6px | `gap-s` |
| Tab list gap (between tabs) | 12px | `gap-m` |
| Tab list left padding | 12px | `pad-m` |
| Icon size | 24x24 | — |
| Text style | 14px / 500 weight / 18px line-height | `text-medium-s` |
| Default text color | `#44484c` | `--colour-interface-text-default` |
| Active text color | `#23262a` | `--colour-interface-text-heavy` |
| Hover border | `#eef2f7`, 1.8px bottom | `--colour-interface-border-primary-light` |
| Focus border | `#bfc3c8`, 1.8px bottom | `--colour-interface-border-primary-medium` |
| Active border | `#44484c`, 1.8px bottom | `--colour-brandMode-primary-800` |
| Tab list bottom border | `#f5f5f5`, 1px | `--colour-interface-border-secondary-light` |

## Development Approach
- **Testing approach**: TDD (tests first)
- Complete each task fully before moving to the next
- Make small, focused changes
- **CRITICAL: every task MUST include new/updated tests** for code changes in that task
  - tests are not optional - they are a required part of the checklist
  - write unit tests for new functions/methods
  - add new test cases for new code paths
  - tests cover both success and error scenarios
- **CRITICAL: all tests must pass before starting next task** - no exceptions
- **CRITICAL: update this plan file when scope changes during implementation**
- Run tests after each change
- Maintain backward compatibility

## Testing Strategy
- **Unit tests**: Vitest + React Testing Library for component rendering and interaction
- **Storybook**: Visual documentation of all states and variants
- Test keyboard navigation (arrow keys, tab key) via Radix built-in behavior
- Test ARIA attributes (`role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`)
- Test controlled and uncontrolled modes

## Progress Tracking
- Mark completed items with `[x]` immediately when done
- Add newly discovered tasks with + prefix
- Document issues/blockers with warning prefix
- Update plan if implementation deviates from original scope
- Keep plan in sync with actual work done

## Implementation Steps

### Task 1: Install dependencies and set up test infrastructure
- [x] Install `@radix-ui/react-tabs` via npm
- [x] Verify Vitest and React Testing Library are available (install if needed)
- [x] Create empty `src/components/ui/tabs.tsx` with placeholder exports
- [x] Create test file `src/components/ui/__tests__/tabs.test.tsx` with initial test structure
- [x] Run tests - must pass before next task

### Task 2: Implement Tab trigger component (TDD)
- [x] Write tests for `Tab` component: renders text label, renders with leading icon, applies `text-medium-s` typography
- [x] Write tests for Tab states: default has no bottom border, hover state applies light border, focus-visible applies medium border, active (selected) applies dark border + heavy text
- [x] Write tests for accessibility: has `role="tab"`, `aria-selected` toggles, keyboard focusable
- [x] Implement `Tab` component with CVA variants in `src/components/ui/tabs.tsx`:
  - Base styles: flex, gap-s (6px), padding (8px / 12px / 8px), cursor-pointer, text-medium-s
  - Default: text-default color, no bottom border
  - Hover: `hover:border-b-[1.8px] hover:border-[var(--colour-interface-border-primary-light)]`
  - Focus: `focus-visible:border-b-[1.8px] focus-visible:border-[var(--colour-interface-border-primary-medium)]`
  - Active (via Radix `data-[state=active]`): border-b-[1.8px] with `--colour-brandMode-primary-800`, text `--colour-interface-text-heavy`
  - Support optional `leadingIcon` prop (renders via `<Icon>` wrapper)
- [x] Run tests - must pass before next task

### Task 3: Implement TabList and TabContent containers (TDD)
- [x] Write tests for `TabList`: renders as horizontal flex row, has bottom border, applies correct gap and padding
- [x] Write tests for `TabContent`: renders panel content when tab is active, has correct ARIA attributes
- [x] Write tests for composed usage: `Tabs` root + `TabList` + `Tab` triggers + `TabContent` panels work together
- [x] Implement `TabList` component wrapping `Radix.TabsList`:
  - Flex row, gap-m (12px), padding-left pad-m (12px), border-bottom 1px `--colour-interface-border-secondary-light`
  - Accept `className` override via `cn()`
- [x] Implement `TabContent` component wrapping `Radix.TabsContent`:
  - Minimal styling, accept `className` override
- [x] Export `Tabs` (root), `TabList`, `Tab`, `TabContent` from `src/components/ui/tabs.tsx`
- [x] Run tests - must pass before next task

### Task 4: Implement controlled and uncontrolled modes (TDD)
- [x] Write tests for uncontrolled mode: first tab active by default via `defaultValue`
- [x] Write tests for controlled mode: `value` + `onValueChange` props control active tab
- [x] Write tests for programmatic tab switching
- [x] Implement controlled/uncontrolled support via Radix `Tabs` root props passthrough
- [x] Run tests - must pass before next task

### Task 5: Create Storybook stories
- [x] Create `src/components/ui/tabs.stories.tsx` with Meta setup
- [x] Add `Default` story: basic 3-tab example with text-only tabs
- [x] Add `WithIcons` story: tabs with leading icons using `<Icon>` wrapper
- [x] Add `ActiveStates` story: grid showing all 4 tab states (Default, Hover, Focus, Active)
- [x] Add `Controlled` story: demonstrates controlled tab switching
- [x] Add `ManyTabs` story: 10 tabs matching the Figma Tab View layout
- [x] Verify all stories render correctly in Storybook
- [x] Run tests - must pass before next task

### Task 6: Verify acceptance criteria
- [x] Verify all Figma design specifications are matched (spacing, colors, typography, borders)
- [x] Verify keyboard navigation works (arrow keys between tabs, Tab key to content)
- [x] Verify ARIA attributes are correct (`role="tablist"`, `role="tab"`, `role="tabpanel"`)
- [x] Run full test suite (unit tests)
- [x] Run linter (`npm run lint`) - all issues must be fixed
- [x] Verify Storybook builds without errors

### Task 7: [Final] Update documentation
- [x] Update `docs/component-creation-guide.md` if new patterns were discovered (no new patterns — Tabs follows existing Radix wrapper pattern)
- [x] Add Tabs to the component inventory in any relevant docs (no component inventory exists; Tabs already listed in component-creation-guide build order and state matrix)

## Technical Details

### Component API
```tsx
// Root - wraps Radix.Tabs
<Tabs defaultValue="tab1" value={value} onValueChange={setValue}>
  // Tab list container
  <TabList className="...">
    <Tab value="tab1" leadingIcon={PlusIcon}>Label 1</Tab>
    <Tab value="tab2">Label 2</Tab>
  </TabList>

  // Content panels
  <TabContent value="tab1">Content for tab 1</TabContent>
  <TabContent value="tab2">Content for tab 2</TabContent>
</Tabs>
```

### Tab Props
```tsx
interface TabProps extends Radix.TabsTriggerProps {
  leadingIcon?: React.ComponentType;  // Iconoir icon component
  children: React.ReactNode;          // Tab label text
  className?: string;
}
```

### State Mapping (Figma → Implementation)
| Figma State | Implementation |
|-------------|---------------|
| Default | Base CVA styles (no border) |
| Hover | `hover:` pseudo-class |
| Focus | `focus-visible:` pseudo-class |
| Active | Radix `data-[state=active]:` attribute |

### Design Token References
```css
/* Spacing */
--number-spacing-gap-gap-s: 6px;
--number-spacing-gap-gap-m: 12px;
--number-spacing-padding-pad-s: 8px;
--number-spacing-padding-pad-m: 12px;

/* Colors */
--colour-interface-text-default: #44484c;
--colour-interface-text-heavy: #23262a;
--colour-interface-border-primary-light: #eef2f7;
--colour-interface-border-primary-medium: #bfc3c8;
--colour-interface-border-secondary-light: #f5f5f5;
--colour-brandMode-primary-800: #44484c;

/* Icon */
--colour-interface-icon-default: (for tab icons)
--colour-interface-icon-heavy: (for active tab icons)
```

## Post-Completion

**Manual verification:**
- Visual comparison with Figma design in Storybook
- Test with screen reader to verify ARIA announcements
- Verify tab transitions feel smooth and responsive
