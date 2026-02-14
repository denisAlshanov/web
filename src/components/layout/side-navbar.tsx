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
  activeItem?: NavItemId;
  onItemClick?: (item: NavItemId) => void;
  className?: string;
}

export function SideNavbar({
  activeItem = "home",
  onItemClick,
  className,
}: SideNavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={cn(
        "absolute top-0 left-0 bottom-0 z-50",
        "flex h-full shrink-0 flex-col bg-[var(--colour-interface-surface-base)]",
        "pt-[32px] pb-[60px]",
        "transition-[width,border-color,box-shadow] duration-200 ease-in-out motion-reduce:duration-0 overflow-hidden",
        "border-r",
        isExpanded
          ? [
              "w-[228px] px-[12px]",
              "border-[var(--colour-interface-border-primary-light)]",
              "shadow-[1px_0px_10px_0px_rgba(38,44,52,0.08)]",
            ]
          : "w-[60px] px-[2px] border-transparent shadow-[1px_0px_10px_0px_rgba(38,44,52,0)]",
        className,
      )}
    >
      <div className={cn("flex items-center", isExpanded ? "pl-[8px]" : "justify-center")}>
        <div
          className={cn(
            "flex items-center",
            "rounded-[var(--number-radius-rad-button)]",
            isExpanded && "gap-[12px]",
          )}
        >
          <MediaPlansLogo className="shrink-0" />
          <span
            className={cn(
              "text-semibold-l text-[color:var(--colour-interface-text-heavy)]",
              "transition-opacity duration-150 motion-reduce:duration-0 whitespace-nowrap",
              isExpanded ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={!isExpanded || undefined}
          >
            MediaPlans
          </span>
        </div>
      </div>

      <div className={cn("flex flex-col gap-[16px] mt-[80px]", !isExpanded && "items-center")}>
        {NAV_ITEMS.map((item) => (
          <NavbarItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            activeIcon={item.activeIcon}
            active={activeItem === item.id}
            collapsed={!isExpanded}
            onClick={() => onItemClick?.(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}
