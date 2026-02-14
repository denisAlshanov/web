import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Plus, Xmark } from "iconoir-react";

import { FilterTag } from "../filter-tag";

describe("FilterTag", () => {
  describe("default state", () => {
    it("renders with text", () => {
      render(<FilterTag>Genre</FilterTag>);

      expect(screen.getByRole("button", { name: "Genre" })).toBeInTheDocument();
    });

    it("renders as a button element", () => {
      render(<FilterTag>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.tagName).toBe("BUTTON");
      expect(el).toHaveAttribute("type", "button");
    });

    it("applies base styling classes", () => {
      render(<FilterTag>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.className).toContain("h-9");
      expect(el.className).toContain("min-w-16");
      expect(el.className).toContain("text-semibold-s");
      expect(el.className).toContain(
        "rounded-[var(--number-radius-rad-button)]",
      );
    });

    it("applies non-selected background and border tokens", () => {
      render(<FilterTag>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.className).toContain(
        "bg-[var(--colour-interface-surface-base)]",
      );
      expect(el.className).toContain(
        "border-[var(--colour-interface-border-primary-light)]",
      );
      expect(el.className).toContain(
        "text-[color:var(--colour-interface-text-supporting)]",
      );
    });

    it("uses focus-visible for focus ring in plain button mode", () => {
      render(<FilterTag>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.className).toContain("focus-visible:ring-2");
      expect(el.className).not.toContain("focus-within:ring-2");
    });
  });

  describe("with icons", () => {
    it("renders with a leading icon", () => {
      render(<FilterTag leadingIcon={Plus}>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      const icons = el.querySelectorAll("svg");
      expect(icons).toHaveLength(1);
    });

    it("renders with a trailing icon", () => {
      render(<FilterTag trailingIcon={Xmark}>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      const icons = el.querySelectorAll("svg");
      expect(icons).toHaveLength(1);
    });

    it("renders with both leading and trailing icons", () => {
      render(
        <FilterTag leadingIcon={Plus} trailingIcon={Xmark}>
          Genre
        </FilterTag>,
      );

      const el = screen.getByRole("button", { name: "Genre" });
      const icons = el.querySelectorAll("svg");
      expect(icons).toHaveLength(2);
    });

    it("applies supporting color to icons when not selected", () => {
      render(<FilterTag leadingIcon={Plus}>Genre</FilterTag>);

      const icon = screen.getByRole("button", { name: "Genre" }).querySelector("svg");
      expect(icon?.getAttribute("class")).toContain(
        "text-[color:var(--colour-interface-icon-supporting)]",
      );
    });
  });

  describe("selected state", () => {
    it("sets aria-pressed to true when selected", () => {
      render(<FilterTag selected>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el).toHaveAttribute("aria-pressed", "true");
    });

    it("sets aria-pressed to false when not selected", () => {
      render(<FilterTag>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el).toHaveAttribute("aria-pressed", "false");
    });

    it("applies selected background token", () => {
      render(<FilterTag selected>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.className).toContain(
        "bg-[var(--colour-interface-background-inverse-default)]",
      );
    });

    it("applies onHeavy text color token", () => {
      render(<FilterTag selected>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.className).toContain(
        "text-[color:var(--colour-interface-text-onHeavy)]",
      );
    });

    it("applies transparent border", () => {
      render(<FilterTag selected>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.className).toContain("border-transparent");
    });

    it("applies onHeavy color to icons when selected", () => {
      render(
        <FilterTag selected leadingIcon={Plus}>
          Genre
        </FilterTag>,
      );

      const icon = screen.getByRole("button", { name: "Genre" }).querySelector("svg");
      expect(icon?.getAttribute("class")).toContain(
        "text-[color:var(--colour-interface-icon-onHeavy)]",
      );
    });
  });

  describe("disabled state", () => {
    it("applies disabled and aria-disabled attributes", () => {
      render(<FilterTag disabled>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el).toBeDisabled();
      expect(el).toHaveAttribute("aria-disabled", "true");
    });

    it("has disabled styling classes", () => {
      render(<FilterTag disabled>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.className).toContain("aria-disabled:opacity-50");
      expect(el.className).toContain("aria-disabled:pointer-events-none");
    });
  });

  describe("className forwarding", () => {
    it("forwards custom className", () => {
      render(<FilterTag className="custom-class">Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el).toHaveClass("custom-class");
    });
  });

  describe("click behavior", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<FilterTag onClick={handleClick}>Genre</FilterTag>);

      await user.click(screen.getByRole("button", { name: "Genre" }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <FilterTag disabled onClick={handleClick}>
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Genre" }));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("editable mode", () => {
    it("renders as a group with edit and delete action buttons", () => {
      render(<FilterTag editable>Genre</FilterTag>);

      expect(screen.getByRole("group", { name: "Genre" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Delete" }),
      ).toBeInTheDocument();
    });

    it("renders the main button inside the group", () => {
      render(<FilterTag editable>Genre</FilterTag>);

      const group = screen.getByRole("group", { name: "Genre" });
      const mainButton = screen.getByRole("button", { name: "Genre" });
      expect(group).toContainElement(mainButton);
    });

    it("action buttons are real button elements (not role=button spans)", () => {
      render(<FilterTag editable>Genre</FilterTag>);

      const editBtn = screen.getByRole("button", { name: "Edit" });
      const deleteBtn = screen.getByRole("button", { name: "Delete" });
      expect(editBtn.tagName).toBe("BUTTON");
      expect(deleteBtn.tagName).toBe("BUTTON");
    });

    it("does not nest interactive elements inside a button", () => {
      render(<FilterTag editable>Genre</FilterTag>);

      const mainButton = screen.getByRole("button", { name: "Genre" });
      // Main button should not contain any other buttons
      const nestedButtons = mainButton.querySelectorAll("button");
      expect(nestedButtons).toHaveLength(0);
    });

    it("does not render action buttons when not editable", () => {
      render(<FilterTag>Genre</FilterTag>);

      expect(
        screen.queryByRole("button", { name: "Edit" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Delete" }),
      ).not.toBeInTheDocument();
    });

    it("overrides hover and active background to white for editable mode", () => {
      render(<FilterTag editable>Genre</FilterTag>);

      const el = screen.getByRole("group", { name: "Genre" });
      expect(el.className).toContain(
        "hover:bg-[var(--colour-interface-surface-base)]",
      );
      expect(el.className).toContain(
        "active:bg-[var(--colour-interface-surface-base)]",
      );
    });

    it("hides action buttons by default and uses focus-within for visibility", () => {
      render(<FilterTag editable>Genre</FilterTag>);

      const editBtn = screen.getByRole("button", { name: "Edit" });
      const wrapper = editBtn.parentElement!;
      expect(wrapper.className).toContain("invisible");
      expect(wrapper.className).toContain("group-hover:visible");
      expect(wrapper.className).toContain("group-focus-within:visible");
    });

    it("uses focus-within for focus ring on the editable wrapper", () => {
      render(<FilterTag editable>Genre</FilterTag>);

      const group = screen.getByRole("group", { name: "Genre" });
      expect(group.className).toContain("focus-within:ring-2");
    });

    it("does not render action buttons when selected", () => {
      render(
        <FilterTag editable selected>
          Genre
        </FilterTag>,
      );

      expect(
        screen.queryByRole("button", { name: "Edit" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Delete" }),
      ).not.toBeInTheDocument();
    });

    it("does not render action buttons when disabled", () => {
      render(
        <FilterTag editable disabled>
          Genre
        </FilterTag>,
      );

      expect(
        screen.queryByRole("button", { name: "Edit" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Delete" }),
      ).not.toBeInTheDocument();
    });

    it("calls onEdit when edit button is clicked", async () => {
      const user = userEvent.setup();
      const handleEdit = vi.fn();

      render(
        <FilterTag editable onEdit={handleEdit}>
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Edit" }));
      expect(handleEdit).toHaveBeenCalledTimes(1);
    });

    it("calls onDelete when delete button is clicked", async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();

      render(
        <FilterTag editable onDelete={handleDelete}>
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Delete" }));
      expect(handleDelete).toHaveBeenCalledTimes(1);
    });

    it("does not propagate action button clicks to parent onClick", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleEdit = vi.fn();

      render(
        <FilterTag editable onClick={handleClick} onEdit={handleEdit}>
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Edit" }));
      expect(handleEdit).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("calls onEdit when edit button is activated via Enter key", async () => {
      const user = userEvent.setup();
      const handleEdit = vi.fn();

      render(
        <FilterTag editable onEdit={handleEdit}>
          Genre
        </FilterTag>,
      );

      screen.getByRole("button", { name: "Edit" }).focus();
      await user.keyboard("{Enter}");
      expect(handleEdit).toHaveBeenCalledTimes(1);
    });

    it("calls onDelete when delete button is activated via Space key", async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();

      render(
        <FilterTag editable onDelete={handleDelete}>
          Genre
        </FilterTag>,
      );

      screen.getByRole("button", { name: "Delete" }).focus();
      await user.keyboard(" ");
      expect(handleDelete).toHaveBeenCalledTimes(1);
    });

    it("action buttons are natively focusable (real button elements)", () => {
      render(
        <FilterTag editable>
          Genre
        </FilterTag>,
      );

      const editBtn = screen.getByRole("button", { name: "Edit" });
      const deleteBtn = screen.getByRole("button", { name: "Delete" });
      // Real buttons are natively focusable, no tabIndex needed
      expect(editBtn.tagName).toBe("BUTTON");
      expect(deleteBtn.tagName).toBe("BUTTON");
    });

    it("stretches main button for complete click coverage with no wrapper padding dead zones", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<FilterTag editable onClick={handleClick}>Genre</FilterTag>);

      const group = screen.getByRole("group", { name: "Genre" });
      const mainButton = screen.getByRole("button", { name: "Genre" });
      // Structural: wrapper has no padding, button owns all padding and fills container
      expect(group.className).toContain("px-0");
      expect(mainButton.className).toContain("h-full");
      expect(mainButton.className).toContain("px-[var(--number-spacing-padding-pad-m)]");
      // Behavioral: clicking the main button fires onClick
      await user.click(mainButton);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick when the inner button is clicked in editable mode", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <FilterTag editable onClick={handleClick}>
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Genre" }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("provides HTMLButtonElement as currentTarget in editable mode onClick", async () => {
      const user = userEvent.setup();
      let capturedCurrentTarget: EventTarget | null = null;
      const handleClick = vi.fn((e: React.MouseEvent) => {
        capturedCurrentTarget = e.currentTarget;
      });

      render(
        <FilterTag editable onClick={handleClick}>
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Genre" }));
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(capturedCurrentTarget).toBeInstanceOf(HTMLButtonElement);
    });

    it("supports keyboard tab navigation between main button and actions", async () => {
      // Note: This test verifies DOM focus order only. In real browsers,
      // `invisible` (visibility: hidden) elements are NOT in the tab order.
      // The action buttons become tabbable only after `group-focus-within:visible`
      // makes them visible when the main button receives focus. jsdom does not
      // enforce CSS visibility on tab navigation, so this test passes regardless.
      // CSS-driven visibility classes are verified separately in "hides action
      // buttons by default and uses focus-within for visibility".
      const user = userEvent.setup();

      render(
        <FilterTag editable>
          Genre
        </FilterTag>,
      );

      const mainButton = screen.getByRole("button", { name: "Genre" });
      const editBtn = screen.getByRole("button", { name: "Edit" });
      const deleteBtn = screen.getByRole("button", { name: "Delete" });

      // Tab into the component - first focusable is main button
      await user.tab();
      expect(mainButton).toHaveFocus();

      // Tab to edit button (focus-within makes it visible in real browsers)
      await user.tab();
      expect(editBtn).toHaveFocus();

      // Tab to delete button
      await user.tab();
      expect(deleteBtn).toHaveFocus();
    });
  });

  describe("editing state", () => {
    it("renders confirm button when editing", () => {
      render(
        <FilterTag editable editing>
          Genre
        </FilterTag>,
      );

      expect(
        screen.getByRole("button", { name: "Confirm" }),
      ).toBeInTheDocument();
    });

    it("does not render edit/delete buttons when editing", () => {
      render(
        <FilterTag editable editing>
          Genre
        </FilterTag>,
      );

      expect(
        screen.queryByRole("button", { name: "Edit" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Delete" }),
      ).not.toBeInTheDocument();
    });

    it("applies medium border and default text color when editing", () => {
      render(
        <FilterTag editable editing>
          Genre
        </FilterTag>,
      );

      const el = screen.getByRole("group", { name: "Genre" });
      expect(el.className).toContain(
        "border-[var(--colour-interface-border-primary-medium)]",
      );
      expect(el.className).toContain(
        "text-[color:var(--colour-interface-text-default)]",
      );
    });

    it("neutralizes hover and active background when editing", () => {
      render(
        <FilterTag editable editing>
          Genre
        </FilterTag>,
      );

      const el = screen.getByRole("group", { name: "Genre" });
      expect(el.className).toContain(
        "hover:bg-[var(--colour-interface-surface-base)]",
      );
      expect(el.className).toContain(
        "active:bg-[var(--colour-interface-surface-base)]",
      );
    });

    it("calls onClick when the inner button is clicked in editing mode", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <FilterTag editable editing onClick={handleClick}>
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Genre" }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("provides HTMLButtonElement as currentTarget in editing mode onClick", async () => {
      const user = userEvent.setup();
      let capturedCurrentTarget: EventTarget | null = null;
      const handleClick = vi.fn((e: React.MouseEvent) => {
        capturedCurrentTarget = e.currentTarget;
      });

      render(
        <FilterTag editable editing onClick={handleClick}>
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Genre" }));
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(capturedCurrentTarget).toBeInstanceOf(HTMLButtonElement);
    });

    it("calls onConfirm when confirm button is clicked", async () => {
      const user = userEvent.setup();
      const handleConfirm = vi.fn();

      render(
        <FilterTag editable editing onConfirm={handleConfirm}>
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Confirm" }));
      expect(handleConfirm).toHaveBeenCalledTimes(1);
    });

    it("does not propagate confirm click to parent onClick", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleConfirm = vi.fn();

      render(
        <FilterTag
          editable
          editing
          onClick={handleClick}
          onConfirm={handleConfirm}
        >
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Confirm" }));
      expect(handleConfirm).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("calls onConfirm when confirm button is activated via Enter key", async () => {
      const user = userEvent.setup();
      const handleConfirm = vi.fn();

      render(
        <FilterTag editable editing onConfirm={handleConfirm}>
          Genre
        </FilterTag>,
      );

      screen.getByRole("button", { name: "Confirm" }).focus();
      await user.keyboard("{Enter}");
      expect(handleConfirm).toHaveBeenCalledTimes(1);
    });

    it("confirm button is a real button element", () => {
      render(
        <FilterTag editable editing>
          Genre
        </FilterTag>,
      );

      const confirmBtn = screen.getByRole("button", { name: "Confirm" });
      expect(confirmBtn.tagName).toBe("BUTTON");
    });

    it("does not show confirm button when selected", () => {
      render(
        <FilterTag editable editing selected>
          Genre
        </FilterTag>,
      );

      expect(
        screen.queryByRole("button", { name: "Confirm" }),
      ).not.toBeInTheDocument();
    });

    it("does not show confirm button when disabled", () => {
      render(
        <FilterTag editable editing disabled>
          Genre
        </FilterTag>,
      );

      expect(
        screen.queryByRole("button", { name: "Confirm" }),
      ).not.toBeInTheDocument();
    });

    it("applies default icon color when editing", () => {
      render(
        <FilterTag editable editing leadingIcon={Plus}>
          Genre
        </FilterTag>,
      );

      const mainButton = screen.getByRole("button", { name: "Genre" });
      const icon = mainButton.querySelector("svg");
      expect(icon?.getAttribute("class")).toContain(
        "text-[color:var(--colour-interface-icon-default)]",
      );
    });

    it("supports keyboard tab navigation to confirm button", async () => {
      const user = userEvent.setup();

      render(
        <FilterTag editable editing>
          Genre
        </FilterTag>,
      );

      const mainButton = screen.getByRole("button", { name: "Genre" });
      const confirmBtn = screen.getByRole("button", { name: "Confirm" });

      await user.tab();
      expect(mainButton).toHaveFocus();

      await user.tab();
      expect(confirmBtn).toHaveFocus();
    });
  });

  describe("edge cases", () => {
    it("does not apply editing styles when editing without editable", () => {
      render(<FilterTag editing>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.className).not.toContain(
        "border-[var(--colour-interface-border-primary-medium)]",
      );
      expect(
        screen.queryByRole("button", { name: "Confirm" }),
      ).not.toBeInTheDocument();
    });

    it("hides trailing icon when action buttons are shown", () => {
      render(
        <FilterTag editable trailingIcon={Xmark}>
          Genre
        </FilterTag>,
      );

      expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
      // In editable mode, trailing icon is not rendered - only action button icons
      const group = screen.getByRole("group", { name: "Genre" });
      const allSvgs = group.querySelectorAll("svg");
      // Only edit + delete icons (2), no trailing Xmark
      expect(allSvgs).toHaveLength(2);
    });

    it("hides trailing icon when confirm button is shown", () => {
      render(
        <FilterTag editable editing trailingIcon={Xmark}>
          Genre
        </FilterTag>,
      );

      expect(
        screen.getByRole("button", { name: "Confirm" }),
      ).toBeInTheDocument();
      // In editing mode, trailing icon is not rendered - only confirm icon
      const group = screen.getByRole("group", { name: "Genre" });
      const allSvgs = group.querySelectorAll("svg");
      // Only confirm icon (1), no trailing Xmark
      expect(allSvgs).toHaveLength(1);
    });

    it("forwards ref to the button element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<FilterTag ref={ref}>Genre</FilterTag>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toContain("Genre");
    });

    it("forwards ref to the main button in editable mode", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<FilterTag ref={ref} editable>Genre</FilterTag>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toContain("Genre");
    });

    it("does not throw when action buttons are clicked without handlers", async () => {
      const user = userEvent.setup();

      render(<FilterTag editable>Genre</FilterTag>);

      await user.click(screen.getByRole("button", { name: "Edit" }));
      await user.click(screen.getByRole("button", { name: "Delete" }));
    });

    it("does not throw when confirm button is clicked without handler", async () => {
      const user = userEvent.setup();

      render(
        <FilterTag editable editing>
          Genre
        </FilterTag>,
      );

      await user.click(screen.getByRole("button", { name: "Confirm" }));
    });

    it("forwards additional HTML attributes to the button", () => {
      render(
        <FilterTag data-testid="my-filter" title="Filter by genre">
          Genre
        </FilterTag>,
      );

      const el = screen.getByTestId("my-filter");
      expect(el).toHaveAttribute("title", "Filter by genre");
    });

    it("renders as plain button when not editable (no group wrapper)", () => {
      render(<FilterTag>Genre</FilterTag>);

      expect(screen.queryByRole("group")).not.toBeInTheDocument();
      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.tagName).toBe("BUTTON");
    });
  });
});
