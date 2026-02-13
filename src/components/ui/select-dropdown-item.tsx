"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode, Ref } from "react";

import { cn } from "@/lib/utils";

const selectDropdownItemVariants = cva(
  [
    "flex flex-row items-center",
    "h-[44px]",
    "px-[var(--number-spacing-padding-pad-m)]",
    "gap-[var(--number-spacing-gap-gap-xs)]",
    "text-medium-m",
    "cursor-pointer select-none",
    "outline-none",
    "transition-colors",
  ].join(" "),
  {
    variants: {
      state: {
        default: [
          "bg-[var(--colour-interface-surface-base)]",
          "text-[color:var(--colour-interface-text-supporting)]",
          "hover:bg-[var(--colour-interface-form-surface-hover)]",
          "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--colour-interface-form-border-focus)]",
        ].join(" "),
        hover: [
          "bg-[var(--colour-interface-form-surface-hover)]",
          "text-[color:var(--colour-interface-text-supporting)]",
        ].join(" "),
        focus: [
          "bg-[var(--colour-interface-surface-base)]",
          "text-[color:var(--colour-interface-text-supporting)]",
          "ring-2 ring-inset ring-[var(--colour-interface-form-border-focus)]",
        ].join(" "),
        active: [
          "bg-[var(--colour-interface-form-surface-active)]",
          "text-[color:var(--colour-interface-text-default)]",
          "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--colour-interface-form-border-focus)]",
        ].join(" "),
        disabled: [
          "bg-[var(--colour-interface-surface-base)]",
          "text-[color:var(--colour-interface-text-supporting)]",
          "opacity-50 pointer-events-none",
        ].join(" "),
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export interface SelectDropdownItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof selectDropdownItemVariants> {
  leadingIcon?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  ref?: Ref<HTMLDivElement>;
}

function SelectDropdownItem({
  state,
  leadingIcon,
  disabled,
  selected,
  className,
  children,
  ref,
  ...props
}: SelectDropdownItemProps) {
  const isDisabled = disabled || state === "disabled";
  const resolvedState = isDisabled ? "disabled" : (state ?? "default");

  return (
    <div
      role="option"
      aria-selected={selected || undefined}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? undefined : -1}
      {...props}
      ref={ref}
      className={cn(
        selectDropdownItemVariants({ state: resolvedState }),
        className,
      )}
    >
      {leadingIcon && (
        <span className="flex shrink-0 items-center">{leadingIcon}</span>
      )}
      <span className="truncate">{children}</span>
    </div>
  );
}

export { SelectDropdownItem, selectDropdownItemVariants };
