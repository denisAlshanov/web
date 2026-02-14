import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SideNavbar } from "../side-navbar";

describe("SideNavbar", () => {
  const NAV_LABELS = ["Home", "Shows", "Calendar", "Team", "Guests", "Manage"];

  /** Get only nav item buttons (excludes the logo toggle button). */
  function getNavButtons() {
    return screen
      .getAllByRole("button")
      .filter((btn) => !btn.hasAttribute("aria-label") || !btn.getAttribute("aria-label")?.includes("sidebar"));
  }

  describe("navigation landmark", () => {
    it("renders with role='navigation'", () => {
      render(<SideNavbar />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("has aria-label for the navigation", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Main navigation");
    });
  });

  describe("expanded mode (default)", () => {
    it("renders MediaPlansLogo", () => {
      render(<SideNavbar />);
      expect(screen.getByRole("img", { name: "MediaPlans logo" })).toBeInTheDocument();
    });

    it("renders 'MediaPlans' text", () => {
      render(<SideNavbar />);
      expect(screen.getByText("MediaPlans")).toBeInTheDocument();
    });

    it("renders all 6 nav items with correct labels", () => {
      render(<SideNavbar />);
      for (const label of NAV_LABELS) {
        expect(screen.getByText(label)).toBeInTheDocument();
      }
    });

    it("renders nav items in correct order", () => {
      render(<SideNavbar />);
      const buttons = getNavButtons();
      const labels = buttons.map((btn) => btn.textContent?.trim());
      expect(labels).toEqual(NAV_LABELS);
    });
  });

  describe("collapsed mode", () => {
    it("renders MediaPlansLogo", () => {
      render(<SideNavbar defaultCollapsed />);
      expect(screen.getByRole("img", { name: "MediaPlans logo" })).toBeInTheDocument();
    });

    it("renders 'MediaPlans' text with opacity-0 when collapsed", () => {
      render(<SideNavbar defaultCollapsed />);
      const text = screen.getByText("MediaPlans");
      expect(text).toHaveClass("opacity-0");
    });

    it("renders all 6 nav items", () => {
      render(<SideNavbar defaultCollapsed />);
      const buttons = getNavButtons();
      expect(buttons).toHaveLength(6);
    });

    it("renders nav items with collapsed prop (opacity-0 labels)", () => {
      render(<SideNavbar defaultCollapsed />);
      for (const label of NAV_LABELS) {
        const element = screen.getByText(label);
        expect(element).toHaveClass("opacity-0");
      }
    });

    it("renders nav items with aria-label for accessibility", () => {
      render(<SideNavbar defaultCollapsed />);
      for (const label of NAV_LABELS) {
        expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
      }
    });
  });

  describe("active item", () => {
    it("defaults to 'home' as active item", () => {
      render(<SideNavbar />);
      const homeButton = screen.getByRole("button", { name: "Home" });
      expect(homeButton).toHaveAttribute("aria-current", "page");
    });

    it("only the active item has aria-current='page'", () => {
      render(<SideNavbar activeItem="shows" />);
      const showsButton = screen.getByRole("button", { name: "Shows" });
      expect(showsButton).toHaveAttribute("aria-current", "page");

      const otherLabels = NAV_LABELS.filter((l) => l !== "Shows");
      for (const label of otherLabels) {
        const button = screen.getByRole("button", { name: label });
        expect(button).not.toHaveAttribute("aria-current", "page");
      }
    });

    it("activeItem prop controls which item is active", () => {
      const { rerender } = render(<SideNavbar activeItem="calendar" />);
      expect(screen.getByRole("button", { name: "Calendar" })).toHaveAttribute(
        "aria-current",
        "page",
      );

      rerender(<SideNavbar activeItem="team" />);
      expect(screen.getByRole("button", { name: "Team" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(screen.getByRole("button", { name: "Calendar" })).not.toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  });

  describe("onItemClick", () => {
    it("fires with item identifier when a nav item is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<SideNavbar onItemClick={handleClick} />);

      await user.click(screen.getByRole("button", { name: "Shows" }));
      expect(handleClick).toHaveBeenCalledWith("shows");

      await user.click(screen.getByRole("button", { name: "Manage" }));
      expect(handleClick).toHaveBeenCalledWith("manage");
    });

    it("fires for each nav item with the correct identifier", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<SideNavbar onItemClick={handleClick} />);

      const expectedIds = ["home", "shows", "calendar", "team", "guests", "manage"];
      const buttons = getNavButtons();

      for (let i = 0; i < buttons.length; i++) {
        await user.click(buttons[i]);
        expect(handleClick).toHaveBeenLastCalledWith(expectedIds[i]);
      }

      expect(handleClick).toHaveBeenCalledTimes(6);
    });
  });

  describe("expanded mode styling", () => {
    it("has right border class in expanded mode", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("border-r");
    });

    it("has border color token class in expanded mode", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("border-[var(--colour-interface-border-primary-light)]");
    });

    it("has shadow in expanded mode", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("shadow-[1px_0px_10px_0px_rgba(38,44,52,0.08)]");
    });
  });

  describe("collapsed mode styling", () => {
    it("has transparent border in collapsed mode", () => {
      render(<SideNavbar defaultCollapsed />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("border-r");
      expect(nav).toHaveClass("border-transparent");
    });

    it("has zero-alpha shadow in collapsed mode", () => {
      render(<SideNavbar defaultCollapsed />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("shadow-[1px_0px_10px_0px_rgba(38,44,52,0)]");
    });
  });

  describe("defaultCollapsed initial state", () => {
    it("starts expanded when defaultCollapsed is false", () => {
      render(<SideNavbar defaultCollapsed={false} />);
      expect(screen.getByRole("navigation")).toHaveClass("w-[228px]");
    });

    it("starts collapsed when defaultCollapsed is true", () => {
      render(<SideNavbar defaultCollapsed={true} />);
      expect(screen.getByRole("navigation")).toHaveClass("w-[120px]");
    });
  });

  describe("toggle behavior", () => {
    it("clicking logo toggles from expanded to collapsed", async () => {
      const user = userEvent.setup();
      render(<SideNavbar />);

      const logoButton = screen.getByTitle("Collapse sidebar");
      await user.click(logoButton);

      expect(screen.getByTitle("Expand sidebar")).toBeInTheDocument();
      expect(screen.getByRole("navigation")).toHaveClass("w-[120px]");
    });

    it("clicking logo toggles from collapsed to expanded", async () => {
      const user = userEvent.setup();
      render(<SideNavbar defaultCollapsed />);

      const logoButton = screen.getByTitle("Expand sidebar");
      await user.click(logoButton);

      expect(screen.getByTitle("Collapse sidebar")).toBeInTheDocument();
      expect(screen.getByRole("navigation")).toHaveClass("w-[228px]");
    });

    it("double-clicking logo returns to original state", async () => {
      const user = userEvent.setup();
      render(<SideNavbar />);

      const logoButton = screen.getByTitle("Collapse sidebar");
      await user.click(logoButton);
      await user.click(screen.getByTitle("Expand sidebar"));

      expect(screen.getByTitle("Collapse sidebar")).toBeInTheDocument();
      expect(screen.getByRole("navigation")).toHaveClass("w-[228px]");
    });
  });

  describe("onToggle callback", () => {
    it("fires with true when collapsing", async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<SideNavbar onToggle={handleToggle} />);

      await user.click(screen.getByTitle("Collapse sidebar"));
      expect(handleToggle).toHaveBeenCalledWith(true);
    });

    it("fires with false when expanding", async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      render(<SideNavbar defaultCollapsed onToggle={handleToggle} />);

      await user.click(screen.getByTitle("Expand sidebar"));
      expect(handleToggle).toHaveBeenCalledWith(false);
    });

    it("does not throw when onToggle is not provided", async () => {
      const user = userEvent.setup();
      render(<SideNavbar />);

      await expect(
        user.click(screen.getByTitle("Collapse sidebar")),
      ).resolves.not.toThrow();
    });
  });

  describe("transition animations", () => {
    it("nav element has width transition classes", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("transition-[width,border-color,box-shadow]");
      expect(nav).toHaveClass("duration-200");
      expect(nav).toHaveClass("ease-in-out");
    });

    it("nav element has overflow-hidden", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("overflow-hidden");
    });

    it("MediaPlans text has opacity transition in expanded mode", () => {
      render(<SideNavbar />);
      const text = screen.getByText("MediaPlans");
      expect(text).toHaveClass("transition-opacity");
      expect(text).toHaveClass("duration-150");
      expect(text).toHaveClass("opacity-100");
    });

    it("MediaPlans text has opacity-0 in collapsed mode", () => {
      render(<SideNavbar defaultCollapsed />);
      const text = screen.getByText("MediaPlans");
      expect(text).toHaveClass("transition-opacity");
      expect(text).toHaveClass("duration-150");
      expect(text).toHaveClass("opacity-0");
    });

    it("nav item labels have opacity transition in expanded mode", () => {
      render(<SideNavbar />);
      const label = screen.getByText("Home");
      expect(label).toHaveClass("transition-opacity");
      expect(label).toHaveClass("duration-150");
      expect(label).toHaveClass("opacity-100");
    });

    it("nav item labels have opacity-0 in collapsed mode", () => {
      render(<SideNavbar defaultCollapsed />);
      const label = screen.getByText("Home");
      expect(label).toHaveClass("transition-opacity");
      expect(label).toHaveClass("duration-150");
      expect(label).toHaveClass("opacity-0");
    });
  });

  describe("logo button title attribute", () => {
    it("shows 'Collapse sidebar' when expanded", () => {
      render(<SideNavbar />);
      expect(screen.getByTitle("Collapse sidebar")).toBeInTheDocument();
    });

    it("shows 'Expand sidebar' when collapsed", () => {
      render(<SideNavbar defaultCollapsed />);
      expect(screen.getByTitle("Expand sidebar")).toBeInTheDocument();
    });

    it("logo button has cursor-pointer class", () => {
      render(<SideNavbar />);
      const logoButton = screen.getByTitle("Collapse sidebar");
      expect(logoButton).toHaveClass("cursor-pointer");
    });
  });

  describe("collapsed aria-hidden on text elements", () => {
    it("MediaPlans text has aria-hidden when collapsed", () => {
      render(<SideNavbar defaultCollapsed />);
      const text = screen.getByText("MediaPlans");
      expect(text).toHaveAttribute("aria-hidden", "true");
    });

    it("MediaPlans text does not have aria-hidden when expanded", () => {
      render(<SideNavbar />);
      const text = screen.getByText("MediaPlans");
      expect(text).not.toHaveAttribute("aria-hidden");
    });

    it("nav item labels have aria-hidden when collapsed", () => {
      render(<SideNavbar defaultCollapsed />);
      const label = screen.getByText("Home");
      expect(label).toHaveAttribute("aria-hidden", "true");
    });

    it("nav item labels do not have aria-hidden when expanded", () => {
      render(<SideNavbar />);
      const label = screen.getByText("Home");
      expect(label).not.toHaveAttribute("aria-hidden");
    });
  });
});
