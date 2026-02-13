"use client";

import type { ReactNode, Ref } from "react";
import { Search } from "iconoir-react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

export interface SelectDropdownProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  listboxLabel?: string;
  /** Props forwarded to the inner listbox element (e.g. aria-activedescendant, onKeyDown) */
  listboxProps?: React.HTMLAttributes<HTMLDivElement>;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

function SelectDropdown({
  showSearch = false,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  listboxLabel = "Options",
  listboxProps,
  children,
  className,
  ref,
  ...props
}: SelectDropdownProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        "bg-[var(--colour-interface-surface-base)]",
        "rounded-[var(--number-radius-rad-input)]",
        "shadow-[0px_1px_8px_0px_rgba(38,44,52,0.04)]",
        "overflow-clip",
        className,
      )}
      {...props}
    >
      {showSearch && (
        <div
          className={cn(
            "flex flex-row items-center",
            "min-h-[44px]",
            "gap-[var(--number-spacing-gap-gap-s)]",
            "pl-[var(--number-spacing-padding-pad-m)] pr-[var(--number-spacing-padding-pad-l)] py-[var(--number-spacing-padding-pad-m)]",
            "bg-[var(--colour-interface-surface-base)]",
            "border-2 border-solid border-[var(--colour-interface-form-border-default)]",
            "rounded-[var(--number-radius-rad-input)]",
          )}
        >
          <Icon icon={Search} color="supporting" size="md" />
          <input
            type="text"
            aria-label={searchPlaceholder ?? "Search"}
            {...(searchValue !== undefined ? { value: searchValue } : {})}
            onChange={(e) => onSearchChange?.(e.target.value)}
            readOnly={searchValue !== undefined && !onSearchChange}
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
      {/* max-h: 6 visible items * 44px item height */}
      <div
        role="listbox"
        aria-label={listboxLabel}
        tabIndex={0}
        {...listboxProps}
        className={cn(
          "flex flex-col overflow-y-auto max-h-[264px]",
          "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--colour-interface-form-border-focus)]",
          listboxProps?.className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { SelectDropdown };
