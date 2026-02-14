"use client";

import type { ComponentType, SVGProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const filterTagVariants = cva(
  [
    "group inline-flex items-center justify-center",
    "h-9 min-w-16",
    "px-[var(--number-spacing-padding-pad-m)]",
    "gap-[var(--number-spacing-gap-gap-xs)]",
    "rounded-[var(--number-radius-rad-button)]",
    "text-semibold-s",
    "transition-colors cursor-pointer",
    "focus-visible:outline-none",
    "aria-disabled:opacity-50 aria-disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      selected: {
        false: [
          "bg-[var(--colour-interface-surface-base)]",
          "border-2 border-[var(--colour-interface-border-primary-light)]",
          "text-[color:var(--colour-interface-text-supporting)]",
          "hover:bg-[var(--colour-interface-background-secondary-hover)]",
          "active:bg-[var(--colour-interface-background-secondary-active)]",
          "active:text-[color:var(--colour-interface-text-default)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--colour-interface-border-primary-focus)]",
        ].join(" "),
        true: [
          "bg-[var(--colour-interface-background-inverse-default)]",
          "border-2 border-transparent",
          "text-[color:var(--colour-interface-text-onHeavy)]",
        ].join(" "),
      },
    },
    defaultVariants: { selected: false },
  },
);

export interface FilterTagProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "children"
    >,
    VariantProps<typeof filterTagVariants> {
  children: string;
  selected?: boolean;
  disabled?: boolean;
  leadingIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  trailingIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

function FilterTag({
  children,
  selected = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  className,
  onClick,
  ref,
  ...props
}: FilterTagProps) {
  const iconColor = selected ? "onHeavy" : "supporting";

  return (
    <button
      ref={ref}
      type="button"
      className={cn(filterTagVariants({ selected }), className)}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {leadingIcon && (
        <Icon icon={leadingIcon} color={iconColor} size="sm" />
      )}
      {children}
      {trailingIcon && (
        <Icon icon={trailingIcon} color={iconColor} size="sm" />
      )}
    </button>
  );
}

export { FilterTag, filterTagVariants };
