import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus } from "iconoir-react";

import { Icon } from "@/components/ui/icon";

import { IconButton } from "./icon-button";

const meta = {
  title: "UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    icon: <Icon icon={Plus} color="onHeavy" />,
    "aria-label": "Add",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default --

export const Default: Story = {};

// -- Variants --

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: <Icon icon={Plus} color="onHeavy" />,
    "aria-label": "Add",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    icon: <Icon icon={Plus} color="default" />,
    "aria-label": "Add",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    icon: <Icon icon={Plus} color="default" />,
    "aria-label": "Add",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    icon: <Icon icon={Plus} color="default" />,
    "aria-label": "Add",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    icon: <Icon icon={Plus} color="onHeavy" />,
    "aria-label": "Add",
  },
};

// -- Sizes --

export const ExtraSmall: Story = {
  args: { size: "xs", "aria-label": "Add (extra small)" },
};

export const Small: Story = {
  args: { size: "sm", "aria-label": "Add (small)" },
};

export const Medium: Story = {
  args: { size: "md", "aria-label": "Add (medium)" },
};

export const Large: Story = {
  args: { size: "lg", "aria-label": "Add (large)" },
};

// -- States --

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "Add (disabled)" },
};

export const Loading: Story = {
  args: { isLoading: true, "aria-label": "Loading" },
};

// -- State Grid: all variants x sizes --

const variants = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "destructive",
] as const;

const sizes = ["xs", "sm", "md", "lg"] as const;

const variantIcons: Record<
  (typeof variants)[number],
  { icon: React.ReactNode; label: string }
> = {
  primary: { icon: <Icon icon={Plus} color="onHeavy" />, label: "Add" },
  secondary: {
    icon: <Icon icon={Plus} color="default" />,
    label: "Add",
  },
  tertiary: {
    icon: <Icon icon={Plus} color="default" />,
    label: "Add",
  },
  ghost: { icon: <Icon icon={Plus} color="default" />, label: "Add" },
  destructive: {
    icon: <Icon icon={Plus} color="onHeavy" />,
    label: "Add",
  },
};

export const StateGrid: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* All variants at default size */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>All Variants</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {variants.map((variant) => (
            <IconButton
              key={variant}
              variant={variant}
              icon={variantIcons[variant].icon}
              aria-label={variantIcons[variant].label}
            />
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
            <IconButton
              key={size}
              size={size}
              icon={<Icon icon={Plus} color="onHeavy" />}
              aria-label={`Add (${size})`}
            />
          ))}
        </div>
      </div>

      {/* Variants x Sizes matrix */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Variants x Sizes
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `80px repeat(${sizes.length}, auto)`,
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {/* Header row */}
          <div />
          {sizes.map((size) => (
            <span key={size} style={{ fontWeight: 500, textAlign: "center" }}>
              {size}
            </span>
          ))}

          {/* Data rows */}
          {variants.map((variant) => (
            <React.Fragment key={variant}>
              <span style={{ fontWeight: 500 }}>
                {variant}
              </span>
              {sizes.map((size) => (
                <IconButton
                  key={`${variant}-${size}`}
                  variant={variant}
                  size={size}
                  icon={variantIcons[variant].icon}
                  aria-label={`${variantIcons[variant].label} (${size})`}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Disabled variants */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Disabled Variants
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {variants.map((variant) => (
            <IconButton
              key={variant}
              variant={variant}
              disabled
              icon={variantIcons[variant].icon}
              aria-label={`${variantIcons[variant].label} (disabled)`}
            />
          ))}
        </div>
      </div>

      {/* Loading variants */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Loading Variants
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {variants.map((variant) => (
            <IconButton
              key={variant}
              variant={variant}
              isLoading
              icon={variantIcons[variant].icon}
              aria-label={`${variantIcons[variant].label} (loading)`}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};
