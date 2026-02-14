import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { SVGProps } from "react";

import { NavbarItem } from "../navbar-item";

// Minimal stub icons for testing
function OutlineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg data-testid="outline-icon" {...props}>
      <path d="M0 0" />
    </svg>
  );
}

function SolidIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg data-testid="solid-icon" {...props}>
      <path d="M0 0" fill="currentColor" />
    </svg>
  );
}

describe("NavbarItem", () => {
  const defaultProps = {
    label: "Home",
    icon: OutlineIcon,
    activeIcon: SolidIcon,
  };

  describe("expanded mode (default)", () => {
    it("renders with text label", () => {
      render(<NavbarItem {...defaultProps} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("renders the text label visibly", () => {
      render(<NavbarItem {...defaultProps} />);
      const label = screen.getByText("Home");
      expect(label).toBeVisible();
    });

    it("renders an icon", () => {
      render(<NavbarItem {...defaultProps} />);
      expect(screen.getByTestId("outline-icon")).toBeInTheDocument();
    });
  });

  describe("collapsed mode", () => {
    it("renders icon in collapsed mode", () => {
      render(<NavbarItem {...defaultProps} collapsed />);
      expect(screen.getByTestId("outline-icon")).toBeInTheDocument();
    });

    it("hides text visually in collapsed mode", () => {
      render(<NavbarItem {...defaultProps} collapsed />);
      // Text should exist in DOM for accessibility but be visually hidden
      const label = screen.getByText("Home");
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("sr-only");
    });
  });

  describe("typography", () => {
    it("applies text-medium-m typography for default (non-active) state", () => {
      render(<NavbarItem {...defaultProps} />);
      const label = screen.getByText("Home");
      expect(label).toHaveClass("text-medium-m");
    });

    it("applies text-semibold-m typography for active state", () => {
      render(<NavbarItem {...defaultProps} active />);
      const label = screen.getByText("Home");
      expect(label).toHaveClass("text-semibold-m");
    });
  });

  describe("icon switching", () => {
    it("renders outline icon when not active", () => {
      render(<NavbarItem {...defaultProps} />);
      expect(screen.getByTestId("outline-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("solid-icon")).not.toBeInTheDocument();
    });

    it("renders solid icon when active", () => {
      render(<NavbarItem {...defaultProps} active />);
      expect(screen.getByTestId("solid-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("outline-icon")).not.toBeInTheDocument();
    });
  });

  describe("active state styling", () => {
    it("applies shadow class when active", () => {
      render(<NavbarItem {...defaultProps} active />);
      const element = screen.getByRole("button");
      expect(element.className).toContain("shadow-");
    });

    it("does not apply shadow class when not active", () => {
      render(<NavbarItem {...defaultProps} />);
      const element = screen.getByRole("button");
      expect(element.className).not.toContain("shadow-");
    });
  });

  describe("accessibility", () => {
    it("renders as a link when href is provided", () => {
      render(<NavbarItem {...defaultProps} href="/dashboard" />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/dashboard");
    });

    it("renders as a button when no href is provided", () => {
      render(<NavbarItem {...defaultProps} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("has accessible name from label text (button)", () => {
      render(<NavbarItem {...defaultProps} />);
      expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
    });

    it("has accessible name from label text (link)", () => {
      render(<NavbarItem {...defaultProps} href="/dashboard" />);
      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    });

    it("sets aria-current=page when active", () => {
      render(<NavbarItem {...defaultProps} active />);
      const element = screen.getByRole("button");
      expect(element).toHaveAttribute("aria-current", "page");
    });

    it("does not set aria-current when not active", () => {
      render(<NavbarItem {...defaultProps} />);
      const element = screen.getByRole("button");
      expect(element).not.toHaveAttribute("aria-current");
    });

    it("calls onClick handler when clicked", () => {
      const onClick = vi.fn();
      render(<NavbarItem {...defaultProps} onClick={onClick} />);
      screen.getByRole("button").click();
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("forwards className prop", () => {
      render(<NavbarItem {...defaultProps} className="custom-class" />);
      const element = screen.getByRole("button");
      expect(element).toHaveClass("custom-class");
    });
  });

  describe("collapsed mode accessibility", () => {
    it("has aria-label with label text when collapsed", () => {
      render(<NavbarItem {...defaultProps} collapsed />);
      const element = screen.getByRole("button");
      expect(element).toHaveAttribute("aria-label", "Home");
    });

    it("does not have aria-label when expanded (text is visible)", () => {
      render(<NavbarItem {...defaultProps} />);
      const element = screen.getByRole("button");
      expect(element).not.toHaveAttribute("aria-label");
    });

    it("has aria-label with label text when collapsed as link", () => {
      render(<NavbarItem {...defaultProps} collapsed href="/dashboard" />);
      const element = screen.getByRole("link");
      expect(element).toHaveAttribute("aria-label", "Home");
    });

    it("sets aria-current=page when collapsed and active", () => {
      render(<NavbarItem {...defaultProps} collapsed active />);
      const element = screen.getByRole("button");
      expect(element).toHaveAttribute("aria-current", "page");
      expect(element).toHaveAttribute("aria-label", "Home");
    });
  });
});
