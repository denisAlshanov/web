"use client";

import type { ReactNode, Ref } from "react";
import { Search } from "iconoir-react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

export interface SelectDropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

function SelectDropdown({
  showSearch = false,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  children,
  className,
  ref,
  ...props
}: SelectDropdownProps) {
  return (
    <div
      ref={ref}
      role="listbox"
      className={cn(
        "flex flex-col",
        "bg-[var(--colour-interface-surface-base)]",
        "rounded-[var(--number-radius-rad-input)]",
        "shadow-[0px_1px_8px_rgba(38,44,52,0.04)]",
        "overflow-clip",
        className,
      )}
      {...props}
    >
      {showSearch && (
        <div
          className={cn(
            "flex flex-row items-center",
            "gap-[var(--number-spacing-gap-gap-s)]",
            "px-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-s)]",
            "border-b border-solid border-[var(--colour-interface-form-border-default)]",
          )}
        >
          <Icon icon={Search} color="supporting" size="sm" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className={cn(
              "flex-1 min-w-0 bg-transparent border-none outline-none",
              "text-medium-m",
              "placeholder:text-[color:var(--colour-interface-text-placeholder)]",
              "text-[color:var(--colour-interface-text-heavy)]",
            )}
          />
        </div>
      )}
      <div role="group" className="flex flex-col">
        {children}
      </div>
    </div>
  );
}

export { SelectDropdown };
