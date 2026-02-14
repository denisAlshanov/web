"use client";

import type { ComponentType, SVGProps } from "react";
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
  collapsed?: boolean;
  activeItem?: NavItemId;
  onItemClick?: (item: NavItemId) => void;
  className?: string;
}

export function SideNavbar({
  collapsed = false,
  activeItem = "home",
  onItemClick,
  className,
}: SideNavbarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "flex h-full shrink-0 flex-col bg-[var(--colour-interface-surface-base)]",
        "px-[12px] pt-[32px] pb-[60px]",
        collapsed ? "w-[120px]" : [
          "w-[228px]",
          "border-r border-[var(--colour-interface-border-primary-light)]",
          "shadow-[1px_0px_10px_0px_rgba(38,44,52,0.08)]",
        ],
        className,
      )}
    >
      <div className={cn("flex items-center", collapsed ? "justify-center" : "pl-[8px] gap-[12px]")}>
        <MediaPlansLogo />
        {!collapsed && (
          <span className="text-semibold-l text-[color:var(--colour-interface-text-heavy)]">
            MediaPlans
          </span>
        )}
      </div>

      <div className={cn("flex flex-col gap-[16px] mt-[80px]", collapsed && "items-center")}>
        {NAV_ITEMS.map((item) => (
          <NavbarItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            activeIcon={item.activeIcon}
            active={activeItem === item.id}
            collapsed={collapsed}
            onClick={() => onItemClick?.(item.id)}
          />
        ))}
      </div>
    </nav>
  );
}
