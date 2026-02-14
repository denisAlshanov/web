import React from "react";
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

    it("hides text visually in collapsed mode with opacity-0", () => {
      render(<NavbarItem {...defaultProps} collapsed />);
      const label = screen.getByText("Home");
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("opacity-0");
    });

    it("has opacity transition classes when collapsed", () => {
      render(<NavbarItem {...defaultProps} collapsed />);
      const label = screen.getByText("Home");
      expect(label).toHaveClass("transition-opacity", "duration-150", "opacity-0");
    });

    it("has opacity-100 and transition classes when expanded", () => {
      render(<NavbarItem {...defaultProps} />);
      const label = screen.getByText("Home");
      expect(label).toHaveClass("transition-opacity", "duration-150", "opacity-100");
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

    it("has aria-hidden on label text when collapsed", () => {
      render(<NavbarItem {...defaultProps} collapsed />);
      const label = screen.getByText("Home");
      expect(label).toHaveAttribute("aria-hidden", "true");
    });

    it("does not have aria-hidden on label text when expanded", () => {
      render(<NavbarItem {...defaultProps} />);
      const label = screen.getByText("Home");
      expect(label).not.toHaveAttribute("aria-hidden");
    });
  });

  describe("native HTML attributes passthrough", () => {
    it("forwards data-* attributes", () => {
      render(<NavbarItem {...defaultProps} data-testid="nav-home" />);
      expect(screen.getByTestId("nav-home")).toBeInTheDocument();
    });

    it("forwards aria-* attributes", () => {
      render(<NavbarItem {...defaultProps} aria-describedby="tooltip-1" />);
      const element = screen.getByRole("button");
      expect(element).toHaveAttribute("aria-describedby", "tooltip-1");
    });

    it("forwards target and rel on links", () => {
      render(
        <NavbarItem
          {...defaultProps}
          href="https://external.com"
          target="_blank"
          rel="noopener noreferrer"
        />,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("provides event object to onClick handler", () => {
      const onClick = vi.fn();
      render(<NavbarItem {...defaultProps} onClick={onClick} />);
      screen.getByRole("button").click();
      expect(onClick).toHaveBeenCalledOnce();
      // React wraps native events in SyntheticEvent with nativeEvent property
      expect(onClick.mock.calls[0][0]).toHaveProperty("nativeEvent");
    });
  });

  describe("asChild composition", () => {
    it("renders child element when asChild is true", () => {
      render(
        <NavbarItem {...defaultProps} asChild>
          <a href="/dashboard" data-testid="child-link">
            slot
          </a>
        </NavbarItem>,
      );
      const link = screen.getByTestId("child-link");
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/dashboard");
    });

    it("merges className with child when asChild is true", () => {
      render(
        <NavbarItem {...defaultProps} asChild className="extra-class">
          <a href="/dashboard" className="child-class">
            slot
          </a>
        </NavbarItem>,
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass("child-class");
      expect(link).toHaveClass("extra-class");
    });

    it("replaces child text with internal content in asChild mode", () => {
      render(
        <NavbarItem {...defaultProps} asChild>
          <a href="/dashboard">slot</a>
        </NavbarItem>,
      );
      // Internal label should be rendered
      expect(screen.getByText("Home")).toBeInTheDocument();
      // Child's original text should be replaced, not duplicated
      expect(screen.queryByText("slot")).not.toBeInTheDocument();
    });

    it("renders icon in asChild mode", () => {
      render(
        <NavbarItem {...defaultProps} asChild>
          <a href="/dashboard">slot</a>
        </NavbarItem>,
      );
      expect(screen.getByTestId("outline-icon")).toBeInTheDocument();
    });
  });
});
