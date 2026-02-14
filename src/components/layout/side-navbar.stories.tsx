import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SideNavbar } from "./side-navbar";

const meta = {
  title: "Layout/SideNavbar",
  component: SideNavbar,
  tags: ["autodocs"],
  argTypes: {
    activeItem: {
      control: "select",
      options: ["home", "shows", "calendar", "team", "guests", "manage"],
    },
  },
  args: {
    activeItem: "home",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", display: "flex", position: "relative" }}>
        <div style={{ width: 60, flexShrink: 0 }} />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SideNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Collapsed (default state, 60px wide) --

export const Collapsed: Story = {};

// -- Collapsed with Shows Active --

export const CollapsedShowsActive: Story = {
  args: {
    activeItem: "shows",
  },
};

// -- Hover Interaction (demonstrates hover-to-expand overlay) --

export const HoverInteraction: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "flex", height: "100vh", width: "100%" }}>
      <div style={{ width: 60, flexShrink: 0 }} />
      <SideNavbar {...args} />
      <div style={{ flex: 1, padding: 32 }}>
        <p style={{ maxWidth: 480 }}>
          Hover over the sidebar to expand it. The sidebar overlays this content
          area without pushing it — the content stays in place.
        </p>
      </div>
    </div>
  ),
  decorators: [],
};

// -- In Container: Sidebar within a bounded container --

export const InContainer: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, height: "100vh" }}>
      <div style={{ position: "relative", width: 228, border: "1px dashed #ccc" }}>
        <SideNavbar activeItem="home" />
      </div>
    </div>
  ),
  decorators: [],
};
