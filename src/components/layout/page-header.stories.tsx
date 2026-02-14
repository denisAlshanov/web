import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PageHeader } from "./page-header";
import { AccountSettings } from "@/components/ui/account-settings";
import { Tabs, TabList, Tab } from "@/components/ui/tabs";

// ---------------------------------------------------------------------------
// Helpers — reusable slot content for stories
// ---------------------------------------------------------------------------

const sampleAccountSettings = (
  <AccountSettings
    userName="Alexander Plushev"
    roles={["host", "producer"]}
  />
);

const sampleTabs = (
  <Tabs defaultValue="upcoming">
    <TabList>
      <Tab value="upcoming">Upcoming</Tab>
      <Tab value="past">Past</Tab>
      <Tab value="drafts">Drafts</Tab>
    </TabList>
  </Tabs>
);

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: [1, 2],
    },
    showHeading: { control: "boolean" },
    scroll: { control: "boolean" },
    tabbedView: { control: "boolean" },
    showMenu: { control: "boolean" },
    showHelperText: { control: "boolean" },
    heading: { control: "text" },
    helperText: { control: "text" },
  },
  args: {
    level: 1,
    heading: "Shows",
    showHeading: true,
    scroll: false,
    tabbedView: true,
    showMenu: true,
    showHelperText: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 960 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Level 1 Stories
// ---------------------------------------------------------------------------

// -- Level 1 with Heading --

export const Level1WithHeading: Story = {
  args: {
    level: 1,
    heading: "Shows",
    showHeading: true,
    scroll: false,
    tabbedView: true,
  },
  render: (args) => (
    <PageHeader
      {...args}
      tabs={sampleTabs}
      accountSettings={sampleAccountSettings}
    />
  ),
};

// -- Level 1 No Heading --

export const Level1NoHeading: Story = {
  args: {
    level: 1,
    showHeading: false,
    scroll: false,
    tabbedView: true,
  },
  render: (args) => (
    <PageHeader
      {...args}
      tabs={sampleTabs}
      accountSettings={sampleAccountSettings}
    />
  ),
};

// -- Level 1 Scrolled --

export const Level1Scrolled: Story = {
  args: {
    level: 1,
    heading: "Shows",
    showHeading: true,
    scroll: true,
    tabbedView: true,
  },
  render: (args) => (
    <PageHeader
      {...args}
      tabs={sampleTabs}
      accountSettings={sampleAccountSettings}
    />
  ),
};

// ---------------------------------------------------------------------------
// Level 2 Stories
// ---------------------------------------------------------------------------

// -- Level 2 with Heading --

export const Level2WithHeading: Story = {
  args: {
    level: 2,
    heading: "Show Details",
    showHeading: true,
    scroll: false,
    showMenu: true,
  },
  render: (args) => (
    <PageHeader
      {...args}
      onBackClick={() => {}}
      onMenuClick={() => {}}
      accountSettings={sampleAccountSettings}
    />
  ),
};

// -- Level 2 No Heading --

export const Level2NoHeading: Story = {
  args: {
    level: 2,
    showHeading: false,
    scroll: false,
    showMenu: true,
  },
  render: (args) => (
    <PageHeader
      {...args}
      onBackClick={() => {}}
      onMenuClick={() => {}}
      accountSettings={sampleAccountSettings}
    />
  ),
};

// -- Level 2 Scrolled --

export const Level2Scrolled: Story = {
  args: {
    level: 2,
    heading: "Show Details",
    showHeading: true,
    scroll: true,
    showMenu: true,
  },
  render: (args) => (
    <PageHeader
      {...args}
      onBackClick={() => {}}
      onMenuClick={() => {}}
      accountSettings={sampleAccountSettings}
    />
  ),
};

// -- Level 2 with Helper Text --

export const Level2WithHelperText: Story = {
  args: {
    level: 2,
    heading: "Show Details",
    showHeading: true,
    scroll: false,
    showMenu: true,
    showHelperText: true,
    helperText: "Draft",
  },
  render: (args) => (
    <PageHeader
      {...args}
      onBackClick={() => {}}
      onMenuClick={() => {}}
      accountSettings={sampleAccountSettings}
    />
  ),
};

// ---------------------------------------------------------------------------
// All Variants Grid
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <p style={{ margin: 0, fontSize: "0.75rem", color: "#888" }}>
        All 8 variants: 2 levels x 2 scroll states x 2 heading states
      </p>

      {/* Level 1 variants */}
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>
          Level 1 — Heading, No Scroll
        </p>
        <PageHeader
          level={1}
          heading="Shows"
          showHeading
          scroll={false}
          tabbedView
          tabs={sampleTabs}
          accountSettings={sampleAccountSettings}
        />
      </div>

      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>
          Level 1 — Heading, Scrolled
        </p>
        <PageHeader
          level={1}
          heading="Shows"
          showHeading
          scroll
          tabbedView
          tabs={sampleTabs}
          accountSettings={sampleAccountSettings}
        />
      </div>

      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>
          Level 1 — No Heading, No Scroll
        </p>
        <PageHeader
          level={1}
          showHeading={false}
          scroll={false}
          tabbedView
          tabs={sampleTabs}
          accountSettings={sampleAccountSettings}
        />
      </div>

      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>
          Level 1 — No Heading, Scrolled
        </p>
        <PageHeader
          level={1}
          showHeading={false}
          scroll
          tabbedView
          tabs={sampleTabs}
          accountSettings={sampleAccountSettings}
        />
      </div>

      {/* Level 2 variants */}
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>
          Level 2 — Heading, No Scroll
        </p>
        <PageHeader
          level={2}
          heading="Show Details"
          showHeading
          scroll={false}
          showMenu
          onBackClick={() => {}}
          onMenuClick={() => {}}
          accountSettings={sampleAccountSettings}
        />
      </div>

      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>
          Level 2 — Heading, Scrolled
        </p>
        <PageHeader
          level={2}
          heading="Show Details"
          showHeading
          scroll
          showMenu
          onBackClick={() => {}}
          onMenuClick={() => {}}
          accountSettings={sampleAccountSettings}
        />
      </div>

      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>
          Level 2 — No Heading, No Scroll
        </p>
        <PageHeader
          level={2}
          showHeading={false}
          scroll={false}
          showMenu
          onBackClick={() => {}}
          onMenuClick={() => {}}
          accountSettings={sampleAccountSettings}
        />
      </div>

      <div>
        <p style={{ marginBottom: 8, fontWeight: 600 }}>
          Level 2 — No Heading, Scrolled
        </p>
        <PageHeader
          level={2}
          showHeading={false}
          scroll
          showMenu
          onBackClick={() => {}}
          onMenuClick={() => {}}
          accountSettings={sampleAccountSettings}
        />
      </div>
    </div>
  ),
};
