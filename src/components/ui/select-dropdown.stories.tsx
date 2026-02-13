import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar, Clock, MapPin, User } from "iconoir-react";

import { Icon } from "@/components/ui/icon";

import { SelectDropdown } from "./select-dropdown";
import { SelectDropdownItem } from "./select-dropdown-item";

const meta = {
  title: "UI/SelectDropdown",
  component: SelectDropdown,
  tags: ["autodocs"],
  argTypes: {
    showSearch: { control: "boolean" },
    searchPlaceholder: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default: multiple items --

export const Default: Story = {
  render: (args) => (
    <SelectDropdown {...args}>
      <SelectDropdownItem>Option one</SelectDropdownItem>
      <SelectDropdownItem>Option two</SelectDropdownItem>
      <SelectDropdownItem>Option three</SelectDropdownItem>
      <SelectDropdownItem>Option four</SelectDropdownItem>
    </SelectDropdown>
  ),
};

// -- WithSearch: search input visible --

export const WithSearch: Story = {
  render: (args) => (
    <SelectDropdown {...args} showSearch searchPlaceholder="Search options...">
      <SelectDropdownItem>Apple</SelectDropdownItem>
      <SelectDropdownItem>Banana</SelectDropdownItem>
      <SelectDropdownItem>Cherry</SelectDropdownItem>
      <SelectDropdownItem>Date</SelectDropdownItem>
    </SelectDropdown>
  ),
};

// -- WithIcons: items with leading icons --

export const WithIcons: Story = {
  render: (args) => (
    <SelectDropdown {...args}>
      <SelectDropdownItem
        leadingIcon={<Icon icon={User} color="supporting" size="sm" />}
      >
        Profile
      </SelectDropdownItem>
      <SelectDropdownItem
        leadingIcon={<Icon icon={Calendar} color="supporting" size="sm" />}
      >
        Schedule
      </SelectDropdownItem>
      <SelectDropdownItem
        leadingIcon={<Icon icon={Clock} color="supporting" size="sm" />}
      >
        History
      </SelectDropdownItem>
      <SelectDropdownItem
        leadingIcon={<Icon icon={MapPin} color="supporting" size="sm" />}
      >
        Location
      </SelectDropdownItem>
    </SelectDropdown>
  ),
};

// -- MixedStates: items in various states --

export const MixedStates: Story = {
  render: (args) => (
    <SelectDropdown {...args}>
      <SelectDropdownItem>Default item</SelectDropdownItem>
      <SelectDropdownItem state="active">Active item</SelectDropdownItem>
      <SelectDropdownItem>Another default</SelectDropdownItem>
      <SelectDropdownItem disabled>Disabled item</SelectDropdownItem>
    </SelectDropdown>
  ),
};
