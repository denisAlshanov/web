import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { SVGProps } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../dropdown-menu";

// Minimal stub icons for testing
function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg data-testid="plus-icon" {...props}>
      <path d="M6 12h12M12 6v12" />
    </svg>
  );
}

function EditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg data-testid="edit-icon" {...props}>
      <path d="M0 0" />
    </svg>
  );
}

/**
 * Helper to render DropdownMenuItem within the required Radix context.
 * Radix DropdownMenu.Item must be inside Root + Content.
 * We force `open` so the menu is always visible for unit tests.
 */
function renderMenuItem(ui: React.ReactElement) {
  return render(
    <DropdownMenu open>
      <DropdownMenuTrigger asChild>
        <span>trigger</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{ui}</DropdownMenuContent>
    </DropdownMenu>,
  );
}

describe("DropdownMenuItem", () => {
  describe("renders icon and text", () => {
    it("renders icon via Icon wrapper and text label", () => {
      renderMenuItem(
        <DropdownMenuItem icon={PlusIcon}>Add item</DropdownMenuItem>,
      );

      expect(screen.getByText("Add item")).toBeInTheDocument();
      expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
    });

    it("renders without an icon when icon prop is omitted", () => {
      renderMenuItem(<DropdownMenuItem>No icon item</DropdownMenuItem>);

      expect(screen.getByText("No icon item")).toBeInTheDocument();
    });
  });

  describe("default state styling", () => {
    it("has secondary-default background", () => {
      renderMenuItem(
        <DropdownMenuItem icon={PlusIcon}>Add item</DropdownMenuItem>,
      );

      const item = screen.getByRole("menuitem");
      expect(item.className).toContain(
        "bg-[var(--colour-interface-background-secondary-default)]",
      );
    });

    it("has correct text color token", () => {
      renderMenuItem(
        <DropdownMenuItem icon={PlusIcon}>Add item</DropdownMenuItem>,
      );

      const item = screen.getByRole("menuitem");
      expect(item.className).toContain(
        "text-[color:var(--colour-interface-text-default)]",
      );
    });
  });

  describe("renders as Radix DropdownMenu.Item", () => {
    it("has role=menuitem", () => {
      renderMenuItem(
        <DropdownMenuItem icon={PlusIcon}>Add item</DropdownMenuItem>,
      );

      expect(screen.getByRole("menuitem")).toBeInTheDocument();
    });
  });

  describe("accepts custom icon and children", () => {
    it("accepts custom icon prop as a React component", () => {
      renderMenuItem(
        <DropdownMenuItem icon={EditIcon}>Edit item</DropdownMenuItem>,
      );

      expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
      expect(screen.getByText("Edit item")).toBeInTheDocument();
    });

    it("renders children text content", () => {
      renderMenuItem(
        <DropdownMenuItem icon={PlusIcon}>
          Some action
        </DropdownMenuItem>,
      );

      expect(screen.getByText("Some action")).toBeInTheDocument();
    });
  });

  describe("onClick handler", () => {
    it("calls onClick when the item is clicked", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      renderMenuItem(
        <DropdownMenuItem icon={PlusIcon} onSelect={onClick}>
          Add item
        </DropdownMenuItem>,
      );

      await user.click(screen.getByRole("menuitem"));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe("className forwarding", () => {
    it("forwards custom className", () => {
      renderMenuItem(
        <DropdownMenuItem icon={PlusIcon} className="custom-test-class">
          Add item
        </DropdownMenuItem>,
      );

      const item = screen.getByRole("menuitem");
      expect(item).toHaveClass("custom-test-class");
    });
  });
});

/**
 * Helper to render DropdownMenuContent within the required Radix context.
 * Forces `open` so the content is always visible for unit tests.
 */
function renderContent(
  contentProps?: Partial<
    React.ComponentPropsWithoutRef<typeof DropdownMenuContent>
  >,
  children?: React.ReactNode,
) {
  return render(
    <DropdownMenu open>
      <DropdownMenuTrigger asChild>
        <span>trigger</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent {...contentProps}>
        {children ?? (
          <>
            <DropdownMenuItem icon={PlusIcon}>Item 1</DropdownMenuItem>
            <DropdownMenuItem icon={EditIcon}>Item 2</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>,
  );
}

describe("DropdownMenuContent", () => {
  describe("renders children (DropdownMenuItem items)", () => {
    it("renders multiple DropdownMenuItem children", () => {
      renderContent();

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    });

    it("renders a single child", () => {
      renderContent(
        {},
        <DropdownMenuItem icon={PlusIcon}>Only item</DropdownMenuItem>,
      );

      expect(screen.getByText("Only item")).toBeInTheDocument();
      expect(screen.getAllByRole("menuitem")).toHaveLength(1);
    });
  });

  describe("min-width of 120px", () => {
    it("has min-w-[120px] class", () => {
      renderContent();

      const content = screen.getByRole("menu");
      expect(content.className).toContain("min-w-[120px]");
    });
  });

  describe("border-radius and shadow", () => {
    it("has correct border-radius token class", () => {
      renderContent();

      const content = screen.getByRole("menu");
      expect(content.className).toContain(
        "rounded-[var(--number-radius-rad-modal)]",
      );
    });

    it("has correct shadow class", () => {
      renderContent();

      const content = screen.getByRole("menu");
      expect(content.className).toContain(
        "shadow-[0px_1px_8px_0px_rgba(38,44,52,0.04)]",
      );
    });
  });

  describe("overflow is clipped", () => {
    it("has overflow-clip class", () => {
      renderContent();

      const content = screen.getByRole("menu");
      expect(content.className).toContain("overflow-clip");
    });
  });

  describe("props forwarding", () => {
    it("forwards custom className", () => {
      renderContent({ className: "custom-content-class" });

      const content = screen.getByRole("menu");
      expect(content).toHaveClass("custom-content-class");
    });

    it("has flex column layout", () => {
      renderContent();

      const content = screen.getByRole("menu");
      expect(content.className).toContain("flex");
      expect(content.className).toContain("flex-col");
    });
  });
});
