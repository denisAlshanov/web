import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus } from "iconoir-react";

import { Icon } from "@/components/ui/icon";

import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "destructive",
        "error",
        "info",
        "success",
        "warning",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default --

export const Default: Story = {};

// -- Variants --

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary", children: "Tertiary" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Destructive" },
};

export const Error: Story = {
  args: { variant: "error", children: "Error" },
};

export const Info: Story = {
  args: { variant: "info", children: "Info" },
};

export const Success: Story = {
  args: { variant: "success", children: "Success" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Warning" },
};

// -- Sizes --

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Medium: Story = {
  args: { size: "md", children: "Medium" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large" },
};

// -- States --

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

export const Loading: Story = {
  args: { isLoading: true, children: "Loading" },
};

// -- Icons --

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <Icon icon={Plus} color="onHeavy" />,
    children: "Add Item",
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <Icon icon={Plus} color="onHeavy" />,
    children: "Add Item",
  },
};

export const WithBothIcons: Story = {
  args: {
    leadingIcon: <Icon icon={Plus} color="onHeavy" />,
    trailingIcon: <Icon icon={Plus} color="onHeavy" />,
    children: "Add Item",
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    variant: "secondary",
    leadingIcon: <Icon icon={Plus} color="default" />,
    children: "Add Item",
  },
};

export const TertiaryWithIcon: Story = {
  args: {
    variant: "tertiary",
    leadingIcon: <Icon icon={Plus} color="default" />,
    children: "Add Item",
  },
};

// -- Shared constants for grid stories --

const variants = [
  "primary",
  "secondary",
  "tertiary",
  "destructive",
  "error",
  "info",
  "success",
  "warning",
] as const;

const sizes = ["sm", "md", "lg"] as const;

// -- Icon Size Grid: all sizes × icon positions for visual comparison with Figma --

export const IconSizeGrid: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {sizes.map((size) => (
        <div key={size}>
          <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
            Size: {size}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Button
              size={size}
              leadingIcon={<Icon icon={Plus} color="onHeavy" />}
            >
              Leading
            </Button>
            <Button
              size={size}
              trailingIcon={<Icon icon={Plus} color="onHeavy" />}
            >
              Trailing
            </Button>
            <Button
              size={size}
              leadingIcon={<Icon icon={Plus} color="onHeavy" />}
              trailingIcon={<Icon icon={Plus} color="onHeavy" />}
            >
              Both
            </Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

// -- State Grid: all variants at all sizes --

export const StateGrid: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* All variants at default size */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>All Variants</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              Button
            </Button>
          ))}
        </div>
      </div>

      {/* All sizes */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>All Sizes</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {sizes.map((size) => (
            <Button key={size} size={size}>
              Button
            </Button>
          ))}
        </div>
      </div>

      {/* Disabled variants */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Disabled Variants
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              Button
            </Button>
          ))}
        </div>
      </div>

      {/* Loading variants */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Loading Variants
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} isLoading>
              Button
            </Button>
          ))}
        </div>
      </div>

      {/* With icons */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>With Icons</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <Button leadingIcon={<Icon icon={Plus} color="onHeavy" />}>
            Button
          </Button>
          <Button trailingIcon={<Icon icon={Plus} color="onHeavy" />}>
            Button
          </Button>
          <Button
            leadingIcon={<Icon icon={Plus} color="onHeavy" />}
            trailingIcon={<Icon icon={Plus} color="onHeavy" />}
          >
            Button
          </Button>
          <Button
            variant="destructive"
            leadingIcon={<Icon icon={Plus} color="onHeavy" />}
          >
            Button
          </Button>
        </div>
      </div>
    </div>
  ),
};
