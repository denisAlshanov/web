import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar, Search, WarningCircle } from "iconoir-react";

import { Icon } from "@/components/ui/icon";

import { InputText } from "./input-text";

const meta = {
  title: "UI/InputText",
  component: InputText,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "text" },
    disabled: { control: "boolean" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  args: {
    placeholder: "Placeholder text",
  },
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default --

export const Default: Story = {};

// -- With Helper Text --

export const WithHelperText: Story = {
  args: { helperText: "This is helper text" },
};

// -- With Error --

export const WithError: Story = {
  args: { error: "This field is required" },
};

// -- Disabled --

export const Disabled: Story = {
  args: { disabled: true },
};

// -- Filled --

export const Filled: Story = {
  args: { defaultValue: "Filled input value" },
};

// -- Disabled With Helper --

export const DisabledWithHelper: Story = {
  args: {
    disabled: true,
    helperText: "This is helper text",
    defaultValue: "Disabled with helper",
  },
};

// -- With Leading Icon --

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <Icon icon={Search} size="sm" color="supporting" />,
    helperText: "Search for items",
  },
};

// -- With Trailing Icon --

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <Icon icon={Calendar} size="sm" color="supporting" />,
    helperText: "Select a date",
  },
};

// -- With Both Icons --

export const WithBothIcons: Story = {
  args: {
    leadingIcon: <Icon icon={Search} size="sm" color="supporting" />,
    trailingIcon: <Icon icon={WarningCircle} size="sm" color="supporting" />,
    helperText: "Search with validation",
  },
};

// -- State Grid: all visual states side by side for Figma comparison --

export const StateGrid: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-[400px]">
      {/* Default */}
      <div>
        <p className="mb-2 font-semibold">Default</p>
        <InputText placeholder="Placeholder text" />
      </div>

      {/* Filled */}
      <div>
        <p className="mb-2 font-semibold">Filled</p>
        <InputText
          defaultValue="Filled input value"
          helperText="This is helper text"
        />
      </div>

      {/* With Helper Text */}
      <div>
        <p className="mb-2 font-semibold">With Helper Text</p>
        <InputText
          placeholder="Placeholder text"
          helperText="This is helper text"
        />
      </div>

      {/* Error */}
      <div>
        <p className="mb-2 font-semibold">Error</p>
        <InputText
          placeholder="Placeholder text"
          error="This field is required"
        />
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-2 font-semibold">Disabled</p>
        <InputText
          placeholder="Placeholder text"
          disabled
          helperText="This is helper text"
        />
      </div>

      {/* Disabled Filled */}
      <div>
        <p className="mb-2 font-semibold">Disabled Filled</p>
        <InputText
          defaultValue="Disabled filled"
          disabled
          helperText="This is helper text"
        />
      </div>

      {/* With Leading Icon */}
      <div>
        <p className="mb-2 font-semibold">With Leading Icon</p>
        <InputText
          placeholder="Search..."
          leadingIcon={<Icon icon={Search} size="sm" color="supporting" />}
          helperText="This is helper text"
        />
      </div>

      {/* With Trailing Icon */}
      <div>
        <p className="mb-2 font-semibold">With Trailing Icon</p>
        <InputText
          placeholder="Select date"
          trailingIcon={<Icon icon={Calendar} size="sm" color="supporting" />}
          helperText="This is helper text"
        />
      </div>

      {/* With Both Icons */}
      <div>
        <p className="mb-2 font-semibold">With Both Icons</p>
        <InputText
          placeholder="Search..."
          leadingIcon={<Icon icon={Search} size="sm" color="supporting" />}
          trailingIcon={
            <Icon icon={WarningCircle} size="sm" color="supporting" />
          }
          helperText="This is helper text"
        />
      </div>

      {/* With Icons - Disabled */}
      <div>
        <p className="mb-2 font-semibold">With Icons - Disabled</p>
        <InputText
          placeholder="Search..."
          leadingIcon={<Icon icon={Search} size="sm" color="supporting" />}
          trailingIcon={<Icon icon={Calendar} size="sm" color="supporting" />}
          disabled
          helperText="This is helper text"
        />
      </div>

      {/* With Icons - Error */}
      <div>
        <p className="mb-2 font-semibold">With Icons - Error</p>
        <InputText
          placeholder="Search..."
          leadingIcon={<Icon icon={Search} size="sm" color="supporting" />}
          trailingIcon={
            <Icon icon={WarningCircle} size="sm" color="supporting" />
          }
          error="This field is required"
        />
      </div>
    </div>
  ),
};
