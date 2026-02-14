import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Menu, Plus, EditPencil, Copy, Trash } from "iconoir-react";

import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";

const meta = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", minHeight: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default: hamburger trigger with several items --

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          icon={<Icon icon={Menu} />}
          aria-label="Open menu"
          variant="ghost"
          size="xs"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6}>
        <DropdownMenuItem>Action one</DropdownMenuItem>
        <DropdownMenuItem>Action two</DropdownMenuItem>
        <DropdownMenuItem>Action three</DropdownMenuItem>
        <DropdownMenuItem>Action four</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// -- WithIcons: items with various iconoir icons --

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          icon={<Icon icon={Menu} />}
          aria-label="Open menu"
          variant="ghost"
          size="xs"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6}>
        <DropdownMenuItem icon={Plus}>Add item</DropdownMenuItem>
        <DropdownMenuItem icon={EditPencil}>Edit</DropdownMenuItem>
        <DropdownMenuItem icon={Copy}>Duplicate</DropdownMenuItem>
        <DropdownMenuItem icon={Trash}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// -- ItemStates: grid showing all 4 item states --

export const ItemStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Default</p>
        <div
          style={{
            width: 200,
            borderRadius: "var(--number-radius-rad-modal)",
            overflow: "clip",
          }}
        >
          <div
            className="flex items-center h-[40px] w-full gap-[var(--number-spacing-gap-gap-s)] pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-m)] text-medium-s text-[color:var(--colour-interface-text-default)] bg-[var(--colour-interface-background-secondary-default)]"
          >
            <Icon icon={Plus} size="md" />
            Default state
          </div>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Hover</p>
        <div
          style={{
            width: 200,
            borderRadius: "var(--number-radius-rad-modal)",
            overflow: "clip",
          }}
        >
          <div
            className="flex items-center h-[40px] w-full gap-[var(--number-spacing-gap-gap-s)] pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-m)] text-medium-s text-[color:var(--colour-interface-text-default)] bg-[var(--colour-interface-background-secondary-hover)]"
          >
            <Icon icon={Plus} size="md" />
            Hover state
          </div>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Focus</p>
        <div
          style={{
            width: 200,
            borderRadius: "var(--number-radius-rad-modal)",
            overflow: "clip",
          }}
        >
          <div
            className="flex items-center h-[40px] w-full gap-[var(--number-spacing-gap-gap-s)] pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-m)] text-medium-s text-[color:var(--colour-interface-text-default)] bg-[var(--colour-interface-background-secondary-focus)] ring-3 ring-inset ring-[var(--colour-interface-border-primary-focus)]"
          >
            <Icon icon={Plus} size="md" />
            Focus state
          </div>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Active</p>
        <div
          style={{
            width: 200,
            borderRadius: "var(--number-radius-rad-modal)",
            overflow: "clip",
          }}
        >
          <div
            className="flex items-center h-[40px] w-full gap-[var(--number-spacing-gap-gap-s)] pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)] py-[var(--number-spacing-padding-pad-m)] text-medium-s text-[color:var(--colour-interface-text-default)] bg-[var(--colour-interface-background-secondary-active)]"
          >
            <Icon icon={Plus} size="md" />
            Active state
          </div>
        </div>
      </div>
    </div>
  ),
};

// -- MenuPanel: standalone DropdownMenuContent panel with items --

export const MenuPanel: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <IconButton
          icon={<Icon icon={Menu} />}
          aria-label="Open menu"
          variant="ghost"
          size="xs"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={6}>
        <DropdownMenuItem icon={Plus}>Add item</DropdownMenuItem>
        <DropdownMenuItem icon={EditPencil}>Edit</DropdownMenuItem>
        <DropdownMenuItem icon={Copy}>Duplicate</DropdownMenuItem>
        <DropdownMenuItem icon={Trash}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// -- CustomTrigger: using a Button as trigger instead of IconButton --

export const CustomTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={6}>
        <DropdownMenuItem icon={Plus}>Add item</DropdownMenuItem>
        <DropdownMenuItem icon={EditPencil}>Edit</DropdownMenuItem>
        <DropdownMenuItem icon={Copy}>Duplicate</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
