import type { Meta, StoryObj } from "@storybook/nextjs-vite";

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

// -- State Grid: all visual states side by side for Figma comparison --

export const StateGrid: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-[400px]">
      {/* Default */}
      <div>
        <p className="mb-2 font-semibold">Default</p>
        <InputText
          placeholder="Placeholder text"
          helperText="This is helper text"
        />
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
    </div>
  ),
};
