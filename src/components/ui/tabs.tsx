"use client";

import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

function Tabs(props: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root {...props} />;
}

const tabListStyles = [
  "flex",
  "gap-[var(--number-spacing-gap-gap-m)]",
  "pl-[var(--number-spacing-padding-pad-m)]",
  "border-b border-b-[var(--colour-interface-border-secondary-light)]",
].join(" ");

function TabList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List className={cn(tabListStyles, className)} {...props} />
  );
}

interface TabProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  leadingIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const tabStyles = [
  // Layout
  "inline-flex items-center",
  "gap-[var(--number-spacing-gap-gap-s)]",
  "pl-[var(--number-spacing-padding-pad-s)]",
  "pr-[var(--number-spacing-padding-pad-m)]",
  "py-[var(--number-spacing-padding-pad-s)]",
  // Typography
  "text-medium-s",
  // Default state
  "text-[color:var(--colour-interface-text-default)]",
  "cursor-pointer",
  "border-b-[1.8px] border-b-transparent",
  // Remove default Radix outline
  "outline-none",
  // Hover state
  "hover:border-b-[1.8px] hover:border-b-[var(--colour-interface-border-primary-light)]",
  // Focus-visible state
  "focus-visible:border-b-[1.8px] focus-visible:border-b-[var(--colour-interface-border-primary-medium)]",
  // Active state (via Radix data attribute)
  "data-[state=active]:border-b-[1.8px] data-[state=active]:border-b-[var(--colour-brandMode-primary-800)]",
  "data-[state=active]:text-[color:var(--colour-interface-text-heavy)]",
  // Preserve active border on hover, focus, and press
  "data-[state=active]:hover:border-b-[var(--colour-brandMode-primary-800)]",
  "data-[state=active]:focus-visible:border-b-[var(--colour-brandMode-primary-800)]",
  "data-[state=active]:active:border-b-[var(--colour-brandMode-primary-800)]",
  // Pressed state (CSS :active)
  "active:border-b-[var(--colour-interface-border-primary-medium)]",
  // Negative margin to overlap TabList bottom border
  "-mb-px",
  // Disabled state
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
].join(" ");

function Tab({ className, leadingIcon, children, ...props }: TabProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(leadingIcon && "group", tabStyles, className)}
      {...props}
    >
      {leadingIcon && (
        <Icon
          icon={leadingIcon}
          size="md"
          color="default"
          className="group-data-[state=active]:text-[color:var(--colour-interface-icon-heavy)]"
        />
      )}
      {children}
    </TabsPrimitive.Trigger>
  );
}

function TabContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={className} {...props} />;
}

export { Tabs, TabList, Tab, TabContent };
export type { TabProps };
