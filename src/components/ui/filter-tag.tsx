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
    "transition-colors cursor-pointer disabled:cursor-default",
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

function ActionButton({
  label,
  icon,
  iconColor,
  onClick,
}: {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconColor: "supporting" | "default";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-[var(--colour-interface-background-secondary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--colour-interface-border-primary-focus)]"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <Icon icon={icon} color={iconColor} size="sm" />
    </button>
  );
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
  const isEditing = editable && editing;
  const iconColor = selected ? "onHeavy" : isEditing ? "default" : "supporting";

  const showActionButtons = editable && !selected && !disabled && !isEditing;
  const showConfirmButton = isEditing && !selected && !disabled;
  const hasActions = showActionButtons || showConfirmButton;

  if (hasActions) {
    return (
      <div
        className={cn(
          filterTagVariants({ selected }),
          "px-0",
          !selected &&
            "focus-within:ring-2 focus-within:ring-[var(--colour-interface-border-primary-focus)]",
          isEditing &&
            !selected &&
            "border-[var(--colour-interface-border-primary-medium)] text-[color:var(--colour-interface-text-default)] hover:bg-[var(--colour-interface-surface-base)] active:bg-[var(--colour-interface-surface-base)] active:text-[color:var(--colour-interface-text-default)]",
          editable &&
            !selected &&
            !isEditing &&
            "hover:bg-[var(--colour-interface-surface-base)] active:bg-[var(--colour-interface-surface-base)] active:text-[color:var(--colour-interface-text-supporting)]",
          className,
        )}
        role="group"
        aria-label={children}
        aria-disabled={disabled || undefined}
      >
        <button
          {...props}
          ref={ref}
          type="button"
          className="inline-flex flex-1 min-w-0 h-full items-center gap-[var(--number-spacing-gap-gap-xs)] px-[var(--number-spacing-padding-pad-m)] focus-visible:outline-none"
          disabled={disabled}
          aria-pressed={selected}
          onClick={disabled ? undefined : onClick}
        >
          {leadingIcon && (
            <Icon icon={leadingIcon} color={iconColor} size="sm" />
          )}
          {children}
        </button>
        {showActionButtons && (
          <span className="invisible flex gap-[var(--number-spacing-gap-gap-xs)] pr-[var(--number-spacing-padding-pad-m)] group-hover:visible group-focus-within:visible">
            <ActionButton label="Edit" icon={EditPencil} iconColor="supporting" onClick={onEdit} />
            <ActionButton label="Delete" icon={Trash} iconColor="supporting" onClick={onDelete} />
          </span>
        )}
        {showConfirmButton && (
          <span className="pr-[var(--number-spacing-padding-pad-m)]">
            <ActionButton label="Confirm" icon={Check} iconColor="default" onClick={onConfirm} />
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      className={cn(
        filterTagVariants({ selected }),
        "focus-visible:outline-none",
        className,
      )}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-pressed={selected}
      onClick={disabled ? undefined : onClick}
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
