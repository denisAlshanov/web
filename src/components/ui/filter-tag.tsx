"use client";

import type { ComponentType, SVGProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, EditPencil, Trash } from "iconoir-react";

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
  editable?: boolean;
  editing?: boolean;
  leadingIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  trailingIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  onEdit?: () => void;
  onDelete?: () => void;
  onConfirm?: () => void;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

function FilterTag({
  children,
  selected = false,
  disabled = false,
  editable = false,
  editing = false,
  leadingIcon,
  trailingIcon,
  onEdit,
  onDelete,
  onConfirm,
  className,
  onClick,
  ref,
  ...props
}: FilterTagProps) {
  const iconColor = selected ? "onHeavy" : editing ? "default" : "supporting";

  const showActionButtons = editable && !selected && !disabled && !editing;
  const showConfirmButton = editable && editing && !selected && !disabled;

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        filterTagVariants({ selected }),
        editing &&
          !selected &&
          "border-[var(--colour-interface-border-primary-medium)] text-[color:var(--colour-interface-text-default)]",
        className,
      )}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {leadingIcon && (
        <Icon icon={leadingIcon} color={iconColor} size="sm" />
      )}
      {children}
      {trailingIcon && !showActionButtons && !showConfirmButton && (
        <Icon icon={trailingIcon} color={iconColor} size="sm" />
      )}
      {showActionButtons && (
        <span className="hidden gap-[var(--number-spacing-gap-gap-xs)] group-hover:flex group-focus-visible:flex">
          <span
            role="button"
            aria-label="Edit"
            tabIndex={-1}
            className="inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-[var(--colour-interface-background-secondary-hover)]"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onEdit?.();
              }
            }}
          >
            <Icon icon={EditPencil} color="supporting" size="sm" />
          </span>
          <span
            role="button"
            aria-label="Delete"
            tabIndex={-1}
            className="inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-[var(--colour-interface-background-secondary-hover)]"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onDelete?.();
              }
            }}
          >
            <Icon icon={Trash} color="supporting" size="sm" />
          </span>
        </span>
      )}
      {showConfirmButton && (
        <span
          role="button"
          aria-label="Confirm"
          tabIndex={-1}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-[var(--colour-interface-background-secondary-hover)]"
          onClick={(e) => {
            e.stopPropagation();
            onConfirm?.();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              onConfirm?.();
            }
          }}
        >
          <Icon icon={Check} color="default" size="sm" />
        </span>
      )}
    </button>
  );
}

export { FilterTag, filterTagVariants };
