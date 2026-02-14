"use client";

import type { ComponentType, SVGProps } from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

/* ─── DropdownMenu (Root) ─── */

const DropdownMenu = RadixDropdownMenu.Root;

/* ─── DropdownMenuTrigger ─── */

const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

/* ─── DropdownMenuContent ─── */

function DropdownMenuContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        sideOffset={sideOffset}
        className={cn(
          "flex flex-col min-w-[120px] overflow-clip rounded-[var(--number-radius-rad-modal)] shadow-[0px_1px_8px_0px_rgba(38,44,52,0.04)]",
          className,
        )}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  );
}

/* ─── DropdownMenuItem ─── */

interface DropdownMenuItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>,
    "asChild"
  > {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

function DropdownMenuItem({
  icon,
  children,
  className,
  ...props
}: DropdownMenuItemProps) {
  // Strip asChild at runtime to prevent Radix Slot crash when passed via JS spread.
  // TypeScript already omits it from DropdownMenuItemProps, but JS callers can still sneak it in.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { asChild, ...safeProps } = props as Record<string, unknown>;
  return (
    <RadixDropdownMenu.Item
      className={cn(
        "flex items-center h-[40px] w-full cursor-pointer transition-colors",
        "gap-[var(--number-spacing-gap-gap-s)]",
        "pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-m)]",
        "text-medium-s text-[color:var(--colour-interface-text-default)]",
        "bg-[var(--colour-interface-background-secondary-default)]",
        "hover:bg-[var(--colour-interface-background-secondary-hover)]",
        "data-[highlighted]:bg-[var(--colour-interface-background-secondary-hover)]",
        "focus-visible:bg-[var(--colour-interface-background-secondary-focus)] focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-[var(--colour-interface-border-primary-focus)]",
        "active:bg-[var(--colour-interface-background-secondary-active)]",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:cursor-default",
        "outline-none",
        className,
      )}
      {...(safeProps as Omit<typeof props, "asChild">)}
    >
      {icon && <Icon icon={icon} size="md" />}
      {children}
    </RadixDropdownMenu.Item>
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
