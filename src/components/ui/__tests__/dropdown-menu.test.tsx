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
import { IconButton } from "../icon-button";
import { Icon } from "../icon";

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

/* ─────────────────────────────────────────────────────── */
/* Task 4: DropdownMenu composed widget tests              */
/* ─────────────────────────────────────────────────────── */

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg data-testid="menu-icon" {...props}>
      <path d="M3 5h18M3 12h18M3 19h18" />
    </svg>
  );
}

/**
 * Helper: render a full composed DropdownMenu with IconButton trigger.
 * The trigger is a 40x40 pill button with a hamburger (Menu) icon.
 */
function renderComposedMenu(
  props?: Partial<React.ComponentPropsWithoutRef<typeof DropdownMenu>>,
) {
  return render(
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <IconButton
          icon={<Icon icon={MenuIcon} />}
          aria-label="Open menu"
          variant="ghost"
          size="xs"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6}>
        <DropdownMenuItem icon={PlusIcon}>Add item</DropdownMenuItem>
        <DropdownMenuItem icon={EditIcon}>Edit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  );
}

describe("DropdownMenu (composed widget)", () => {
  describe("trigger button", () => {
    it("renders trigger button with hamburger Menu icon", () => {
      renderComposedMenu();

      const trigger = screen.getByRole("button", { name: /open menu/i });
      expect(trigger).toBeInTheDocument();
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
    });

    it("trigger is a 40x40 pill (size xs = size-10, rounded-full)", () => {
      renderComposedMenu();

      const trigger = screen.getByRole("button", { name: /open menu/i });
      expect(trigger.className).toContain("size-10");
      expect(trigger.className).toContain("rounded-full");
    });
  });

  describe("open/close behavior", () => {
    it("clicking trigger opens the dropdown", async () => {
      const user = userEvent.setup();
      renderComposedMenu();

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /open menu/i }));

      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    });

    it("dropdown is not visible before trigger is clicked", () => {
      renderComposedMenu();

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("ARIA attributes", () => {
    it("has role=menu on the dropdown content when open", async () => {
      const user = userEvent.setup();
      renderComposedMenu();

      await user.click(screen.getByRole("button", { name: /open menu/i }));

      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("trigger has aria-expanded=true when open", async () => {
      const user = userEvent.setup();
      renderComposedMenu();

      const trigger = screen.getByRole("button", { name: /open menu/i });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("menu items have role=menuitem", async () => {
      const user = userEvent.setup();
      renderComposedMenu();

      await user.click(screen.getByRole("button", { name: /open menu/i }));

      const items = screen.getAllByRole("menuitem");
      expect(items).toHaveLength(2);
    });
  });

  describe("keyboard interaction", () => {
    it("pressing Escape closes the dropdown", async () => {
      const user = userEvent.setup();
      renderComposedMenu();

      await user.click(screen.getByRole("button", { name: /open menu/i }));
      expect(screen.getByRole("menu")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("arrow down from trigger opens the menu and highlights an item", async () => {
      const user = userEvent.setup();
      renderComposedMenu();

      const trigger = screen.getByRole("button", { name: /open menu/i });
      trigger.focus();

      // ArrowDown on the trigger opens the menu (Radix behavior)
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(screen.getAllByRole("menuitem").length).toBeGreaterThan(0);
    });

    it("Enter activates a menu item", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button">Trigger</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onSelect}>Action</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: /trigger/i }));
      expect(screen.getByRole("menu")).toBeInTheDocument();

      // Navigate to the item and press Enter
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");
      expect(onSelect).toHaveBeenCalledOnce();
    });
  });

  describe("custom trigger", () => {
    it("renders custom trigger when a different element is provided", async () => {
      const user = userEvent.setup();

      render(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button">Custom trigger</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={PlusIcon}>Add item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      const customTrigger = screen.getByRole("button", {
        name: /custom trigger/i,
      });
      expect(customTrigger).toBeInTheDocument();

      await user.click(customTrigger);
      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(screen.getByRole("menuitem")).toBeInTheDocument();
    });
  });

  describe("controlled open/onOpenChange", () => {
    it("forwards open and onOpenChange props to Radix Root", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <DropdownMenu open={false} onOpenChange={onOpenChange}>
          <DropdownMenuTrigger asChild>
            <button type="button">Trigger</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>,
      );

      await user.click(screen.getByRole("button", { name: /trigger/i }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });
});
