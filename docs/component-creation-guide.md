# Component Creation Guide

Guide for building UI components from Figma designs. Components use **Radix UI primitives** (headless) for behavior/accessibility and **CVA** (class-variance-authority) for type-safe variants, styled exclusively with **Tailwind CSS v4** + our Figma design tokens.

## Stack

| Library | Role |
|---------|------|
| `@radix-ui/react-*` | Headless interactive primitives (dialog, select, popover, tabs, etc.) |
| `class-variance-authority` | Type-safe variant definitions |
| `clsx` + `tailwind-merge` | ClassName composition without Tailwind conflicts |
| `@tanstack/react-table` | Headless data tables (sorting, filtering, pagination) |
| `date-fns` | Date utilities for schedule/calendar components |

## Directory Structure

```
src/components/
├── ui/              # Design system primitives (Button, Input, Select, Dialog, ...)
├── features/        # Domain-specific composites (DataTable, ScheduleGrid, EpisodeCard, ...)
└── layout/          # App shell (Sidebar, Header, PageShell, ...)
```

- `ui/` — Reusable, context-free primitives. One component per file. Named in kebab-case (`dropdown-menu.tsx`).
- `features/` — Business-domain composites that combine `ui/` primitives with app-specific logic.
- `layout/` — Structural page-level components (sidebars, headers, shells).

## Utility: `cn()` helper

Located at `src/lib/utils.ts`. Merges Tailwind classes without conflicts:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Component Pattern

Every `ui/` component follows this structure:

```tsx
// src/components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 1. Define variants with CVA — all visual values come from design tokens
const buttonVariants = cva(
  // Base classes (shared across all variants)
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colour-interface-border-primary-focus)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--colour-interface-button-background-primary-default)] text-[color:var(--colour-interface-button-text-primary)] hover:bg-[var(--colour-interface-button-background-primary-hover)] active:bg-[var(--colour-interface-button-background-primary-active)]",
        secondary:
          "bg-[var(--colour-interface-button-background-secondary-default)] text-[color:var(--colour-interface-button-text-secondary)] border border-[var(--colour-interface-button-border-secondary-default)] hover:bg-[var(--colour-interface-button-background-secondary-hover)] hover:border-[var(--colour-interface-button-border-secondary-hover)] active:bg-[var(--colour-interface-button-background-secondary-active)]",
        tertiary:
          "bg-[var(--colour-interface-button-background-tertiary-default)] text-[color:var(--colour-interface-button-text-tertiary)] border border-[var(--colour-interface-button-border-tertiary-default)] hover:bg-[var(--colour-interface-button-background-tertiary-hover)] active:bg-[var(--colour-interface-button-background-tertiary-active)]",
        destructive:
          "bg-[var(--colour-interface-button-background-destructive-default)] text-[color:var(--colour-interface-button-text-primary)] hover:bg-[var(--colour-interface-button-background-destructive-hover)] active:bg-[var(--colour-interface-button-background-destructive-active)]",
        ghost:
          "hover:bg-[var(--colour-interface-background-secondary-hover)]",
      },
      size: {
        sm: "h-8 px-[var(--number-spacing-padding-pad-m)] text-sm rounded-[var(--number-radius-rad-button)]",
        md: "h-10 px-[var(--number-spacing-padding-pad-l)] text-sm rounded-[var(--number-radius-rad-button)]",
        lg: "h-12 px-[var(--number-spacing-padding-pad-xl)] text-base rounded-[var(--number-radius-rad-button)]",
        icon: "h-10 w-10 rounded-[var(--number-radius-rad-button)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// 2. Define props — extend native HTML + CVA variants
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Render as child element via Radix Slot
}

// 3. Export component + variants
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

// Export variants for reuse in compound components
export { buttonVariants };
```

### Key rules

1. **All visual values from tokens** — Never hardcode colors, spacing, or radii. Use `var(--token-name)` via Tailwind arbitrary values.
2. **CVA for variants** — Every visual variation (size, color, state) is a CVA variant, not a conditional className string.
3. **`asChild` pattern** — Interactive primitives support `asChild` via `@radix-ui/react-slot` for composition (e.g., wrapping a `<Link>` inside a `<Button>`).
4. **`cn()` for merging** — Always wrap the final className with `cn()` so consumers can override with `className` prop.
5. **Named exports** — Export the component as a named export (not default). Export the variants object if other components need it.

## Radix UI Integration

For interactive components, wrap Radix primitives with your custom styling:

```tsx
// src/components/ui/dialog.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 bg-[var(--singleTone-black-black-40)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--colour-interface-surface-base)] rounded-[var(--number-radius-rad-modal)] p-[var(--number-spacing-padding-pad-xl)] shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
```

### When to use Radix vs plain HTML

| Use Radix | Use plain HTML |
|-----------|----------------|
| Dialog, AlertDialog | Badge, Separator |
| Select, Combobox | Card, Avatar (static) |
| DropdownMenu, ContextMenu | Skeleton, Spinner |
| Popover, Tooltip | Typography components |
| Tabs, Accordion | Icon wrapper |
| Checkbox, Radio, Switch | Layout components |
| Toggle, ToggleGroup | — |

## Component States

Every component must document and implement its applicable states. There are 11 states, divided into three implementation categories.

### State Definitions

| # | State | Description | Category |
|---|-------|-------------|----------|
| 1 | **Default** | Base appearance, no interaction occurring | Base CVA classes |
| 2 | **Hover** | Mouse cursor is over the element | CSS pseudo-class |
| 3 | **Pressed** | Mouse button is held down (momentary) | CSS pseudo-class |
| 4 | **Active** | Component is in use — input being typed into, toggle is ON, dropdown open during interaction | CSS / Radix attribute |
| 5 | **Focused** | Element reached via keyboard navigation (Tab) | CSS pseudo-class |
| 6 | **Disabled** | Non-interactive, visually muted | HTML attribute |
| 7 | **Loading** | Async operation in progress (data fetch, upload, submit) | Component prop |
| 8 | **Error** | Validation failed or operation errored | Component prop |
| 9 | **Filled** | Form field contains a value | CSS / Component prop |
| 10 | **Expanded** | Collapsible content is revealed (accordion, dropdown) | Radix attribute |
| 11 | **Selected** | Item is chosen, checked, or toggled on | Radix attribute |

### Implementation by Category

#### CSS Pseudo-class States (automatic — no props needed)

Baked into CVA base/variant classes. The browser handles transitions.

```tsx
// Hover, Pressed, Focused — all in the CVA definition
const buttonVariants = cva(
  [
    // Default
    "bg-[var(--colour-interface-button-background-primary-default)]",
    // Hover
    "hover:bg-[var(--colour-interface-button-background-primary-hover)]",
    // Pressed (CSS :active)
    "active:bg-[var(--colour-interface-button-background-primary-active)]",
    // Focused (keyboard only — NOT :focus which fires on mouse click too)
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colour-interface-border-primary-focus)]",
  ].join(" ")
);
```

**Important**: Use `focus-visible:` (keyboard) not `focus:` (keyboard + mouse). This ensures the focus ring only appears during keyboard navigation.

#### Active State (in-use, not CSS :active)

The Active state means "component is currently being interacted with via mouse" — distinct from Focused (keyboard). Implementation depends on component type:

```tsx
// For form inputs: use :focus:not(:focus-visible) to target mouse focus
"focus:not(:focus-visible):border-[var(--colour-interface-form-border-active)]"
"focus:not(:focus-visible):bg-[var(--colour-interface-form-surface-active)]"

// For Radix toggles/switches: use data attribute
"data-[state=on]:bg-[var(--colour-interface-button-background-primary-default)]"

// For Radix open states (select trigger while dropdown is open):
"data-[state=open]:bg-[var(--colour-interface-form-surface-active)]"
```

#### HTML/Radix Attribute States (driven by attributes)

```tsx
// Disabled — native HTML attribute, styled via Tailwind
"disabled:opacity-50 disabled:pointer-events-none"

// Expanded — Radix data attribute on collapsible/accordion/dropdown content
"data-[state=open]:animate-in data-[state=closed]:animate-out"

// Selected — Radix data attribute on checkbox/radio/toggle
"data-[state=checked]:bg-[var(--colour-interface-button-background-primary-default)]"
"data-[state=checked]:text-[color:var(--colour-interface-button-text-primary)]"

// Selected — aria attribute on tabs/menu items
"aria-selected:bg-[var(--colour-interface-background-primary-default)]"
```

#### Component Prop States (explicit props with conditional logic)

These require props on the component interface and conditional rendering:

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  error?: string | boolean;
}

export function Input({ isLoading, error, className, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        className={cn(
          // Default
          "border border-[var(--colour-interface-form-border-default)] rounded-[var(--number-radius-rad-input)]",
          // Error state (prop-driven)
          error && "border-[var(--colour-interface-form-border-error)] text-[color:var(--colour-interface-text-semantic-error)]",
          // Loading state (prop-driven) — disable interaction
          isLoading && "opacity-70 pointer-events-none",
          className
        )}
        aria-invalid={!!error}
        disabled={isLoading || props.disabled}
        {...props}
      />
      {/* Loading spinner */}
      {isLoading && <Spinner className="absolute right-3 top-1/2 -translate-y-1/2" />}
      {/* Error message */}
      {typeof error === "string" && (
        <p className="mt-1 text-sm text-[color:var(--colour-interface-text-semantic-error)]">{error}</p>
      )}
    </div>
  );
}
```

**Filled state** — dual detection:

```tsx
// Native inputs: CSS auto-detection (no prop needed)
"placeholder:text-[color:var(--colour-interface-text-placeholder)] [&:not(:placeholder-shown)]:border-[var(--colour-interface-form-border-active)]"

// Custom components (Select, Combobox): use isFilled prop
interface SelectProps {
  isFilled?: boolean;
}
// Then: isFilled && "border-[var(--colour-interface-form-border-active)]"
```

### Component–State Matrix

Which states each component must implement. **Required (R)** states must be implemented. **Optional (O)** states are implemented only if the Figma design specifies them.

| Component | Default | Hover | Pressed | Active | Focused | Disabled | Loading | Error | Filled | Expanded | Selected |
|-----------|:-------:|:-----:|:-------:|:------:|:-------:|:--------:|:-------:|:-----:|:------:|:--------:|:--------:|
| **Button** | R | R | R | — | R | R | O | — | — | — | — |
| **IconButton** | R | R | R | — | R | R | O | — | — | — | — |
| **Input** | R | R | — | R | R | R | O | R | R | — | — |
| **Textarea** | R | R | — | R | R | R | — | R | R | — | — |
| **Select** | R | R | — | R | R | R | O | R | R | R | — |
| **Combobox** | R | R | — | R | R | R | R | R | R | R | — |
| **Checkbox** | R | R | R | — | R | R | — | R | — | — | R |
| **Radio** | R | R | R | — | R | R | — | R | — | — | R |
| **Switch** | R | R | R | — | R | R | — | — | — | — | R |
| **Tabs** (trigger) | R | R | R | — | R | R | — | — | — | — | R |
| **Accordion** (trigger) | R | R | R | — | R | R | — | — | — | R | — |
| **Dialog** | R | — | — | — | — | — | O | — | — | R | — |
| **Popover** | R | — | — | — | — | — | — | — | — | R | — |
| **DropdownMenu** | R | — | — | — | — | — | — | — | — | R | — |
| **DropdownMenu** (item) | R | R | R | — | R | R | — | — | — | — | — |
| **Tooltip** | R | — | — | — | — | — | — | — | — | R | — |
| **Badge** | R | — | — | — | — | — | — | O | — | — | — |
| **Toast** | R | — | — | — | — | — | — | R | — | — | — |
| **DataTable** (row) | R | R | — | — | R | — | — | — | — | — | R |
| **DataTable** (container) | R | — | — | — | — | — | R | R | — | — | — |
| **Skeleton** | R | — | — | — | — | — | — | — | — | — | — |
| **Separator** | R | — | — | — | — | — | — | — | — | — | — |
| **Label** | R | — | — | — | — | R | — | R | — | — | — |

### Storybook State Documentation

Every component story file must showcase all applicable states. Follow these conventions:

#### Story file structure

```tsx
// src/components/ui/button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Button>;

// 1. Default — always first
export const Default: Story = {
  args: { children: "Button" },
};

// 2. All variants
export const Primary: Story = { args: { children: "Primary", variant: "primary" } };
export const Secondary: Story = { args: { children: "Secondary", variant: "secondary" } };
export const Destructive: Story = { args: { children: "Destructive", variant: "destructive" } };

// 3. All sizes
export const Small: Story = { args: { children: "Small", size: "sm" } };
export const Large: Story = { args: { children: "Large", size: "lg" } };

// 4. Prop-based states — one story each
export const Disabled: Story = { args: { children: "Disabled", disabled: true } };
export const Loading: Story = { args: { children: "Loading", isLoading: true } };

// 5. Interactive states (hover, pressed, focused) — documented via Storybook pseudo addon
//    Install: @storybook/addon-pseudo-states
export const Hovered: Story = {
  args: { children: "Hovered" },
  parameters: { pseudo: { hover: true } },
};
export const FocusVisible: Story = {
  args: { children: "Focused" },
  parameters: { pseudo: { focusVisible: true } },
};

// 6. State grid — all variants × key states in one view
export const StateGrid: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button isLoading>Loading</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};
```

#### Naming conventions for stories

| State | Story name | How shown |
|-------|-----------|-----------|
| Default | `Default` | Normal render |
| Hover | `Hovered` | `pseudo: { hover: true }` |
| Pressed | `Pressed` | `pseudo: { active: true }` |
| Active | `Active` | Set relevant data attribute or use Radix open state |
| Focused | `FocusVisible` | `pseudo: { focusVisible: true }` |
| Disabled | `Disabled` | `disabled: true` prop |
| Loading | `Loading` | `isLoading: true` prop |
| Error | `WithError` | `error: "Error message"` prop |
| Filled | `Filled` | Pre-fill the input value |
| Expanded | `Expanded` | Render with open/expanded state |
| Selected | `Selected` | Render with checked/selected state |

#### Required Storybook addon

Install `@storybook/addon-pseudo-states` to visualize CSS pseudo-class states (hover, active, focus-visible) without manual interaction. This is critical for side-by-side comparison with Figma.

## Design Token Reference

All tokens are in `src/styles/tokens.css` (auto-generated, do not edit). Key namespaces:

### Colors

| Token namespace | Purpose | Example |
|----------------|---------|---------|
| `--colour-interface-surface-*` | Surface/canvas colors | `base`, `primary`, `secondary` |
| `--colour-interface-background-*` | Background fills with states | `primary-default`, `primary-hover`, `semantic-error-default` |
| `--colour-interface-text-*` | Text colors | `heavy`, `default`, `supporting`, `placeholder`, `onHeavy` |
| `--colour-interface-border-*` | Border colors | `primary-heavy`, `primary-medium`, `primary-light`, `primary-focus` |
| `--colour-interface-icon-*` | Icon colors | `heavy`, `default`, `supporting`, `semantic-error` |
| `--colour-interface-button-background-*` | Button fills with states | `primary-default`, `secondary-hover`, `destructive-active` |
| `--colour-interface-button-border-*` | Button borders | `secondary-default`, `focus-default` |
| `--colour-interface-button-text-*` | Button text | `primary`, `secondary`, `tertiary` |
| `--colour-interface-button-icon-*` | Button icon | `primary`, `secondary`, `tertiary` |
| `--colour-interface-form-*` | Form elements | `surface-hover`, `border-default`, `border-error` |
| `--colour-semantic-*` | Semantic color scales (50-900) | `error-500`, `success-700`, `info-400` |
| `--colour-brandMode-primary-*` | Brand color ramp (50-900) | `primary-50` through `primary-900` |

### Spacing

| Token | Values |
|-------|--------|
| `--number-spacing-gap-gap-*` | `0`, `2xs` (2px), `xs` (4px), `s` (6px), `m` (12px), `l` (18px), `xl` (24px), `2xl` (32px) |
| `--number-spacing-padding-pad-*` | `0`, `xs` (4px), `s` (8px), `m` (12px), `l` (18px), `xl` (24px), `2xl` (32px), `3xl` (36px), `4xl` (56px) |

### Border Radius

| Token | Value |
|-------|-------|
| `--number-radius-rad-0` | 0px |
| `--number-radius-rad-action-handle` | 4px |
| `--number-radius-rad-inner-block` | 8px |
| `--number-radius-rad-inner-card` | 12px |
| `--number-radius-rad-input` | 12px |
| `--number-radius-rad-toast` | 16px |
| `--number-radius-rad-modal` | 18px |
| `--number-radius-rad-card` | 24px |
| `--number-radius-rad-button` | 999px (pill) |
| `--number-radius-rad-pill` | 999px |

### Raw Numbers

`--numbers-0` through `--numbers-999` (0, 2, 4, 6, 8, 12, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80, 96, 120, 160, 200, 320, 400, 999 px).

## Figma-to-Code Workflow

1. **Inspect in Figma Dev Mode** — Select the component, note its fill, stroke, padding, gap, corner radius, text style, and states (default, hover, focus, active, disabled).

2. **Map properties to tokens** — Match each Figma value to the nearest CSS variable in `tokens.css`. The Figma token names correspond directly to CSS variable names (e.g., Figma `colour.interface.button.background.primary.default` → CSS `--colour-interface-button-background-primary-default`).

3. **Create the file** — Place it in the correct directory:
   - Generic UI primitive → `src/components/ui/{name}.tsx`
   - Domain composite → `src/components/features/{name}.tsx`
   - App shell → `src/components/layout/{name}.tsx`

4. **Define CVA variants** — Map each Figma variant (size, type, state) to a CVA variant. Use the token variables for all visual properties.

5. **Add Radix primitive** — If the component is interactive (dropdown, dialog, tabs, etc.), use the corresponding `@radix-ui/react-*` package for behavior. If it's purely visual (badge, card, separator), use plain HTML.

6. **Write Storybook story** — Create `{name}.stories.tsx` alongside the component. Cover all variants, sizes, and interactive states.

7. **Compare** — Open Storybook side-by-side with Figma and verify pixel-perfect match.

## Complex Components

### Data Tables

Use `@tanstack/react-table` (headless) in `src/components/features/data-table.tsx`:

- Define column configs with `createColumnHelper<T>()`
- Build a styled `<DataTable>` wrapper that renders the headless table with your design tokens
- Support sorting, filtering, pagination, and row selection as composable features
- Style headers, rows, cells, and pagination controls with tokens

### Schedule / Calendar

Build custom in `src/components/features/schedule-grid.tsx`:

- Use CSS Grid for the timeline layout
- Use `date-fns` for date computation (week ranges, time slots)
- Integrate with the Schedule API types from `src/types/api.ts`
- No external calendar library — build to match Figma exactly

## File Naming

| Type | Example |
|------|---------|
| Component file | `src/components/ui/dropdown-menu.tsx` |
| Storybook story | `src/components/ui/dropdown-menu.stories.tsx` |
| Feature component | `src/components/features/episode-card.tsx` |
| Layout component | `src/components/layout/sidebar.tsx` |

## Build Order

| Phase | Components |
|-------|-----------|
| 1. Foundation | `cn()` util, Button, Input, Label, Badge, Separator |
| 2. Forms | Select, Checkbox, Radio, Switch, Textarea, FormField |
| 3. Overlays | Dialog, Popover, DropdownMenu, Tooltip, Toast |
| 4. Navigation | Tabs, Sidebar, Header, Breadcrumb |
| 5. Data | DataTable, Pagination, Filters, Search |
| 6. Domain | EpisodeCard, ShowCard, ScheduleGrid, Calendar |
