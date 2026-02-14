import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AccountSettingsDropdown } from "../account-settings";

const defaultProps = {
  userName: "Alexander Plushev",
  roles: ["host", "producer"] as Array<"host" | "producer">,
};

describe("AccountSettingsDropdown", () => {
  describe("avatar", () => {
    it("renders avatar image with 64x64 dimensions", () => {
      render(
        <AccountSettingsDropdown
          {...defaultProps}
          avatarUrl="/avatars/user.jpg"
        />,
      );

      const avatar = screen.getByRole("img", { name: /alexander plushev/i });
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("width", "64");
      expect(avatar).toHaveAttribute("height", "64");
    });

    it("renders avatar as a circle (rounded-full)", () => {
      render(
        <AccountSettingsDropdown
          {...defaultProps}
          avatarUrl="/avatars/user.jpg"
        />,
      );

      const avatar = screen.getByRole("img", { name: /alexander plushev/i });
      expect(avatar.className).toContain("rounded-full");
    });

    it("renders a fallback when no avatarUrl is provided", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      const fallback = screen.getByLabelText(/alexander plushev/i);
      expect(fallback).toBeInTheDocument();
    });
  });

  describe("user name", () => {
    it("renders user name text", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      expect(screen.getByText("Alexander Plushev")).toBeInTheDocument();
    });

    it("applies bold styling with heavy text color token", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      const name = screen.getByText("Alexander Plushev");
      expect(name.className).toContain("font-bold");
      expect(name.className).toContain(
        "text-[color:var(--colour-interface-text-heavy)]",
      );
    });
  });

  describe("role pills", () => {
    it("renders host role pill", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      expect(screen.getByText("host")).toBeInTheDocument();
    });

    it("renders producer role pill", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      expect(screen.getByText("producer")).toBeInTheDocument();
    });

    it("renders all provided roles", () => {
      render(
        <AccountSettingsDropdown
          userName="Test User"
          roles={["host", "producer"]}
        />,
      );

      expect(screen.getByText("host")).toBeInTheDocument();
      expect(screen.getByText("producer")).toBeInTheDocument();
    });
  });

  describe("settings header", () => {
    it("renders SETTINGS header in uppercase", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      const header = screen.getByText("SETTINGS");
      expect(header).toBeInTheDocument();
    });

    it("applies eyebrow typography class", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      const header = screen.getByText("SETTINGS");
      expect(header.className).toContain("text-heading-eyebrow");
    });

    it("applies supporting text color", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      const header = screen.getByText("SETTINGS");
      expect(header.className).toContain(
        "text-[color:var(--colour-interface-text-supporting)]",
      );
    });
  });

  describe("menu items", () => {
    it("renders Account Info item with User icon (default style)", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      const accountInfoButton = screen.getByRole("button", {
        name: /account info/i,
      });
      expect(accountInfoButton).toBeInTheDocument();
      expect(accountInfoButton.className).toContain(
        "bg-[var(--colour-interface-background-singletone-default)]",
      );
    });

    it("renders Log out item with LogOut icon (danger style)", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      const logoutButton = screen.getByRole("button", { name: /log out/i });
      expect(logoutButton).toBeInTheDocument();
      expect(logoutButton.className).toContain(
        "bg-[var(--colour-interface-background-semantic-danger-default)]",
      );
    });

    it("calls onAccountInfoClick when Account Info is clicked", () => {
      const onAccountInfoClick = vi.fn();
      render(
        <AccountSettingsDropdown
          {...defaultProps}
          onAccountInfoClick={onAccountInfoClick}
        />,
      );

      screen.getByRole("button", { name: /account info/i }).click();
      expect(onAccountInfoClick).toHaveBeenCalledOnce();
    });

    it("calls onLogoutClick when Log out is clicked", () => {
      const onLogoutClick = vi.fn();
      render(
        <AccountSettingsDropdown
          {...defaultProps}
          onLogoutClick={onLogoutClick}
        />,
      );

      screen.getByRole("button", { name: /log out/i }).click();
      expect(onLogoutClick).toHaveBeenCalledOnce();
    });
  });

  describe("container styling", () => {
    it("applies modal border radius token", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      const container = screen
        .getByText("Alexander Plushev")
        .closest("[data-testid='account-settings-dropdown']")!;
      expect(container.className).toContain(
        "rounded-[var(--number-radius-rad-modal)]",
      );
    });

    it("applies white surface background", () => {
      render(<AccountSettingsDropdown {...defaultProps} />);

      const container = screen
        .getByText("Alexander Plushev")
        .closest("[data-testid='account-settings-dropdown']")!;
      expect(container.className).toContain(
        "bg-[var(--colour-interface-surface-base)]",
      );
    });

    it("forwards className prop", () => {
      render(
        <AccountSettingsDropdown
          {...defaultProps}
          className="custom-dropdown"
        />,
      );

      const container = screen
        .getByText("Alexander Plushev")
        .closest("[data-testid='account-settings-dropdown']")!;
      expect(container).toHaveClass("custom-dropdown");
    });
  });
});
