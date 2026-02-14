import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { SVGProps } from "react";

import { AccountSettingsItem } from "../account-settings";

// Minimal stub icons for testing
function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg data-testid="user-icon" {...props}>
      <path d="M0 0" />
    </svg>
  );
}

function LogOutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg data-testid="logout-icon" {...props}>
      <path d="M0 0" />
    </svg>
  );
}

describe("AccountSettingsItem", () => {
  describe("Default style", () => {
    it("renders icon and text with default colors", () => {
      render(
        <AccountSettingsItem icon={UserIcon} style="default">
          Account Info
        </AccountSettingsItem>,
      );

      expect(screen.getByText("Account Info")).toBeInTheDocument();
      expect(screen.getByTestId("user-icon")).toBeInTheDocument();
    });

    it("applies default text color token", () => {
      render(
        <AccountSettingsItem icon={UserIcon} style="default">
          Account Info
        </AccountSettingsItem>,
      );

      const button = screen.getByRole("button");
      expect(button.className).toContain(
        "text-[color:var(--colour-interface-text-default)]",
      );
    });

    it("applies default background tokens", () => {
      render(
        <AccountSettingsItem icon={UserIcon} style="default">
          Account Info
        </AccountSettingsItem>,
      );

      const button = screen.getByRole("button");
      expect(button.className).toContain(
        "bg-[var(--colour-interface-background-singletone-default)]",
      );
    });
  });

  describe("Danger style", () => {
    it("renders icon and text with danger colors", () => {
      render(
        <AccountSettingsItem icon={LogOutIcon} style="danger">
          Log out
        </AccountSettingsItem>,
      );

      expect(screen.getByText("Log out")).toBeInTheDocument();
      expect(screen.getByTestId("logout-icon")).toBeInTheDocument();
    });

    it("applies danger text color token", () => {
      render(
        <AccountSettingsItem icon={LogOutIcon} style="danger">
          Log out
        </AccountSettingsItem>,
      );

      const button = screen.getByRole("button");
      expect(button.className).toContain(
        "text-[color:var(--colour-interface-text-semantic-danger)]",
      );
    });

    it("applies danger background tokens", () => {
      render(
        <AccountSettingsItem icon={LogOutIcon} style="danger">
          Log out
        </AccountSettingsItem>,
      );

      const button = screen.getByRole("button");
      expect(button.className).toContain(
        "bg-[var(--colour-interface-background-semantic-danger-default)]",
      );
    });

    it("uses danger icon color", () => {
      render(
        <AccountSettingsItem icon={LogOutIcon} style="danger">
          Log out
        </AccountSettingsItem>,
      );

      // The Icon wrapper should have the danger color class
      // Note: SVG elements use getAttribute("class") instead of className (which is SVGAnimatedString)
      const icon = screen.getByTestId("logout-icon");
      expect(icon.getAttribute("class")).toContain(
        "text-[color:var(--colour-interface-icon-semantic-danger)]",
      );
    });
  });

  describe("icon and children props", () => {
    it("accepts custom icon prop as a React component", () => {
      function CustomIcon(props: SVGProps<SVGSVGElement>) {
        return (
          <svg data-testid="custom-icon" {...props}>
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
      }

      render(
        <AccountSettingsItem icon={CustomIcon}>
          Custom Item
        </AccountSettingsItem>,
      );

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      expect(screen.getByText("Custom Item")).toBeInTheDocument();
    });

    it("renders children text content", () => {
      render(
        <AccountSettingsItem icon={UserIcon}>
          Settings
        </AccountSettingsItem>,
      );

      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });

  describe("renders as a button", () => {
    it("renders as a button element by default", () => {
      render(
        <AccountSettingsItem icon={UserIcon}>
          Account Info
        </AccountSettingsItem>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByRole("button").tagName).toBe("BUTTON");
    });

    it("calls onClick handler when clicked", () => {
      const onClick = vi.fn();
      render(
        <AccountSettingsItem icon={UserIcon} onClick={onClick}>
          Account Info
        </AccountSettingsItem>,
      );

      screen.getByRole("button").click();
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("forwards className prop", () => {
      render(
        <AccountSettingsItem icon={UserIcon} className="custom-class">
          Account Info
        </AccountSettingsItem>,
      );

      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });
});
