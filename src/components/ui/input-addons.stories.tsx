import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InputAddons } from "./input-addons";

const meta = {
  title: "UI/InputAddons",
  component: InputAddons,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "text" },
    disabled: { control: "boolean" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
    leadAddon: { control: "text" },
    trailAddon: { control: "text" },
  },
  args: {
    placeholder: "Placeholder text",
    leadAddon: "https://",
    trailAddon: ".io",
  },
} satisfies Meta<typeof InputAddons>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default --

export const Default: Story = {};

// -- Lead Addon Only --

export const LeadAddonOnly: Story = {
  args: { leadAddon: "https://", trailAddon: undefined },
};

// -- Trail Addon Only --

export const TrailAddonOnly: Story = {
  args: { leadAddon: undefined, trailAddon: ".com" },
};

// -- No Addons --

export const NoAddons: Story = {
  args: { leadAddon: undefined, trailAddon: undefined },
};

// -- Filled --

export const Filled: Story = {
  args: { defaultValue: "my-website" },
};

// -- With Error --

export const WithError: Story = {
  args: { error: "This URL is already taken" },
};

// -- With Helper Text --

export const WithHelperText: Story = {
  args: { helperText: "Enter your website address" },
};

// -- Disabled --

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "my-website" },
};

// -- State Grid: all visual states side by side for Figma comparison --

export const StateGrid: Story = {
  args: { leadAddon: undefined, trailAddon: undefined },
  render: () => (
    <div className="flex flex-col gap-6 max-w-[500px]">
      {/* Default */}
      <div>
        <p className="mb-2 font-semibold">Default</p>
        <InputAddons
          leadAddon="https://"
          trailAddon=".io"
          placeholder="Placeholder text"
        />
      </div>

      {/* Filled */}
      <div>
        <p className="mb-2 font-semibold">Filled</p>
        <InputAddons
          leadAddon="https://"
          trailAddon=".io"
          defaultValue="my-website"
          helperText="Enter your website address"
        />
      </div>

      {/* With Helper Text */}
      <div>
        <p className="mb-2 font-semibold">With Helper Text</p>
        <InputAddons
          leadAddon="https://"
          trailAddon=".io"
          placeholder="Placeholder text"
          helperText="Enter your website address"
        />
      </div>

      {/* Error */}
      <div>
        <p className="mb-2 font-semibold">Error</p>
        <InputAddons
          leadAddon="https://"
          trailAddon=".io"
          placeholder="Placeholder text"
          error="This URL is already taken"
        />
      </div>

      {/* Disabled */}
      <div>
        <p className="mb-2 font-semibold">Disabled</p>
        <InputAddons
          leadAddon="https://"
          trailAddon=".io"
          placeholder="Placeholder text"
          disabled
          helperText="Enter your website address"
        />
      </div>

      {/* Disabled Filled */}
      <div>
        <p className="mb-2 font-semibold">Disabled Filled</p>
        <InputAddons
          leadAddon="https://"
          trailAddon=".io"
          defaultValue="my-website"
          disabled
          helperText="Enter your website address"
        />
      </div>

      {/* Lead Addon Only */}
      <div>
        <p className="mb-2 font-semibold">Lead Addon Only</p>
        <InputAddons
          leadAddon="https://"
          placeholder="Enter URL"
          helperText="Enter your website address"
        />
      </div>

      {/* Trail Addon Only */}
      <div>
        <p className="mb-2 font-semibold">Trail Addon Only</p>
        <InputAddons
          trailAddon=".com"
          placeholder="Enter domain"
          helperText="Enter your domain name"
        />
      </div>

      {/* No Addons */}
      <div>
        <p className="mb-2 font-semibold">No Addons</p>
        <InputAddons
          placeholder="Plain input"
          helperText="No addons provided"
        />
      </div>

      {/* Error with Lead Addon Only */}
      <div>
        <p className="mb-2 font-semibold">Error - Lead Addon Only</p>
        <InputAddons
          leadAddon="$"
          placeholder="0.00"
          error="Invalid amount"
        />
      </div>

      {/* Error with Trail Addon Only */}
      <div>
        <p className="mb-2 font-semibold">Error - Trail Addon Only</p>
        <InputAddons
          trailAddon="@gmail.com"
          placeholder="username"
          error="Username is taken"
        />
      </div>
    </div>
  ),
};
