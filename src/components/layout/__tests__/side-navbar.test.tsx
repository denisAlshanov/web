import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SideNavbar } from "../side-navbar";

describe("SideNavbar", () => {
  const NAV_LABELS = ["Home", "Shows", "Calendar", "Team", "Guests", "Manage"];

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

  describe("collapsed state (default)", () => {
    it("starts collapsed with 60px width", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("w-[60px]");
    });

    it("renders MediaPlansLogo", () => {
      render(<SideNavbar />);
      expect(screen.getByRole("img", { name: "MediaPlans logo" })).toBeInTheDocument();
    });

    it("renders 'MediaPlans' text with opacity-0 when collapsed", () => {
      render(<SideNavbar />);
      const text = screen.getByText("MediaPlans");
      expect(text).toHaveClass("opacity-0");
    });

    it("renders all 6 nav items", () => {
      render(<SideNavbar />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(6);
    });

    it("renders nav items with collapsed prop (opacity-0 labels)", () => {
      render(<SideNavbar />);
      for (const label of NAV_LABELS) {
        const element = screen.getByText(label);
        expect(element).toHaveClass("opacity-0");
      }
    });

    it("renders nav items with aria-label for accessibility", () => {
      render(<SideNavbar />);
      for (const label of NAV_LABELS) {
        expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
      }
    });

    it("has transparent border in collapsed state", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("border-r");
      expect(nav).toHaveClass("border-transparent");
    });

    it("has zero-alpha shadow in collapsed state", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("shadow-[1px_0px_10px_0px_rgba(38,44,52,0)]");
    });

    it("has collapsed padding px-[2px]", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("px-[2px]");
    });
  });

  describe("hover expand behavior", () => {
    it("expands to 228px on mouseEnter", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");

      fireEvent.mouseEnter(nav);

      expect(nav).toHaveClass("w-[228px]");
    });

    it("collapses back to 60px on mouseLeave", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");

      fireEvent.mouseEnter(nav);
      expect(nav).toHaveClass("w-[228px]");

      fireEvent.mouseLeave(nav);
      expect(nav).toHaveClass("w-[60px]");
    });

    it("shows MediaPlans text with opacity-100 when expanded", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");

      fireEvent.mouseEnter(nav);

      const text = screen.getByText("MediaPlans");
      expect(text).toHaveClass("opacity-100");
    });

    it("has shadow when expanded", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");

      fireEvent.mouseEnter(nav);

      expect(nav).toHaveClass("shadow-[1px_0px_10px_0px_rgba(38,44,52,0.08)]");
    });

    it("has border color when expanded", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");

      fireEvent.mouseEnter(nav);

      expect(nav).toHaveClass("border-[var(--colour-interface-border-primary-light)]");
    });

    it("has expanded padding px-[12px] when expanded", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");

      fireEvent.mouseEnter(nav);

      expect(nav).toHaveClass("px-[12px]");
    });

    it("nav item labels become visible when expanded", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");

      fireEvent.mouseEnter(nav);

      for (const label of NAV_LABELS) {
        const element = screen.getByText(label);
        expect(element).toHaveClass("opacity-100");
      }
    });
  });

  describe("overlay positioning", () => {
    it("is absolutely positioned", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("absolute");
    });

    it("has z-50 z-index", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("z-50");
    });

    it("is positioned at top-0 left-0 bottom-0", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("top-0");
      expect(nav).toHaveClass("left-0");
      expect(nav).toHaveClass("bottom-0");
    });
  });

  describe("logo is static (no toggle)", () => {
    it("does not have a button wrapping the logo", () => {
      render(<SideNavbar />);
      const logo = screen.getByRole("img", { name: "MediaPlans logo" });
      // The logo's parent should be a div, not a button
      expect(logo.closest("button")).toBeNull();
    });

    it("does not have an expand/collapse sidebar button", () => {
      render(<SideNavbar />);
      expect(screen.queryByTitle("Collapse sidebar")).not.toBeInTheDocument();
      expect(screen.queryByTitle("Expand sidebar")).not.toBeInTheDocument();
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
      const buttons = screen.getAllByRole("button");

      for (let i = 0; i < buttons.length; i++) {
        await user.click(buttons[i]);
        expect(handleClick).toHaveBeenLastCalledWith(expectedIds[i]);
      }

      expect(handleClick).toHaveBeenCalledTimes(6);
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

    it("MediaPlans text has opacity transition", () => {
      render(<SideNavbar />);
      const text = screen.getByText("MediaPlans");
      expect(text).toHaveClass("transition-opacity");
      expect(text).toHaveClass("duration-150");
    });

    it("nav item labels have opacity transition", () => {
      render(<SideNavbar />);
      const label = screen.getByText("Home");
      expect(label).toHaveClass("transition-opacity");
      expect(label).toHaveClass("duration-150");
    });
  });

  describe("collapsed aria-hidden on text elements", () => {
    it("MediaPlans text has aria-hidden when collapsed", () => {
      render(<SideNavbar />);
      const text = screen.getByText("MediaPlans");
      expect(text).toHaveAttribute("aria-hidden", "true");
    });

    it("MediaPlans text does not have aria-hidden when expanded", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      fireEvent.mouseEnter(nav);
      const text = screen.getByText("MediaPlans");
      expect(text).not.toHaveAttribute("aria-hidden");
    });

    it("nav item labels have aria-hidden when collapsed", () => {
      render(<SideNavbar />);
      const label = screen.getByText("Home");
      expect(label).toHaveAttribute("aria-hidden", "true");
    });

    it("nav item labels do not have aria-hidden when expanded", () => {
      render(<SideNavbar />);
      const nav = screen.getByRole("navigation");
      fireEvent.mouseEnter(nav);
      const label = screen.getByText("Home");
      expect(label).not.toHaveAttribute("aria-hidden");
    });
  });

  describe("nav items render in correct order", () => {
    it("renders nav items in correct order", () => {
      render(<SideNavbar />);
      const buttons = screen.getAllByRole("button");
      const labels = buttons.map((btn) => btn.textContent?.trim());
      expect(labels).toEqual(NAV_LABELS);
    });
  });
});
