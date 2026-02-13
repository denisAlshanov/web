"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

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

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode;
  asChild?: boolean;
  isLoading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const EVENT_HANDLER_RE = /^on[A-Z]/;

function stripChildEventHandlers(children: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(children)) return children;
  const cleanProps = Object.fromEntries(
    Object.entries(children.props as Record<string, unknown>).filter(
      ([key]) => !EVENT_HANDLER_RE.test(key),
    ),
  );
  return React.cloneElement(children, cleanProps);
}

function preventActivation(e: React.MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
}

function preventKeyboardActivation(e: React.KeyboardEvent) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    e.stopPropagation();
  }
}

function Spinner() {
  return (
    <svg
      className="size-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
        isLoading && !disabled && "opacity-80 pointer-events-none",
        isLoading && disabled && "pointer-events-none",
        className,
      )}
      ref={ref}
      disabled={!asChild ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={isLoading || undefined}
      aria-label={restProps["aria-label"]}
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
      {asChild && resolvedChildren}
    </Comp>
  );
}

export { IconButton, iconButtonVariants };
