import { render, screen } from "@testing-library/react";
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
      const buttons = screen.getAllByRole("button");
      const labels = buttons.map((btn) => btn.textContent?.trim());
      expect(labels).toEqual(NAV_LABELS);
    });
  });

  describe("collapsed mode", () => {
    it("renders MediaPlansLogo", () => {
      render(<SideNavbar collapsed />);
      expect(screen.getByRole("img", { name: "MediaPlans logo" })).toBeInTheDocument();
    });

    it("does not render 'MediaPlans' text", () => {
      render(<SideNavbar collapsed />);
      expect(screen.queryByText("MediaPlans")).not.toBeInTheDocument();
    });

    it("renders all 6 nav items", () => {
      render(<SideNavbar collapsed />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(6);
    });

    it("renders nav items with collapsed prop (sr-only labels)", () => {
      render(<SideNavbar collapsed />);
      for (const label of NAV_LABELS) {
        const element = screen.getByText(label);
        expect(element).toHaveClass("sr-only");
      }
    });

    it("renders nav items with aria-label for accessibility", () => {
      render(<SideNavbar collapsed />);
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
      const buttons = screen.getAllByRole("button");

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
    it("does NOT have right border class in collapsed mode", () => {
      render(<SideNavbar collapsed />);
      const nav = screen.getByRole("navigation");
      expect(nav).not.toHaveClass("border-r");
    });

    it("does NOT have shadow in collapsed mode", () => {
      render(<SideNavbar collapsed />);
      const nav = screen.getByRole("navigation");
      expect(nav).not.toHaveClass("shadow-[1px_0px_10px_0px_rgba(38,44,52,0.08)]");
    });
  });
});
