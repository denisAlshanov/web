import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus } from "iconoir-react";

import { Icon } from "@/components/ui/icon";

import { SelectDropdownItem } from "./select-dropdown-item";

const meta = {
  title: "UI/SelectDropdownItem",
  component: SelectDropdownItem,
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hover", "focus", "active", "disabled"],
    },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div role="listbox" aria-label="Example" style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: "Option label",
  },
} satisfies Meta<typeof SelectDropdownItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- States --

export const Default: Story = {};

export const Hover: Story = {
  args: { state: "hover", children: "Hovered option" },
};

export const Focus: Story = {
  args: { state: "focus", children: "Focused option" },
};

export const Active: Story = {
  args: { state: "active", children: "Active option" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled option" },
};

// -- With Leading Icon --

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <Icon icon={Plus} color="supporting" size="sm" />,
    children: "Option with icon",
  },
};

// -- State Grid: all 5 states side by side --

const states = ["default", "hover", "focus", "active", "disabled"] as const;

export const StateGrid: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {states.map((state) => (
        <SelectDropdownItem
          key={state}
          state={state}
          disabled={state === "disabled"}
          leadingIcon={<Icon icon={Plus} color="supporting" size="sm" />}
        >
          {state.charAt(0).toUpperCase() + state.slice(1)} state
        </SelectDropdownItem>
      ))}
    </div>
  ),
};
