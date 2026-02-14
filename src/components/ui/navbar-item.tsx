"use client";

import type { ComponentType, SVGProps } from "react";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const navbarItemVariants = cva(
  [
    "flex items-center",
    "h-[56px]",
    "rounded-[var(--number-radius-rad-button)]",
    "px-[var(--number-spacing-padding-pad-l)]",
    "py-[var(--number-spacing-padding-pad-m)]",
    "gap-[var(--number-spacing-gap-gap-m)]",
    "transition-colors cursor-pointer",
    "bg-[var(--colour-interface-background-singleTone-default)]",
    "focus-visible:outline-none",
    "focus-visible:bg-[var(--colour-interface-background-singleTone-focus)]",
    "focus-visible:ring-3",
    "focus-visible:ring-[var(--colour-interface-border-primary-focus)]",
  ].join(" "),
  {
    variants: {
      collapsed: {
        true: "justify-center w-[56px] px-0",
        false: "w-full",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
);

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type NavbarItemBaseProps = VariantProps<typeof navbarItemVariants> & {
  label: string;
  icon: IconComponent;
  activeIcon: IconComponent;
  active?: boolean;
  collapsed?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
};

export type NavbarItemProps = NavbarItemBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NavbarItemBaseProps> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof NavbarItemBaseProps>;

export function NavbarItem({
  label,
  icon,
  activeIcon,
  active = false,
  collapsed = false,
  href,
  asChild = false,
  className,
  children,
  ...props
}: NavbarItemProps) {
  const CurrentIcon = active ? activeIcon : icon;

  const content = (
    <>
      <Icon
        icon={CurrentIcon}
        color={active ? "heavy" : "default"}
        size="md"
      />
      <span
        className={cn(
          active
            ? "text-semibold-m text-[color:var(--colour-interface-text-heavy)]"
            : "text-medium-m text-[color:var(--colour-interface-text-default)]",
          collapsed && "sr-only",
        )}
      >
        {label}
      </span>
    </>
  );

  const sharedProps = {
    ...props,
    href,
    type: !asChild && !href ? ("button" as const) : undefined,
    "aria-current": active ? ("page" as const) : undefined,
    "aria-label": collapsed ? label : undefined,
    className: cn(
      navbarItemVariants({ collapsed }),
      active && "shadow-[0px_1px_8px_0px_rgba(38,44,52,0.04)]",
      !active && "hover:bg-[var(--colour-interface-background-singleTone-hover)]",
      className,
    ),
  };

  if (asChild && React.isValidElement(children)) {
    return (
      <Slot {...sharedProps}>
        {React.cloneElement(
          children as React.ReactElement<{ children?: React.ReactNode }>,
          undefined,
          content,
        )}
      </Slot>
    );
  }

  const Fallback = href ? "a" : "button";
  return (
    <Fallback {...sharedProps}>
      {content}
    </Fallback>
  );
}

export { navbarItemVariants };
