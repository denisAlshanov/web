import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar, Search } from "iconoir-react";

import { Icon } from "@/components/ui/icon";

import { Select } from "./select";
import { SelectDropdown } from "./select-dropdown";
import { SelectDropdownItem } from "./select-dropdown-item";

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "text" },
    disabled: { control: "boolean" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
    leadingIcon: { control: false },
    open: { control: "boolean" },
  },
  args: {
    placeholder: "Select an option",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const dropdownItems = (
  <SelectDropdown>
    <SelectDropdownItem>Option one</SelectDropdownItem>
    <SelectDropdownItem>Option two</SelectDropdownItem>
    <SelectDropdownItem>Option three</SelectDropdownItem>
    <SelectDropdownItem>Option four</SelectDropdownItem>
  </SelectDropdown>
);

// -- Default --

export const Default: Story = {
  args: {
    children: dropdownItems,
  },
};

// -- With Helper Text --

export const WithHelperText: Story = {
  args: {
    helperText: "Choose one of the options",
    children: dropdownItems,
  },
};

// -- With Leading Icon --

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <Icon icon={Search} size="sm" color="supporting" />,
    helperText: "Search and select",
    children: dropdownItems,
  },
};

// -- Filled --

export const Filled: Story = {
  args: {
    value: "Option two",
    children: dropdownItems,
  },
};

// -- Error --

export const Error: Story = {
  args: {
    error: "This field is required",
    children: dropdownItems,
  },
};

// -- Disabled --

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: "This field is disabled",
    children: dropdownItems,
  },
};

// -- Open --

export const Open: Story = {
  args: {
    open: true,
    children: (
      <SelectDropdown>
        <SelectDropdownItem>Option one</SelectDropdownItem>
        <SelectDropdownItem state="active">Option two</SelectDropdownItem>
        <SelectDropdownItem>Option three</SelectDropdownItem>
        <SelectDropdownItem>Option four</SelectDropdownItem>
      </SelectDropdown>
    ),
  },
};

// -- State Grid: all visual states side by side for Figma comparison --

export const StateGrid: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-[400px]">
      {/* Default */}
      <div>
        <p className="mb-2 font-semibold">Default</p>
        <Select placeholder="Select an option">{dropdownItems}</Select>
      </div>

      {/* With Helper Text */}
      <div>
        <p className="mb-2 font-semibold">With Helper Text</p>
        <Select placeholder="Select an option" helperText="Choose one option">
          {dropdownItems}
        </Select>
      </div>

      {/* With Leading Icon */}
      <div>
        <p className="mb-2 font-semibold">With Leading Icon</p>
        <Select
          placeholder="Select an option"
          leadingIcon={<Icon icon={Calendar} size="sm" color="supporting" />}
          helperText="Pick a date"
        >
          {dropdownItems}
        </Select>
      </div>

      {/* Filled */}
      <div>
        <p className="mb-2 font-semibold">Filled</p>
        <Select value="Option two" helperText="Selection made">
          {dropdownItems}
        </Select>
      </div>

      {/* Error */}
      <div>
        <p className="mb-2 font-semibold">Error</p>
        <Select
          placeholder="Select an option"
          error="This field is required"
        >
          {dropdownItems}
        </Select>
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-2 font-semibold">Disabled</p>
        <Select
          placeholder="Select an option"
          disabled
          helperText="This field is disabled"
        >
          {dropdownItems}
        </Select>
      </div>

      {/* Disabled Filled */}
      <div>
        <p className="mb-2 font-semibold">Disabled Filled</p>
        <Select
          value="Option two"
          disabled
          helperText="This field is disabled"
        >
          {dropdownItems}
        </Select>
      </div>

      {/* Open */}
      <div style={{ marginBottom: 220 }}>
        <p className="mb-2 font-semibold">Open</p>
        <Select placeholder="Select an option" open>
          <SelectDropdown>
            <SelectDropdownItem>Option one</SelectDropdownItem>
            <SelectDropdownItem state="active">Option two</SelectDropdownItem>
            <SelectDropdownItem>Option three</SelectDropdownItem>
            <SelectDropdownItem>Option four</SelectDropdownItem>
          </SelectDropdown>
        </Select>
      </div>
    </div>
  ),
};
