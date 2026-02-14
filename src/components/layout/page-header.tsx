import React from "react";
import { ArrowLeft, Menu } from "iconoir-react";

import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  level?: 1 | 2;
  heading?: string;
  showHeading?: boolean;
  scroll?: boolean;
  className?: string;

  // Level 1 specific
  tabbedView?: boolean;
  tabs?: React.ReactNode;

  // Level 2 specific
  onBackClick?: () => void;
  showMenu?: boolean;
  onMenuClick?: () => void;
  helperText?: string;
  showHelperText?: boolean;

  // Shared
  accountSettings?: React.ReactNode;
}

function PageHeader({
  level = 1,
  heading,
  showHeading = true,
  scroll = false,
  className,
  tabbedView = true,
  tabs,
  accountSettings,
  onBackClick,
  showMenu = true,
  onMenuClick,
  helperText,
  showHelperText = false,
}: PageHeaderProps) {
  const headerHeight =
    level === 1
      ? showHeading
        ? "h-[140px]"
        : "h-[80px]"
      : showHeading
        ? "h-[96px]"
        : "h-[80px]";

  return (
    <header
      role="banner"
      className={cn(
        "flex flex-col bg-[var(--colour-interface-surface-base)]",
        headerHeight,
        scroll &&
          "border-b border-b-[var(--colour-interface-border-primary-light)] shadow-[0px_4px_8px_0px_rgba(67,73,82,0.04)]",
        className,
      )}
    >
      {/* Top area: heading + account settings */}
      <div className="relative flex flex-1 items-start">
        {showHeading && heading && (
          <h1
            className={cn(
              "pl-3 self-end",
              level === 1 ? "text-heading-l" : "text-heading-m",
              "text-[color:var(--colour-interface-text-heavy)]",
            )}
          >
            {heading}
          </h1>
        )}

        {accountSettings && (
          <div className="absolute top-4 right-[54px]">{accountSettings}</div>
        )}
      </div>

      {/* Level 1: tab area */}
      {level === 1 && tabbedView && tabs && (
        <div>{tabs}</div>
      )}

      {/* Level 2: inner navigation bar */}
      {level === 2 && (
        <div className="flex h-12 items-center gap-1 pb-3 pr-12">
          {onBackClick && (
            <IconButton
              variant="ghost"
              size="xs"
              icon={<Icon icon={ArrowLeft} size="md" />}
              aria-label="Back"
              onClick={onBackClick}
            />
          )}

          <div className="ml-auto flex items-center gap-2">
            {showHelperText && helperText && (
              <span className="text-medium-m text-[color:var(--colour-interface-text-supporting)]">
                {helperText}
              </span>
            )}

            {showMenu && onMenuClick && (
              <IconButton
                variant="ghost"
                size="xs"
                icon={<Icon icon={Menu} size="md" />}
                aria-label="Menu"
                onClick={onMenuClick}
              />
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export { PageHeader };
