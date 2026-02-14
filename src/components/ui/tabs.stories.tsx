import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  HomeSimpleDoor,
  Calendar,
  Clock,
  MapPin,
  User,
  Search,
  Tv,
  Group,
  Wrench,
  Plus,
} from "iconoir-react";

import { Tabs, TabList, Tab, TabContent } from "./tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// -- Default: basic 3-tab example with text-only tabs --

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Overview</Tab>
        <Tab value="tab2">Schedule</Tab>
        <Tab value="tab3">Settings</Tab>
      </TabList>
      <TabContent value="tab1">
        <p style={{ padding: "1rem" }}>Overview content goes here.</p>
      </TabContent>
      <TabContent value="tab2">
        <p style={{ padding: "1rem" }}>Schedule content goes here.</p>
      </TabContent>
      <TabContent value="tab3">
        <p style={{ padding: "1rem" }}>Settings content goes here.</p>
      </TabContent>
    </Tabs>
  ),
};

// -- WithIcons: tabs with leading icons using <Icon> wrapper --

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabList>
        <Tab value="home" leadingIcon={HomeSimpleDoor}>
          Home
        </Tab>
        <Tab value="calendar" leadingIcon={Calendar}>
          Calendar
        </Tab>
        <Tab value="team" leadingIcon={Group}>
          Team
        </Tab>
      </TabList>
      <TabContent value="home">
        <p style={{ padding: "1rem" }}>Home content.</p>
      </TabContent>
      <TabContent value="calendar">
        <p style={{ padding: "1rem" }}>Calendar content.</p>
      </TabContent>
      <TabContent value="team">
        <p style={{ padding: "1rem" }}>Team content.</p>
      </TabContent>
    </Tabs>
  ),
};

// -- ActiveStates: grid showing all 4 tab states (Default, Hover, Focus, Active) --

export const ActiveStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <p style={{ margin: 0, fontSize: "0.75rem", color: "#888" }}>
        Hover and focus states are CSS pseudo-states — interact with the tabs
        below to preview them. The first tab in each row is active.
      </p>
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Text only</p>
        <Tabs defaultValue="active">
          <TabList>
            <Tab value="active">Active Tab</Tab>
            <Tab value="default">Default Tab</Tab>
            <Tab value="hover">Hover Me</Tab>
            <Tab value="focus">Focus Me</Tab>
          </TabList>
          <TabContent value="active" />
          <TabContent value="default" />
          <TabContent value="hover" />
          <TabContent value="focus" />
        </Tabs>
      </div>
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>With icons</p>
        <Tabs defaultValue="active">
          <TabList>
            <Tab value="active" leadingIcon={HomeSimpleDoor}>
              Active
            </Tab>
            <Tab value="default" leadingIcon={Calendar}>
              Default
            </Tab>
            <Tab value="hover" leadingIcon={Clock}>
              Hover Me
            </Tab>
            <Tab value="focus" leadingIcon={Search}>
              Focus Me
            </Tab>
          </TabList>
          <TabContent value="active" />
          <TabContent value="default" />
          <TabContent value="hover" />
          <TabContent value="focus" />
        </Tabs>
      </div>
    </div>
  ),
};

// -- Controlled: demonstrates controlled tab switching --

function ControlledExample() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => setActiveTab("tab1")}
          style={{
            padding: "0.25rem 0.75rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: activeTab === "tab1" ? "#eee" : "white",
            cursor: "pointer",
          }}
        >
          Go to Tab 1
        </button>
        <button
          onClick={() => setActiveTab("tab2")}
          style={{
            padding: "0.25rem 0.75rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: activeTab === "tab2" ? "#eee" : "white",
            cursor: "pointer",
          }}
        >
          Go to Tab 2
        </button>
        <button
          onClick={() => setActiveTab("tab3")}
          style={{
            padding: "0.25rem 0.75rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: activeTab === "tab3" ? "#eee" : "white",
            cursor: "pointer",
          }}
        >
          Go to Tab 3
        </button>
      </div>
      <p style={{ margin: 0, fontSize: "0.75rem", color: "#888" }}>
        Active tab: {activeTab}
      </p>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabList>
          <Tab value="tab1">First</Tab>
          <Tab value="tab2">Second</Tab>
          <Tab value="tab3">Third</Tab>
        </TabList>
        <TabContent value="tab1">
          <p style={{ padding: "1rem" }}>First tab content (controlled).</p>
        </TabContent>
        <TabContent value="tab2">
          <p style={{ padding: "1rem" }}>Second tab content (controlled).</p>
        </TabContent>
        <TabContent value="tab3">
          <p style={{ padding: "1rem" }}>Third tab content (controlled).</p>
        </TabContent>
      </Tabs>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

// -- ManyTabs: 10 tabs matching the Figma Tab View layout --

const manyTabItems = [
  { value: "home", label: "Home", icon: HomeSimpleDoor },
  { value: "calendar", label: "Calendar", icon: Calendar },
  { value: "schedule", label: "Schedule", icon: Clock },
  { value: "locations", label: "Locations", icon: MapPin },
  { value: "guests", label: "Guests", icon: User },
  { value: "shows", label: "Shows", icon: Tv },
  { value: "team", label: "Team", icon: Group },
  { value: "tools", label: "Tools", icon: Wrench },
  { value: "search", label: "Search", icon: Search },
  { value: "create", label: "Create", icon: Plus },
];

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabList>
        {manyTabItems.map((item) => (
          <Tab key={item.value} value={item.value} leadingIcon={item.icon}>
            {item.label}
          </Tab>
        ))}
      </TabList>
      {manyTabItems.map((item) => (
        <TabContent key={item.value} value={item.value}>
          <p style={{ padding: "1rem" }}>{item.label} content goes here.</p>
        </TabContent>
      ))}
    </Tabs>
  ),
};
