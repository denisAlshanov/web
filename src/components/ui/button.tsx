"use client";

import React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "gap-[var(--number-spacing-gap-gap-s)]",
    "rounded-[var(--number-radius-rad-button)]",
    "transition-colors cursor-pointer",
    // Focus ring: 4px outline matching Figma (outline avoids layout shift and border conflicts)
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--colour-interface-button-border-focus-default)]",
    // Disabled state applied via className (not :disabled pseudo) so it works with asChild + anchors
    "aria-disabled:opacity-50 aria-disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--colour-interface-button-background-primary-default)]",
          "text-[var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-primary-hover)]",
          "active:bg-[var(--colour-interface-button-background-primary-active)]",
        ].join(" "),
        secondary: [
          "bg-[var(--colour-interface-button-background-secondary-default)]",
          "text-[var(--colour-interface-button-text-secondary)]",
          "border-[2.5px] border-solid border-[var(--colour-interface-button-border-secondary-default)]",
          "hover:bg-[var(--colour-interface-button-background-secondary-hover)] hover:border-[var(--colour-interface-button-border-secondary-hover)]",
          "active:bg-[var(--colour-interface-button-background-secondary-active)] active:border-[var(--colour-interface-button-border-secondary-active)]",
        ].join(" "),
        tertiary: [
          "bg-[var(--colour-interface-button-background-tertiary-default)]",
          "text-[var(--colour-interface-button-text-tertiary)]",
          "border border-solid border-[var(--colour-interface-button-border-tertiary-default)]",
          "hover:bg-[var(--colour-interface-button-background-tertiary-hover)] hover:border-[var(--colour-interface-button-border-tertiary-hover)]",
          "active:bg-[var(--colour-interface-button-background-tertiary-active)] active:border-[var(--colour-interface-button-border-tertiary-active)]",
        ].join(" "),
        destructive: [
          "bg-[var(--colour-interface-button-background-destructive-default)]",
          "text-[var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-destructive-hover)]",
          "active:bg-[var(--colour-interface-button-background-destructive-active)]",
        ].join(" "),
        error: [
          "bg-[var(--colour-interface-button-background-semantic-error-default)]",
          "text-[var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-semantic-error-hover)]",
          "active:bg-[var(--colour-interface-button-background-semantic-error-active)]",
        ].join(" "),
        info: [
          "bg-[var(--colour-interface-button-background-semantic-info-default)]",
          "text-[var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-semantic-info-hover)]",
          "active:bg-[var(--colour-interface-button-background-semantic-info-active)]",
        ].join(" "),
        success: [
          "bg-[var(--colour-interface-button-background-semantic-success-default)]",
          "text-[var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-semantic-success-hover)]",
          "active:bg-[var(--colour-interface-button-background-semantic-success-active)]",
        ].join(" "),
        warning: [
          "bg-[var(--colour-interface-button-background-semantic-warning-default)]",
          "text-[var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-semantic-warning-hover)]",
          "active:bg-[var(--colour-interface-button-background-semantic-warning-active)]",
        ].join(" "),
      },
      size: {
        sm: "h-12 px-[var(--number-spacing-padding-pad-xl)] py-[var(--number-spacing-padding-pad-m)] text-semibold-s",
        md: "h-13 px-[var(--number-spacing-padding-pad-2xl)] py-[var(--number-spacing-padding-pad-l)] text-semibold-m",
        lg: "h-15 px-[var(--number-spacing-padding-pad-3xl)] py-[var(--number-spacing-padding-pad-l)] text-semibold-l",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  isLoading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

// Event handler prop name pattern (matches onClick, onKeyDownCapture, etc.)
const EVENT_HANDLER_RE = /^on[A-Z]/;

/**
 * When asChild + disabled, strip all event handler props from the slotted child
 * so Radix Slot's mergeProps has nothing to merge for the child side.
 *
 * This avoids two problems with the previous native-capture-listener approach:
 * 1. React 19 delegates capture listeners on the root and dispatches synthetic
 *    capture handlers (onClickCapture, etc.) before native capture listeners
 *    on the target node fire — so child handlers could still run.
 * 2. Native listeners were tied to a useEffect dep array ([asChild, isDisabled])
 *    and would go stale if the underlying DOM node changed without those deps
 *    changing.
 */
function stripChildEventHandlers(children: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(children)) return children;
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(
    children.props as Record<string, unknown>,
  )) {
    cleaned[key] = EVENT_HANDLER_RE.test(key) ? undefined : value;
  }
  return React.cloneElement(children, cleaned);
}

/**
 * Prevent native activation (e.g. link navigation) when asChild + disabled.
 * pointer-events-none blocks pointer input but not programmatic clicks,
 * and aria-disabled does not prevent native behavior — so we need an
 * explicit handler that calls preventDefault.
 */
function preventActivation(e: React.MouseEvent) {
  e.preventDefault();
}

/** Block Enter/Space from activating native link navigation when disabled. */
function preventKeyboardActivation(e: React.KeyboardEvent) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
  }
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  leadingIcon,
  trailingIcon,
  isLoading = false,
  disabled,
  children,
  type = "button",
  ref,
  onClick,
  onKeyDown,
  onClickCapture,
  onKeyDownCapture,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const isDisabled = disabled || isLoading;

  // When asChild + disabled, strip event handlers from the child element so
  // Radix Slot's mergeProps cannot merge them (child-first) with slot props.
  // This is done at the React level, which sidesteps both the React 19
  // root-delegation ordering issue and the stale-ref problem entirely.
  const resolvedChildren =
    asChild && isDisabled ? stripChildEventHandlers(children) : children;

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size }),
        isLoading && "!opacity-80 pointer-events-none",
        className,
      )}
      ref={ref}
      disabled={!asChild ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={isLoading || undefined}
      type={asChild ? undefined : type}
      onClick={asChild && isDisabled ? preventActivation : onClick}
      onKeyDown={asChild && isDisabled ? preventKeyboardActivation : onKeyDown}
      onClickCapture={asChild && isDisabled ? undefined : onClickCapture}
      onKeyDownCapture={asChild && isDisabled ? undefined : onKeyDownCapture}
      {...props}
    >
      {isLoading && <Spinner />}
      {leadingIcon && !isLoading && (
        <span className="shrink-0 size-6" aria-hidden="true">{leadingIcon}</span>
      )}
      <Slottable>{resolvedChildren}</Slottable>
      {trailingIcon && !isLoading && (
        <span className="shrink-0 size-6" aria-hidden="true">{trailingIcon}</span>
      )}
    </Comp>
  );
}

function Spinner() {
  return (
    <svg
      className="size-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export { Button, buttonVariants };
