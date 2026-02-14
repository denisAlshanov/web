import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageHeader } from "../page-header";

describe("PageHeader", () => {
  describe("Level 1 — heading", () => {
    it("renders the page heading with text-heading-l when showHeading=true", () => {
      render(<PageHeader level={1} heading="Shows" showHeading={true} />);
      const heading = screen.getByText("Shows");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("text-heading-l");
    });

    it("does not render heading when showHeading=false", () => {
      render(<PageHeader level={1} heading="Shows" showHeading={false} />);
      expect(screen.queryByText("Shows")).not.toBeInTheDocument();
    });

    it("uses the correct heading text color token", () => {
      render(<PageHeader level={1} heading="Shows" showHeading={true} />);
      const heading = screen.getByText("Shows");
      expect(heading.className).toContain(
        "--colour-interface-text-heavy",
      );
    });
  });

  describe("Level 1 — header height", () => {
    it("has 140px height when showHeading=true", () => {
      render(<PageHeader level={1} heading="Shows" showHeading={true} />);
      const header = screen.getByRole("banner");
      expect(header.className).toContain("h-[140px]");
    });

    it("has 80px height when showHeading=false", () => {
      render(<PageHeader level={1} showHeading={false} />);
      const header = screen.getByRole("banner");
      expect(header.className).toContain("h-[80px]");
    });
  });

  describe("Level 1 — AccountSettings", () => {
    it("renders accountSettings slot content", () => {
      render(
        <PageHeader
          level={1}
          heading="Shows"
          accountSettings={<div data-testid="account-settings">AS</div>}
        />,
      );
      expect(screen.getByTestId("account-settings")).toBeInTheDocument();
    });

    it("does not crash when accountSettings is not provided", () => {
      render(<PageHeader level={1} heading="Shows" />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });
  });

  describe("Level 1 — TabList", () => {
    it("renders tabs slot when tabbedView=true", () => {
      render(
        <PageHeader
          level={1}
          heading="Shows"
          tabbedView={true}
          tabs={<div data-testid="tab-list">Tabs</div>}
        />,
      );
      expect(screen.getByTestId("tab-list")).toBeInTheDocument();
    });

    it("does not render tabs slot when tabbedView=false", () => {
      render(
        <PageHeader
          level={1}
          heading="Shows"
          tabbedView={false}
          tabs={<div data-testid="tab-list">Tabs</div>}
        />,
      );
      expect(screen.queryByTestId("tab-list")).not.toBeInTheDocument();
    });

    it("renders tabs by default (tabbedView defaults to true)", () => {
      render(
        <PageHeader
          level={1}
          heading="Shows"
          tabs={<div data-testid="tab-list">Tabs</div>}
        />,
      );
      expect(screen.getByTestId("tab-list")).toBeInTheDocument();
    });
  });

  describe("Level 1 — defaults", () => {
    it("defaults to level=1", () => {
      render(<PageHeader heading="Shows" />);
      const heading = screen.getByText("Shows");
      expect(heading).toHaveClass("text-heading-l");
    });

    it("defaults to showHeading=true", () => {
      render(<PageHeader heading="Shows" />);
      expect(screen.getByText("Shows")).toBeInTheDocument();
    });
  });
});
