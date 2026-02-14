"use client";

import type { ComponentType, SVGProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

// ---------------------------------------------------------------------------
// AccountSettingsItem
// ---------------------------------------------------------------------------

const accountSettingsItemVariants = cva(
  [
    "flex items-center",
    "gap-[var(--number-spacing-gap-gap-s)]",
    "pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-m)]",
    "rounded-[var(--number-radius-rad-inner-card)]",
    "text-medium-m cursor-pointer transition-colors",
    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--colour-interface-border-primary-focus)]",
  ].join(" "),
  {
    variants: {
      style: {
        default: [
          "bg-[var(--colour-interface-background-singletone-default)]",
          "hover:bg-[var(--colour-interface-background-singletone-hover)]",
          "focus-visible:bg-[var(--colour-interface-background-singletone-focus)]",
          "active:bg-[var(--colour-interface-background-singletone-active)]",
          "text-[color:var(--colour-interface-text-default)]",
        ].join(" "),
        danger: [
          "bg-[var(--colour-interface-background-semantic-danger-default)]",
          "hover:bg-[var(--colour-interface-background-semantic-danger-hover)]",
          "focus-visible:bg-[var(--colour-interface-background-semantic-danger-focus)]",
          "active:bg-[var(--colour-interface-background-semantic-danger-active)]",
          "text-[color:var(--colour-interface-text-semantic-danger)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      style: "default",
    },
  },
);

interface AccountSettingsItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accountSettingsItemVariants> {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

function AccountSettingsItem({
  icon,
  style,
  className,
  children,
  ...props
}: AccountSettingsItemProps) {
  const iconColor = style === "danger" ? "danger" : "default";

  return (
    <button
      type="button"
      className={cn(accountSettingsItemVariants({ style }), className)}
      {...props}
    >
      <Icon icon={icon} color={iconColor} size="md" />
      {children}
    </button>
  );
}

export { AccountSettingsItem, accountSettingsItemVariants };
