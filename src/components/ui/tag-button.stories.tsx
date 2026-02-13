import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Xmark, Plus, EditPencil, Trash, Check } from "iconoir-react";

import { TagButton } from "./tag-button";

const meta = {
  title: "UI/TagButton",
  component: TagButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    icon: <Xmark />,
    "aria-label": "Remove",
  },
} satisfies Meta<typeof TagButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default --

export const Default: Story = {};

// -- Variants --

export const DefaultVariant: Story = {
  args: {
    variant: "default",
    icon: <Xmark />,
    "aria-label": "Remove",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    icon: <Trash />,
    "aria-label": "Delete",
  },
};

// -- States --

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "Remove (disabled)" },
};

export const Loading: Story = {
  args: { isLoading: true, "aria-label": "Loading" },
};

export const DestructiveDisabled: Story = {
  args: {
    variant: "destructive",
    disabled: true,
    icon: <Trash />,
    "aria-label": "Delete (disabled)",
  },
};

export const DestructiveLoading: Story = {
  args: {
    variant: "destructive",
    isLoading: true,
    icon: <Trash />,
    "aria-label": "Delete (loading)",
  },
};

// -- Different Icons --

export const WithDifferentIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <TagButton icon={<Xmark />} aria-label="Remove" />
      <TagButton icon={<Plus />} aria-label="Add" />
      <TagButton icon={<EditPencil />} aria-label="Edit" />
      <TagButton icon={<Trash />} aria-label="Delete" variant="destructive" />
      <TagButton icon={<Check />} aria-label="Confirm" />
    </div>
  ),
};

// -- AsChild --

export const AsChild: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <TagButton asChild icon={<Xmark />} aria-label="Remove tag (link)">
        <a href="#remove" />
      </TagButton>
      <TagButton
        asChild
        variant="destructive"
        icon={<Trash />}
        aria-label="Delete tag (link)"
      >
        <a href="#delete" />
      </TagButton>
      <TagButton
        asChild
        disabled
        icon={<Xmark />}
        aria-label="Remove tag (disabled link)"
      >
        <a href="#disabled" />
      </TagButton>
    </div>
  ),
};

// -- State Grid --

const variants = ["default", "destructive"] as const;

const variantIcons: Record<
  (typeof variants)[number],
  { icon: React.ReactNode; label: string }
> = {
  default: { icon: <Xmark />, label: "Remove" },
  destructive: { icon: <Trash />, label: "Delete" },
};

export const StateGrid: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* All variants */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>All Variants</p>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {variants.map((variant) => (
            <TagButton
              key={variant}
              variant={variant}
              icon={variantIcons[variant].icon}
              aria-label={variantIcons[variant].label}
            />
          ))}
        </div>
      </div>

      {/* Disabled variants */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Disabled Variants
        </p>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {variants.map((variant) => (
            <TagButton
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
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {variants.map((variant) => (
            <TagButton
              key={variant}
              variant={variant}
              isLoading
              icon={variantIcons[variant].icon}
              aria-label={`${variantIcons[variant].label} (loading)`}
            />
          ))}
        </div>
      </div>

      {/* Interactive hint */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Interactive States
        </p>
        <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.5rem" }}>
          Hover, active, and focus states — interact with buttons below to test
        </p>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {variants.map((variant) => (
            <TagButton
              key={variant}
              variant={variant}
              icon={variantIcons[variant].icon}
              aria-label={`${variantIcons[variant].label} (interactive)`}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};
