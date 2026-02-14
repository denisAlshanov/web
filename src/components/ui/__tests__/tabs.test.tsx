import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Tabs, TabList, Tab, TabContent } from "../tabs";

// Mock Iconoir-style SVG icon component for testing leadingIcon prop
function MockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg data-testid="mock-icon" {...props}>
      <path d="M0 0h24v24H0z" />
    </svg>
  );
}

describe("Tabs", () => {
  describe("basic rendering", () => {
    it("renders a basic tab structure", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>,
      );

      expect(screen.getByText("Tab 1")).toBeInTheDocument();
      expect(screen.getByText("Tab 2")).toBeInTheDocument();
      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });

    it("renders tabs with correct ARIA roles", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
        </Tabs>,
      );

      expect(screen.getByRole("tablist")).toBeInTheDocument();
      expect(screen.getByRole("tab")).toBeInTheDocument();
      expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    });
  });

  describe("Tab component - rendering", () => {
    it("renders text label", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">My Tab Label</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      expect(screen.getByRole("tab", { name: "My Tab Label" })).toBeInTheDocument();
    });

    it("renders with a leading icon", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1" leadingIcon={MockIcon}>
              With Icon
            </Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "With Icon" })).toBeInTheDocument();
    });

    it("renders without icon when leadingIcon is not provided", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">No Icon</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
    });

    it("applies text-medium-s typography class", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Styled Tab</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tab = screen.getByRole("tab", { name: "Styled Tab" });
      expect(tab.className).toContain("text-medium-s");
    });

    it("applies base flex and gap styles", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Styled Tab</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tab = screen.getByRole("tab", { name: "Styled Tab" });
      expect(tab.className).toContain("inline-flex");
      expect(tab.className).toContain("items-center");
    });

    it("applies cursor-pointer style", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Clickable Tab</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tab = screen.getByRole("tab", { name: "Clickable Tab" });
      expect(tab.className).toContain("cursor-pointer");
    });

    it("merges custom className via cn()", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1" className="my-custom-class">
              Custom
            </Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tab = screen.getByRole("tab", { name: "Custom" });
      expect(tab.className).toContain("my-custom-class");
    });
  });

  describe("Tab component - states", () => {
    it("default state has text-default color", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Active</Tab>
            <Tab value="tab2">Default</Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>,
      );

      const defaultTab = screen.getByRole("tab", { name: "Default" });
      expect(defaultTab.className).toContain(
        "text-[color:var(--colour-interface-text-default)]",
      );
    });

    it("active tab has data-state=active attribute", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Active</Tab>
            <Tab value="tab2">Inactive</Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>,
      );

      const activeTab = screen.getByRole("tab", { name: "Active" });
      const inactiveTab = screen.getByRole("tab", { name: "Inactive" });

      expect(activeTab).toHaveAttribute("data-state", "active");
      expect(inactiveTab).toHaveAttribute("data-state", "inactive");
    });

    it("contains hover state classes for light border", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tab = screen.getByRole("tab", { name: "Tab" });
      expect(tab.className).toContain(
        "hover:border-b-[var(--colour-interface-border-primary-light)]",
      );
    });

    it("contains focus-visible state classes for medium border", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tab = screen.getByRole("tab", { name: "Tab" });
      expect(tab.className).toContain(
        "focus-visible:border-b-[var(--colour-interface-border-primary-medium)]",
      );
    });

    it("contains active state classes using data-[state=active] selector", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tab = screen.getByRole("tab", { name: "Tab" });
      // Should contain Radix data attribute selector for active state
      expect(tab.className).toContain("data-[state=active]:border-b-[1.8px]");
      expect(tab.className).toContain(
        "data-[state=active]:text-[color:var(--colour-interface-text-heavy)]",
      );
    });
  });

  describe("Tab component - accessibility", () => {
    it("has role=tab", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      expect(screen.getByRole("tab")).toBeInTheDocument();
    });

    it("aria-selected toggles based on active state", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Active Tab</Tab>
            <Tab value="tab2">Inactive Tab</Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>,
      );

      const activeTab = screen.getByRole("tab", { name: "Active Tab" });
      const inactiveTab = screen.getByRole("tab", { name: "Inactive Tab" });

      expect(activeTab).toHaveAttribute("aria-selected", "true");
      expect(inactiveTab).toHaveAttribute("aria-selected", "false");
    });

    it("is keyboard focusable", async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>,
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });

      await user.tab();
      expect(tab1).toHaveFocus();
    });

    it("switches tabs on click", async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>,
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    it("supports arrow key navigation between tabs", async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
          <TabContent value="tab3">Content 3</TabContent>
        </Tabs>,
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      // Focus tab1 first
      await user.tab();
      expect(tab1).toHaveFocus();

      // Arrow right to tab2
      await user.keyboard("{ArrowRight}");
      expect(tab2).toHaveFocus();
    });

    it("icon is hidden from screen readers via aria-hidden", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1" leadingIcon={MockIcon}>
              With Icon
            </Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const icon = screen.getByTestId("mock-icon");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("icon uses default icon color token and switches to heavy on active", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1" leadingIcon={MockIcon}>
              With Icon
            </Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const icon = screen.getByTestId("mock-icon");
      expect(icon.getAttribute("class")).toContain(
        "text-[color:var(--colour-interface-icon-default)]",
      );
      expect(icon.getAttribute("class")).toContain(
        "group-data-[state=active]:text-[color:var(--colour-interface-icon-heavy)]",
      );
    });
  });

  describe("TabList component", () => {
    it("renders as a horizontal flex row", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist.className).toContain("flex");
    });

    it("has role=tablist", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });

    it("applies bottom border using design token", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist.className).toContain("border-b");
      expect(tablist.className).toContain(
        "border-b-[var(--colour-interface-border-secondary-light)]",
      );
    });

    it("applies gap-m (12px) between tabs", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>,
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist.className).toContain(
        "gap-[var(--number-spacing-gap-gap-m)]",
      );
    });

    it("applies left padding pad-m (12px)", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist.className).toContain(
        "pl-[var(--number-spacing-padding-pad-m)]",
      );
    });

    it("merges custom className via cn()", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList className="my-custom-tablist">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist.className).toContain("my-custom-tablist");
    });
  });

  describe("TabContent component", () => {
    it("renders panel content when tab is active", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabContent value="tab1">Active Content</TabContent>
          <TabContent value="tab2">Hidden Content</TabContent>
        </Tabs>,
      );

      expect(screen.getByText("Active Content")).toBeInTheDocument();
      // Inactive tab content should not be in the DOM by default (Radix behavior)
      expect(screen.queryByText("Hidden Content")).not.toBeInTheDocument();
    });

    it("has role=tabpanel", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    });

    it("has correct aria-labelledby linking to its tab trigger", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const panel = screen.getByRole("tabpanel");
      const tab = screen.getByRole("tab", { name: "Tab 1" });

      // Radix links tabpanel to tab via aria-labelledby
      expect(panel).toHaveAttribute("aria-labelledby", tab.id);
    });

    it("tab has aria-controls linking to its panel", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content</TabContent>
        </Tabs>,
      );

      const panel = screen.getByRole("tabpanel");
      const tab = screen.getByRole("tab", { name: "Tab 1" });

      expect(tab).toHaveAttribute("aria-controls", panel.id);
    });

    it("merges custom className", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1" className="my-panel-class">
            Content
          </TabContent>
        </Tabs>,
      );

      const panel = screen.getByRole("tabpanel");
      expect(panel.className).toContain("my-panel-class");
    });
  });

  describe("Composed usage", () => {
    it("Tabs root + TabList + Tab triggers + TabContent panels work together", () => {
      render(
        <Tabs defaultValue="first">
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
            <Tab value="third">Third</Tab>
          </TabList>
          <TabContent value="first">First panel content</TabContent>
          <TabContent value="second">Second panel content</TabContent>
          <TabContent value="third">Third panel content</TabContent>
        </Tabs>,
      );

      // All tabs render
      expect(screen.getAllByRole("tab")).toHaveLength(3);
      // Tablist renders
      expect(screen.getByRole("tablist")).toBeInTheDocument();
      // Active panel renders
      expect(screen.getByText("First panel content")).toBeInTheDocument();
      // First tab is active
      expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("clicking a tab switches the visible content", async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="first">
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
          </TabList>
          <TabContent value="first">First panel content</TabContent>
          <TabContent value="second">Second panel content</TabContent>
        </Tabs>,
      );

      // Initially first panel visible
      expect(screen.getByText("First panel content")).toBeInTheDocument();
      expect(screen.queryByText("Second panel content")).not.toBeInTheDocument();

      // Click second tab
      await user.click(screen.getByRole("tab", { name: "Second" }));

      // Now second panel visible
      expect(screen.getByText("Second panel content")).toBeInTheDocument();
      expect(screen.queryByText("First panel content")).not.toBeInTheDocument();
    });

    it("keyboard navigation switches active tab and content", async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="first">
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
          </TabList>
          <TabContent value="first">First panel content</TabContent>
          <TabContent value="second">Second panel content</TabContent>
        </Tabs>,
      );

      // Tab into the tablist
      await user.tab();
      expect(screen.getByRole("tab", { name: "First" })).toHaveFocus();

      // Arrow right to second tab (Radix auto-activates on focus)
      await user.keyboard("{ArrowRight}");
      expect(screen.getByRole("tab", { name: "Second" })).toHaveFocus();
      expect(
        screen.getByRole("tab", { name: "Second" }),
      ).toHaveAttribute("aria-selected", "true");
    });

    it("renders multiple tabs with icons in a full composition", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1" leadingIcon={MockIcon}>
              Tab One
            </Tab>
            <Tab value="tab2">Tab Two</Tab>
            <Tab value="tab3" leadingIcon={MockIcon}>
              Tab Three
            </Tab>
          </TabList>
          <TabContent value="tab1">Content One</TabContent>
          <TabContent value="tab2">Content Two</TabContent>
          <TabContent value="tab3">Content Three</TabContent>
        </Tabs>,
      );

      expect(screen.getAllByRole("tab")).toHaveLength(3);
      expect(screen.getAllByTestId("mock-icon")).toHaveLength(2);
      expect(screen.getByText("Content One")).toBeInTheDocument();
    });
  });

  describe("Uncontrolled mode", () => {
    it("activates the tab matching defaultValue on initial render", () => {
      render(
        <Tabs defaultValue="second">
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
            <Tab value="third">Third</Tab>
          </TabList>
          <TabContent value="first">First content</TabContent>
          <TabContent value="second">Second content</TabContent>
          <TabContent value="third">Third content</TabContent>
        </Tabs>,
      );

      expect(screen.getByRole("tab", { name: "Second" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute(
        "aria-selected",
        "false",
      );
      expect(screen.getByText("Second content")).toBeInTheDocument();
      expect(screen.queryByText("First content")).not.toBeInTheDocument();
    });

    it("switches tabs internally without external state management", async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="first">
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
          </TabList>
          <TabContent value="first">First content</TabContent>
          <TabContent value="second">Second content</TabContent>
        </Tabs>,
      );

      // Initially first tab active
      expect(screen.getByText("First content")).toBeInTheDocument();

      // Click second tab - should switch without any external state
      await user.click(screen.getByRole("tab", { name: "Second" }));

      expect(screen.getByText("Second content")).toBeInTheDocument();
      expect(screen.queryByText("First content")).not.toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Second" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("uses first tab content when defaultValue matches first tab", () => {
      render(
        <Tabs defaultValue="alpha">
          <TabList>
            <Tab value="alpha">Alpha</Tab>
            <Tab value="beta">Beta</Tab>
          </TabList>
          <TabContent value="alpha">Alpha content</TabContent>
          <TabContent value="beta">Beta content</TabContent>
        </Tabs>,
      );

      expect(screen.getByText("Alpha content")).toBeInTheDocument();
      expect(screen.queryByText("Beta content")).not.toBeInTheDocument();
    });
  });

  describe("Controlled mode", () => {
    it("activates the tab matching the value prop", () => {
      render(
        <Tabs value="second" onValueChange={() => {}}>
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
          </TabList>
          <TabContent value="first">First content</TabContent>
          <TabContent value="second">Second content</TabContent>
        </Tabs>,
      );

      expect(screen.getByRole("tab", { name: "Second" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute(
        "aria-selected",
        "false",
      );
      expect(screen.getByText("Second content")).toBeInTheDocument();
    });

    it("calls onValueChange when a tab is clicked", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Tabs value="first" onValueChange={onValueChange}>
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
          </TabList>
          <TabContent value="first">First content</TabContent>
          <TabContent value="second">Second content</TabContent>
        </Tabs>,
      );

      await user.click(screen.getByRole("tab", { name: "Second" }));

      expect(onValueChange).toHaveBeenCalledWith("second");
    });

    it("does not switch content when value prop is not updated (strict controlled)", async () => {
      const user = userEvent.setup();

      // Render with a fixed value that never changes
      render(
        <Tabs value="first" onValueChange={() => {}}>
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
          </TabList>
          <TabContent value="first">First content</TabContent>
          <TabContent value="second">Second content</TabContent>
        </Tabs>,
      );

      // Click second tab - value is not updated, so content should not switch
      await user.click(screen.getByRole("tab", { name: "Second" }));

      // First content should still be visible since value is still "first"
      expect(screen.getByText("First content")).toBeInTheDocument();
      expect(screen.queryByText("Second content")).not.toBeInTheDocument();
    });

    it("updates active tab when value prop changes", () => {
      const { rerender } = render(
        <Tabs value="first" onValueChange={() => {}}>
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
          </TabList>
          <TabContent value="first">First content</TabContent>
          <TabContent value="second">Second content</TabContent>
        </Tabs>,
      );

      expect(screen.getByText("First content")).toBeInTheDocument();

      // Re-render with new value
      rerender(
        <Tabs value="second" onValueChange={() => {}}>
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
          </TabList>
          <TabContent value="first">First content</TabContent>
          <TabContent value="second">Second content</TabContent>
        </Tabs>,
      );

      expect(screen.getByText("Second content")).toBeInTheDocument();
      expect(screen.queryByText("First content")).not.toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Second" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("calls onValueChange on keyboard navigation", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Tabs value="first" onValueChange={onValueChange}>
          <TabList>
            <Tab value="first">First</Tab>
            <Tab value="second">Second</Tab>
          </TabList>
          <TabContent value="first">First content</TabContent>
          <TabContent value="second">Second content</TabContent>
        </Tabs>,
      );

      // Focus first tab
      await user.tab();
      // Arrow right
      await user.keyboard("{ArrowRight}");

      expect(onValueChange).toHaveBeenCalledWith("second");
    });
  });

  describe("Programmatic tab switching", () => {
    function ControlledTabs() {
      const [activeTab, setActiveTab] = useState("first");

      return (
        <div>
          <button
            data-testid="switch-to-second"
            onClick={() => setActiveTab("second")}
          >
            Go to Second
          </button>
          <button
            data-testid="switch-to-third"
            onClick={() => setActiveTab("third")}
          >
            Go to Third
          </button>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabList>
              <Tab value="first">First</Tab>
              <Tab value="second">Second</Tab>
              <Tab value="third">Third</Tab>
            </TabList>
            <TabContent value="first">First content</TabContent>
            <TabContent value="second">Second content</TabContent>
            <TabContent value="third">Third content</TabContent>
          </Tabs>
        </div>
      );
    }

    it("switches tab via external button click", async () => {
      const user = userEvent.setup();

      render(<ControlledTabs />);

      // Initially first tab
      expect(screen.getByText("First content")).toBeInTheDocument();

      // Click external button to switch to second
      await user.click(screen.getByTestId("switch-to-second"));

      expect(screen.getByText("Second content")).toBeInTheDocument();
      expect(screen.queryByText("First content")).not.toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Second" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("can switch to any tab programmatically", async () => {
      const user = userEvent.setup();

      render(<ControlledTabs />);

      // Switch to third directly
      await user.click(screen.getByTestId("switch-to-third"));

      expect(screen.getByText("Third content")).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Third" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("programmatic switch and click switch work together", async () => {
      const user = userEvent.setup();

      render(<ControlledTabs />);

      // Programmatically switch to second
      await user.click(screen.getByTestId("switch-to-second"));
      expect(screen.getByText("Second content")).toBeInTheDocument();

      // Then click third tab directly
      await user.click(screen.getByRole("tab", { name: "Third" }));
      expect(screen.getByText("Third content")).toBeInTheDocument();

      // Then programmatically back to second
      await user.click(screen.getByTestId("switch-to-second"));
      expect(screen.getByText("Second content")).toBeInTheDocument();
    });
  });

  describe("Disabled tab", () => {
    it("disabled tab cannot be activated by click", async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>
              Tab 2
            </Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>,
      );

      await user.click(screen.getByRole("tab", { name: "Tab 2" }));

      // Content should not switch since tab2 is disabled
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
    });

    it("disabled tab has data-disabled attribute", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>
              Tab 2
            </Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>,
      );

      const disabledTab = screen.getByRole("tab", { name: "Tab 2" });
      expect(disabledTab).toHaveAttribute("data-disabled");
    });

    it("disabled tab has disabled styling classes", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>
              Tab 2
            </Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>,
      );

      const disabledTab = screen.getByRole("tab", { name: "Tab 2" });
      expect(disabledTab.className).toContain("data-[disabled]:cursor-not-allowed");
      expect(disabledTab.className).toContain("data-[disabled]:opacity-50");
    });
  });

  describe("Active state hover preservation", () => {
    it("active tab preserves border color class on hover", () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabContent value="tab1">Content 1</TabContent>
        </Tabs>,
      );

      const tab = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab.className).toContain(
        "data-[state=active]:hover:border-b-[var(--colour-brandMode-primary-800)]",
      );
    });
  });
});
