"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import {
  HomeSimpleDoor,
  Tv,
  Calendar,
  Group,
  UserSquare,
  Wrench,
} from "iconoir-react";

import { cn } from "@/lib/utils";
import { NavbarItem } from "@/components/ui/navbar-item";
import { MediaPlansLogo } from "@/components/ui/mediaplans-logo";
import {
  HomeSimpleDoorSolid,
  TvSolid,
  CalendarSolid,
  GroupSolid,
  UserSquareSolid,
  WrenchSolid,
} from "@/components/ui/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type NavItemId =
  | "home"
  | "shows"
  | "calendar"
  | "team"
  | "guests"
  | "manage";

interface NavItemConfig {
  id: NavItemId;
  label: string;
  icon: IconComponent;
  activeIcon: IconComponent;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: "home", label: "Home", icon: HomeSimpleDoor, activeIcon: HomeSimpleDoorSolid },
  { id: "shows", label: "Shows", icon: Tv, activeIcon: TvSolid },
  { id: "calendar", label: "Calendar", icon: Calendar, activeIcon: CalendarSolid },
  { id: "team", label: "Team", icon: Group, activeIcon: GroupSolid },
  { id: "guests", label: "Guests", icon: UserSquare, activeIcon: UserSquareSolid },
  { id: "manage", label: "Manage", icon: Wrench, activeIcon: WrenchSolid },
];

export interface SideNavbarProps {
  defaultCollapsed?: boolean;
  activeItem?: NavItemId;
  onItemClick?: (item: NavItemId) => void;
  onToggle?: (collapsed: boolean) => void;
  className?: string;
}

export function SideNavbar({
  defaultCollapsed = false,
  activeItem = "home",
  onItemClick,
  onToggle,
  className,
}: SideNavbarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handleToggle = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    onToggle?.(next);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "flex h-full shrink-0 flex-col bg-[var(--colour-interface-surface-base)]",
        "px-[12px] pt-[32px] pb-[60px]",
        "transition-[width,border-color,box-shadow] duration-200 ease-in-out motion-reduce:duration-0 overflow-hidden",
        "border-r",
        isCollapsed
          ? "w-[120px] border-transparent shadow-[1px_0px_10px_0px_rgba(38,44,52,0)]"
          : [
              "w-[228px]",
              "border-[var(--colour-interface-border-primary-light)]",
              "shadow-[1px_0px_10px_0px_rgba(38,44,52,0.08)]",
            ],
        className,
      )}
    >
      <div className={cn("flex items-center", isCollapsed ? "justify-center" : "pl-[8px]")}>
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex items-center cursor-pointer p-0",
            "rounded-[var(--number-radius-rad-button)]",
            "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--colour-interface-border-primary-focus)]",
            !isCollapsed && "gap-[12px]",
          )}
        >
          <MediaPlansLogo className="shrink-0" />
          <span
            className={cn(
              "text-semibold-l text-[color:var(--colour-interface-text-heavy)]",
              "transition-opacity duration-150 motion-reduce:duration-0 whitespace-nowrap",
              isCollapsed ? "opacity-0" : "opacity-100",
            )}
            aria-hidden={isCollapsed || undefined}
          >
            MediaPlans
          </span>
        </button>
      </div>

      <div className={cn("flex flex-col gap-[16px] mt-[80px]", isCollapsed && "items-center")}>
        {NAV_ITEMS.map((item) => (
          <NavbarItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            activeIcon={item.activeIcon}
            active={activeItem === item.id}
            collapsed={isCollapsed}
            onClick={() => onItemClick?.(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}
