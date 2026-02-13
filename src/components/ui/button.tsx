"use client";

import React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  EVENT_HANDLER_RE,
  stripChildEventHandlers,
  preventActivation,
  preventKeyboardActivation,
} from "@/components/ui/button-utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "gap-[var(--number-spacing-gap-gap-s)]",
    "rounded-[var(--number-radius-rad-button)]",
    "transition-colors cursor-pointer",
    // Focus ring: 4px ring (box-shadow) matching Figma — avoids layout shift and border conflicts
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--colour-interface-button-border-focus-default)]",
    // Disabled state applied via className (not :disabled pseudo) so it works with asChild + anchors
    "aria-disabled:opacity-50 aria-disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--colour-interface-button-background-primary-default)]",
          "text-[color:var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-primary-hover)]",
          "active:bg-[var(--colour-interface-button-background-primary-active)]",
        ].join(" "),
        secondary: [
          "bg-[var(--colour-interface-button-background-secondary-default)]",
          "text-[color:var(--colour-interface-button-text-secondary)]",
          "border-[2.5px] border-solid border-[var(--colour-interface-button-border-secondary-default)]",
          "hover:bg-[var(--colour-interface-button-background-secondary-hover)] hover:border-[var(--colour-interface-button-border-secondary-hover)]",
          "active:bg-[var(--colour-interface-button-background-secondary-active)] active:border-[var(--colour-interface-button-border-secondary-active)]",
        ].join(" "),
        tertiary: [
          "bg-[var(--colour-interface-button-background-tertiary-default)]",
          "text-[color:var(--colour-interface-button-text-tertiary)]",
          "border border-solid border-[var(--colour-interface-button-border-tertiary-default)]",
          "hover:bg-[var(--colour-interface-button-background-tertiary-hover)] hover:border-[var(--colour-interface-button-border-tertiary-hover)]",
          "active:bg-[var(--colour-interface-button-background-tertiary-active)] active:border-[var(--colour-interface-button-border-tertiary-active)]",
        ].join(" "),
        destructive: [
          "bg-[var(--colour-interface-button-background-destructive-default)]",
          "text-[color:var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-destructive-hover)]",
          "active:bg-[var(--colour-interface-button-background-destructive-active)]",
        ].join(" "),
        error: [
          "bg-[var(--colour-interface-button-background-semantic-error-default)]",
          "text-[color:var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-semantic-error-hover)]",
          "active:bg-[var(--colour-interface-button-background-semantic-error-active)]",
        ].join(" "),
        info: [
          "bg-[var(--colour-interface-button-background-semantic-info-default)]",
          "text-[color:var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-semantic-info-hover)]",
          "active:bg-[var(--colour-interface-button-background-semantic-info-active)]",
        ].join(" "),
        success: [
          "bg-[var(--colour-interface-button-background-semantic-success-default)]",
          "text-[color:var(--colour-interface-button-text-primary)]",
          "hover:bg-[var(--colour-interface-button-background-semantic-success-hover)]",
          "active:bg-[var(--colour-interface-button-background-semantic-success-active)]",
        ].join(" "),
        warning: [
          "bg-[var(--colour-interface-button-background-semantic-warning-default)]",
          "text-[color:var(--colour-interface-button-text-primary)]",
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

  // When asChild + disabled, filter out all event handlers from rest props so
  // handlers like onMouseDown, onFocus, etc. don't leak through to the child.
  const restProps =
    asChild && isDisabled
      ? Object.fromEntries(
          Object.entries(props).filter(([k]) => !EVENT_HANDLER_RE.test(k)),
        )
      : props;

  return (
    <Comp
      {...restProps}
      className={cn(
        buttonVariants({ variant, size }),
        isLoading && !disabled && "opacity-80 pointer-events-none",
        isLoading && disabled && "pointer-events-none",
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
    >
      {leadingIcon && (
        <span className="inline-flex items-center justify-center shrink-0 size-6" aria-hidden="true">{leadingIcon}</span>
      )}
      <Slottable>{resolvedChildren}</Slottable>
      {trailingIcon && (
        <span className="inline-flex items-center justify-center shrink-0 size-6" aria-hidden="true">{trailingIcon}</span>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
