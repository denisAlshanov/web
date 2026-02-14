import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RolePill } from "../account-settings";

describe("RolePill", () => {
  describe("host role", () => {
    it("renders with blue-ish background token", () => {
      render(<RolePill role="host" />);

      const pill = screen.getByText("host");
      expect(pill.className).toContain(
        "bg-[var(--colour-interface-background-primary-default)]",
      );
    });

    it("renders role text in lowercase", () => {
      render(<RolePill role="host" />);

      expect(screen.getByText("host")).toBeInTheDocument();
    });
  });

  describe("producer role", () => {
    it("renders with pink background token", () => {
      render(<RolePill role="producer" />);

      const pill = screen.getByText("producer");
      expect(pill.className).toContain(
        "bg-[var(--colour-interface-background-semantic-danger-hover)]",
      );
    });

    it("renders role text in lowercase", () => {
      render(<RolePill role="producer" />);

      expect(screen.getByText("producer")).toBeInTheDocument();
    });
  });

  describe("typography and styling", () => {
    it("applies text-medium-s typography class", () => {
      render(<RolePill role="host" />);

      const pill = screen.getByText("host");
      expect(pill.className).toContain("text-medium-s");
    });

    it("applies default text color token", () => {
      render(<RolePill role="producer" />);

      const pill = screen.getByText("producer");
      expect(pill.className).toContain(
        "text-[color:var(--colour-interface-text-default)]",
      );
    });

    it("applies pill border radius", () => {
      render(<RolePill role="host" />);

      const pill = screen.getByText("host");
      expect(pill.className).toContain(
        "rounded-[var(--number-radius-rad-pill)]",
      );
    });

    it("forwards className prop", () => {
      render(<RolePill role="host" className="custom-class" />);

      const pill = screen.getByText("host");
      expect(pill).toHaveClass("custom-class");
    });
  });
});
