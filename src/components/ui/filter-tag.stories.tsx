import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, Xmark } from "iconoir-react";

import { FilterTag } from "./filter-tag";

const meta = {
  title: "UI/FilterTag",
  component: FilterTag,
  tags: ["autodocs"],
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    editable: { control: "boolean" },
    editing: { control: "boolean" },
  },
  args: {
    children: "Filter",
    onClick: fn(),
    onEdit: fn(),
    onDelete: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof FilterTag>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default --

export const Default: Story = {};

// -- Icons --

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: Plus,
    children: "Add Filter",
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: Xmark,
    children: "Category",
  },
};

export const WithBothIcons: Story = {
  args: {
    leadingIcon: Plus,
    trailingIcon: Xmark,
    children: "Tag",
  },
};

// -- States --

export const Selected: Story = {
  args: { selected: true, children: "Active Filter" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

// -- Pseudo-state hints (hover, focus, active are CSS-driven — interact to test) --

export const InteractiveStates: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--colour-interface-text-supporting)",
        }}
      >
        Hover, press, and tab-focus the tags below to see pseudo-state styles
      </p>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <FilterTag {...args}>Hover me</FilterTag>
        <FilterTag {...args} leadingIcon={Plus}>
          Press me
        </FilterTag>
        <FilterTag {...args} selected>
          Selected
        </FilterTag>
      </div>
    </div>
  ),
};

// -- Editable --

export const Editable: Story = {
  args: {
    editable: true,
    children: "Editable Tag",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Hover to reveal edit and delete action buttons on the right side.",
      },
    },
  },
};

export const Editing: Story = {
  args: {
    editable: true,
    editing: true,
    children: "Editing Tag",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active editing state — shows confirm (check) icon and medium border.",
      },
    },
  },
};

export const EditableSelected: Story = {
  args: {
    editable: true,
    selected: true,
    children: "Selected Editable",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When selected, action buttons are hidden even if editable is true.",
      },
    },
  },
};

// -- State Grid --

export const StateGrid: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Non-editable states */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Non-editable States
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <FilterTag>Default</FilterTag>
          <FilterTag leadingIcon={Plus}>With Icon</FilterTag>
          <FilterTag selected>Selected</FilterTag>
          <FilterTag disabled>Disabled</FilterTag>
        </div>
      </div>

      {/* Editable states */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Editable States
        </p>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--colour-interface-text-supporting)",
            marginBottom: "0.5rem",
          }}
        >
          Hover to reveal action buttons
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <FilterTag editable>Editable Default</FilterTag>
          <FilterTag editable editing>
            Editing
          </FilterTag>
          <FilterTag editable selected>
            Editable Selected
          </FilterTag>
          <FilterTag editable disabled>
            Editable Disabled
          </FilterTag>
        </div>
      </div>

      {/* Interactive hint */}
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Interactive States
        </p>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--colour-interface-text-supporting)",
            marginBottom: "0.5rem",
          }}
        >
          Hover, active, and focus states — interact with tags below to test
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <FilterTag>Hover me</FilterTag>
          <FilterTag leadingIcon={Plus}>Press me</FilterTag>
          <FilterTag editable>Hover for actions</FilterTag>
        </div>
      </div>
    </div>
  ),
};
