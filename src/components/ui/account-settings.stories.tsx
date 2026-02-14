import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { userEvent, within } from "storybook/test";
import { User, LogOut } from "iconoir-react";

import {
  AccountSettings,
  AccountSettingsDropdown,
  AccountSettingsItem,
  RolePill,
} from "./account-settings";

// ---------------------------------------------------------------------------
// AccountSettings (composed widget)
// ---------------------------------------------------------------------------

const meta = {
  title: "UI/AccountSettings",
  component: AccountSettings,
  tags: ["autodocs"],
  args: {
    userName: "Alexander Plushev",
    roles: ["host", "producer"] as Array<"host" | "producer">,
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccountSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default (closed) --

export const Default: Story = {};

// -- Open (dropdown visible) --

export const Open: Story = {
  parameters: { docs: { story: { autoplay: true } } },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 40, minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /account settings/i });
    await userEvent.click(trigger);
  },
};

// ---------------------------------------------------------------------------
// AccountSettingsItem stories
// ---------------------------------------------------------------------------

// -- Item Default style --

export const ItemDefault: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <AccountSettingsItem icon={User} intent="default" onClick={() => {}}>
        Account Info
      </AccountSettingsItem>
    </div>
  ),
};

// -- Item Danger style --

export const ItemDanger: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <AccountSettingsItem icon={LogOut} intent="danger" onClick={() => {}}>
        Log out
      </AccountSettingsItem>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// AccountSettingsDropdown (standalone panel)
// ---------------------------------------------------------------------------

export const DropdownPanel: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <AccountSettingsDropdown
        userName="Alexander Plushev"
        roles={["host", "producer"]}
        onAccountInfoClick={() => {}}
        onLogoutClick={() => {}}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// RolePills
// ---------------------------------------------------------------------------

export const RolePills: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <RolePill role="host" />
      <RolePill role="producer" />
    </div>
  ),
};
