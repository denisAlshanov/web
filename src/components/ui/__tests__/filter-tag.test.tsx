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
    it("applies aria-disabled attribute", () => {
      render(<FilterTag disabled>Genre</FilterTag>);

      const el = screen.getByRole("button", { name: "Genre" });
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
    it("renders edit and delete action buttons when editable", () => {
      render(<FilterTag editable>Genre</FilterTag>);

      expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Delete" }),
      ).toBeInTheDocument();
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

    it("hides action buttons by default via hidden class", () => {
      render(<FilterTag editable>Genre</FilterTag>);

      const editBtn = screen.getByRole("button", { name: "Edit" });
      const wrapper = editBtn.parentElement!;
      expect(wrapper.className).toContain("hidden");
      expect(wrapper.className).toContain("group-hover:flex");
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

      const el = screen.getByRole("button", { name: "Genre" });
      expect(el.className).toContain(
        "border-[var(--colour-interface-border-primary-medium)]",
      );
      expect(el.className).toContain(
        "text-[color:var(--colour-interface-text-default)]",
      );
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

      const icon = screen
        .getByRole("button", { name: "Genre" })
        .querySelector("svg");
      expect(icon?.getAttribute("class")).toContain(
        "text-[color:var(--colour-interface-icon-default)]",
      );
    });
  });
});
