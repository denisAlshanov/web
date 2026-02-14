import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SideNavbar } from "./side-navbar";

const meta = {
  title: "Layout/SideNavbar",
  component: SideNavbar,
  tags: ["autodocs"],
  argTypes: {
    collapsed: { control: "boolean" },
    activeItem: {
      control: "select",
      options: ["home", "shows", "calendar", "team", "guests", "manage"],
    },
  },
  args: {
    collapsed: false,
    activeItem: "home",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SideNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default (Expanded) --

export const Expanded: Story = {};

// -- Collapsed --

export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
};

// -- Expanded with Shows Active --

export const ExpandedShowsActive: Story = {
  args: {
    activeItem: "shows",
  },
};

// -- Side by Side Comparison --

export const SideBySide: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, height: "100vh" }}>
      <SideNavbar activeItem="home" />
      <SideNavbar collapsed activeItem="home" />
    </div>
  ),
};
