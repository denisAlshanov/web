import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AccountSettings } from "../account-settings";

const defaultProps = {
  userName: "Alexander Plushev",
  roles: ["host", "producer"] as Array<"host" | "producer">,
};

describe("AccountSettings", () => {
  describe("trigger rendering", () => {
    it("renders user name in the trigger", () => {
      render(<AccountSettings {...defaultProps} />);

      expect(screen.getByText("Alexander Plushev")).toBeInTheDocument();
    });

    it("renders NavArrowDown icon when closed", () => {
      render(<AccountSettings {...defaultProps} />);

      expect(screen.getByTestId("chevron-down")).toBeInTheDocument();
      expect(screen.queryByTestId("chevron-up")).not.toBeInTheDocument();
    });

    it("renders NavArrowUp icon when open", async () => {
      const user = userEvent.setup();
      render(<AccountSettings {...defaultProps} />);

      await user.click(screen.getByRole("button"));

      expect(screen.getByTestId("chevron-up")).toBeInTheDocument();
      expect(screen.queryByTestId("chevron-down")).not.toBeInTheDocument();
    });
  });

  describe("popover behavior", () => {
    it("clicking trigger opens the dropdown", async () => {
      const user = userEvent.setup();
      render(<AccountSettings {...defaultProps} />);

      expect(
        screen.queryByTestId("account-settings-dropdown"),
      ).not.toBeInTheDocument();

      await user.click(screen.getByRole("button"));

      expect(
        screen.getByTestId("account-settings-dropdown"),
      ).toBeInTheDocument();
    });

    it("clicking trigger again closes the dropdown", async () => {
      const user = userEvent.setup();
      render(<AccountSettings {...defaultProps} />);

      const trigger = screen.getByRole("button");
      await user.click(trigger);
      expect(
        screen.getByTestId("account-settings-dropdown"),
      ).toBeInTheDocument();

      await user.click(trigger);
      expect(
        screen.queryByTestId("account-settings-dropdown"),
      ).not.toBeInTheDocument();
    });
  });

  describe("callback propagation", () => {
    it("calls onAccountInfoClick through the popover", async () => {
      const user = userEvent.setup();
      const onAccountInfoClick = vi.fn();
      render(
        <AccountSettings
          {...defaultProps}
          onAccountInfoClick={onAccountInfoClick}
        />,
      );

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button", { name: /account info/i }));

      expect(onAccountInfoClick).toHaveBeenCalledOnce();
    });

    it("calls onLogoutClick through the popover", async () => {
      const user = userEvent.setup();
      const onLogoutClick = vi.fn();
      render(
        <AccountSettings {...defaultProps} onLogoutClick={onLogoutClick} />,
      );

      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button", { name: /log out/i }));

      expect(onLogoutClick).toHaveBeenCalledOnce();
    });
  });

  describe("ARIA attributes", () => {
    it("trigger has aria-expanded=false when closed", () => {
      render(<AccountSettings {...defaultProps} />);

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("trigger has aria-expanded=true when open", async () => {
      const user = userEvent.setup();
      render(<AccountSettings {...defaultProps} />);

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("keyboard interaction", () => {
    it("pressing Escape closes the dropdown", async () => {
      const user = userEvent.setup();
      render(<AccountSettings {...defaultProps} />);

      // Open the dropdown
      await user.click(screen.getByRole("button"));
      expect(
        screen.getByTestId("account-settings-dropdown"),
      ).toBeInTheDocument();

      // Press Escape
      await user.keyboard("{Escape}");

      expect(
        screen.queryByTestId("account-settings-dropdown"),
      ).not.toBeInTheDocument();
    });
  });
});
