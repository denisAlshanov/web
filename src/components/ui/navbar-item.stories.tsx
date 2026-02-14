import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  HomeSimpleDoor,
  Tv,
  Group,
  UserSquare,
  Wrench,
  Calendar,
} from "iconoir-react";

import {
  HomeSimpleDoorSolid,
  TvSolid,
  GroupSolid,
  UserSquareSolid,
  WrenchSolid,
  CalendarSolid,
} from "@/components/ui/icons";

import { NavbarItem } from "./navbar-item";

const meta = {
  title: "UI/NavbarItem",
  component: NavbarItem,
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
    collapsed: { control: "boolean" },
    label: { control: "text" },
    href: { control: "text" },
  },
  args: {
    label: "Home",
    icon: HomeSimpleDoor,
    activeIcon: HomeSimpleDoorSolid,
    active: false,
    collapsed: false,
  },
} satisfies Meta<typeof NavbarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Single-item stories --

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const Collapsed: Story = {
  args: { collapsed: true },
};

export const CollapsedActive: Story = {
  args: { collapsed: true, active: true },
};

// -- All states grid (expanded) --

const navItems = [
  {
    label: "Home",
    icon: HomeSimpleDoor,
    activeIcon: HomeSimpleDoorSolid,
  },
  { label: "Shows", icon: Tv, activeIcon: TvSolid },
  { label: "Team", icon: Group, activeIcon: GroupSolid },
  {
    label: "Guests",
    icon: UserSquare,
    activeIcon: UserSquareSolid,
  },
  { label: "Manage", icon: Wrench, activeIcon: WrenchSolid },
  {
    label: "Calendar",
    icon: Calendar,
    activeIcon: CalendarSolid,
  },
] as const;

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Default</p>
        <div style={{ maxWidth: 240 }}>
          <NavbarItem
            label="Home"
            icon={HomeSimpleDoor}
            activeIcon={HomeSimpleDoorSolid}
          />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Hover (hover over to see)
        </p>
        <div style={{ maxWidth: 240 }}>
          <NavbarItem
            label="Home"
            icon={HomeSimpleDoor}
            activeIcon={HomeSimpleDoorSolid}
          />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Focus (tab to see)
        </p>
        <div style={{ maxWidth: 240 }}>
          <NavbarItem
            label="Home"
            icon={HomeSimpleDoor}
            activeIcon={HomeSimpleDoorSolid}
          />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Active</p>
        <div style={{ maxWidth: 240 }}>
          <NavbarItem
            label="Home"
            icon={HomeSimpleDoor}
            activeIcon={HomeSimpleDoorSolid}
            active
          />
        </div>
      </div>
    </div>
  ),
};

// -- All 6 nav items (expanded, active + inactive) --

export const AllItems: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 240px",
        gap: "1rem",
      }}
    >
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Inactive</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navItems.map((item) => (
            <NavbarItem key={item.label} {...item} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Active</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navItems.map((item) => (
            <NavbarItem key={item.label} {...item} active />
          ))}
        </div>
      </div>
    </div>
  ),
};

// -- All 6 nav items (collapsed, active + inactive) --

export const CollapsedAllItems: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        gap: "1rem",
        justifyContent: "start",
      }}
    >
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Inactive</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navItems.map((item) => (
            <NavbarItem key={item.label} {...item} collapsed />
          ))}
        </div>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Active</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navItems.map((item) => (
            <NavbarItem key={item.label} {...item} collapsed active />
          ))}
        </div>
      </div>
    </div>
  ),
};
