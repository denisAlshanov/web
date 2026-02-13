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

const tagButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "rounded-full size-6",
    "transition-colors cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colour-interface-button-border-focus-default)]",
    "aria-disabled:opacity-50 aria-disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-transparent",
          "text-[color:var(--colour-interface-button-icon-secondary)]",
          "hover:bg-[var(--colour-interface-button-background-secondary-hover)]",
          "active:bg-[var(--colour-interface-button-background-secondary-active)]",
        ].join(" "),
        destructive: [
          "bg-transparent",
          "text-[color:var(--colour-interface-icon-semantic-danger)]",
          "hover:bg-[var(--colour-interface-button-background-semantic-danger-hover)]",
          "active:bg-[var(--colour-interface-button-background-semantic-danger-active)]",
          "focus-visible:ring-[var(--colour-interface-button-border-focus-destructive)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type TagButtonVariant = NonNullable<
  VariantProps<typeof tagButtonVariants>["variant"]
>;

const tagButtonLoadingBg: Record<TagButtonVariant, string> = {
  default: "bg-[var(--colour-interface-button-background-secondary-active)]",
  destructive:
    "bg-[var(--colour-interface-button-background-semantic-danger-active)]",
};

export interface TagButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "aria-label"
    >,
    VariantProps<typeof tagButtonVariants> {
  icon: React.ReactNode;
  "aria-label": string;
  asChild?: boolean;
  isLoading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

function TagButton({
  className,
  variant,
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
}: TagButtonProps) {
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
        tagButtonVariants({ variant }),
        isLoading && !disabled && "!opacity-80 pointer-events-none",
        isLoading && !disabled && tagButtonLoadingBg[variant ?? "default"],
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
      <span
        className="inline-flex items-center justify-center shrink-0 size-6 [&>svg]:size-4"
        aria-hidden="true"
      >
        {icon}
      </span>
      <Slottable>{resolvedChildren}</Slottable>
    </Comp>
  );
}

export { TagButton, tagButtonVariants };
