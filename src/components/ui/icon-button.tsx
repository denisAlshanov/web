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
  Spinner,
} from "@/components/ui/button-utils";

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "rounded-full",
    "transition-colors cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--colour-interface-button-border-focus-default)]",
    "aria-disabled:opacity-50 aria-disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--colour-interface-button-background-primary-default)]",
          "text-[color:var(--colour-interface-button-icon-primary)]",
          "hover:bg-[var(--colour-interface-button-background-primary-hover)]",
          "active:bg-[var(--colour-interface-button-background-primary-active)]",
        ].join(" "),
        secondary: [
          "bg-[var(--colour-interface-button-background-secondary-default)]",
          "text-[color:var(--colour-interface-button-icon-secondary)]",
          "border-[2.5px] border-solid border-[var(--colour-interface-button-border-secondary-default)]",
          "hover:bg-[var(--colour-interface-button-background-secondary-hover)] hover:border-[var(--colour-interface-button-border-secondary-hover)]",
          "active:bg-[var(--colour-interface-button-background-secondary-active)] active:border-[var(--colour-interface-button-border-secondary-active)]",
        ].join(" "),
        tertiary: [
          "bg-[var(--colour-interface-button-background-tertiary-default)]",
          "text-[color:var(--colour-interface-button-icon-tertiary)]",
          "border-[2.5px] border-solid border-[var(--colour-interface-button-border-tertiary-default)]",
          "hover:bg-[var(--colour-interface-button-background-tertiary-hover)] hover:border-[var(--colour-interface-button-border-tertiary-hover)]",
          "active:bg-[var(--colour-interface-button-background-tertiary-active)] active:border-[var(--colour-interface-button-border-tertiary-active)]",
        ].join(" "),
        ghost: [
          "bg-transparent",
          "text-[color:var(--colour-interface-button-icon-secondary)]",
          "hover:bg-[var(--colour-interface-button-background-secondary-hover)]",
          "active:bg-[var(--colour-interface-button-background-secondary-active)]",
        ].join(" "),
        destructive: [
          "bg-[var(--colour-interface-button-background-destructive-default)]",
          "text-[color:var(--colour-interface-button-icon-primary)]",
          "hover:bg-[var(--colour-interface-button-background-destructive-hover)]",
          "active:bg-[var(--colour-interface-button-background-destructive-active)]",
        ].join(" "),
      },
      size: {
        xs: "size-10",
        sm: "size-12",
        md: "size-[52px]",
        lg: "size-[60px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

/** Active-state background classes applied during loading to give visual feedback. */
const iconButtonLoadingBg: Record<string, string> = {
  primary: "bg-[var(--colour-interface-button-background-primary-active)]",
  secondary:
    "bg-[var(--colour-interface-button-background-secondary-active)] border-[var(--colour-interface-button-border-secondary-active)]",
  tertiary:
    "bg-[var(--colour-interface-button-background-tertiary-active)] border-[var(--colour-interface-button-border-tertiary-active)]",
  ghost: "bg-[var(--colour-interface-button-background-secondary-active)]",
  destructive:
    "bg-[var(--colour-interface-button-background-destructive-active)]",
};

export interface IconButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "aria-label"
    >,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode;
  "aria-label": string;
  asChild?: boolean;
  isLoading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

function IconButton({
  className,
  variant,
  size,
  icon,
  asChild = false,
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
}: IconButtonProps) {
  const Comp = asChild ? Slot : "button";

  const isDisabled = disabled || isLoading;

  const resolvedChildren =
    asChild && isDisabled ? stripChildEventHandlers(children) : children;

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
        iconButtonVariants({ variant, size }),
        isLoading && !disabled && "!opacity-80 pointer-events-none",
        isLoading && !disabled && iconButtonLoadingBg[variant ?? "primary"],
        isLoading && disabled && "pointer-events-none",
        className,
      )}
      ref={ref}
      disabled={!asChild ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={isLoading || undefined}
      type={asChild ? undefined : type}
      onClick={asChild && isDisabled ? preventActivation : onClick}
      onKeyDown={
        asChild && isDisabled ? preventKeyboardActivation : onKeyDown
      }
      onClickCapture={asChild && isDisabled ? undefined : onClickCapture}
      onKeyDownCapture={asChild && isDisabled ? undefined : onKeyDownCapture}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <span className="shrink-0 size-6" aria-hidden="true">
          {icon}
        </span>
      )}
      <Slottable>{resolvedChildren}</Slottable>
    </Comp>
  );
}

export { IconButton, iconButtonVariants };
