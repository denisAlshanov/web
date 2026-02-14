import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

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

  describe("Level 2 — heading", () => {
    it("renders page heading with text-heading-m when showHeading=true", () => {
      render(
        <PageHeader level={2} heading="Show Details" showHeading={true} />,
      );
      const heading = screen.getByText("Show Details");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("text-heading-m");
    });

    it("does not render heading when showHeading=false", () => {
      render(
        <PageHeader level={2} heading="Show Details" showHeading={false} />,
      );
      expect(screen.queryByText("Show Details")).not.toBeInTheDocument();
    });

    it("uses the correct heading text color token", () => {
      render(
        <PageHeader level={2} heading="Show Details" showHeading={true} />,
      );
      const heading = screen.getByText("Show Details");
      expect(heading.className).toContain("--colour-interface-text-heavy");
    });
  });

  describe("Level 2 — header height", () => {
    it("has 96px height when showHeading=true", () => {
      render(
        <PageHeader level={2} heading="Show Details" showHeading={true} />,
      );
      const header = screen.getByRole("banner");
      expect(header.className).toContain("h-[96px]");
    });

    it("has 80px height when showHeading=false", () => {
      render(<PageHeader level={2} showHeading={false} />);
      const header = screen.getByRole("banner");
      expect(header.className).toContain("h-[80px]");
    });
  });

  describe("Level 2 — back button", () => {
    it("renders a back button with ArrowLeft icon", () => {
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          onBackClick={() => {}}
        />,
      );
      const backButton = screen.getByRole("button", { name: /back/i });
      expect(backButton).toBeInTheDocument();
    });

    it("fires onBackClick callback when clicked", async () => {
      const user = userEvent.setup();
      const handleBack = vi.fn();
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          onBackClick={handleBack}
        />,
      );
      const backButton = screen.getByRole("button", { name: /back/i });
      await user.click(backButton);
      expect(handleBack).toHaveBeenCalledTimes(1);
    });
  });

  describe("Level 2 — menu button", () => {
    it("renders a menu button when showMenu=true", () => {
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          showMenu={true}
          onMenuClick={() => {}}
        />,
      );
      const menuButton = screen.getByRole("button", { name: /menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    it("does not render menu button when showMenu=false", () => {
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          showMenu={false}
          onMenuClick={() => {}}
        />,
      );
      expect(
        screen.queryByRole("button", { name: /menu/i }),
      ).not.toBeInTheDocument();
    });

    it("fires onMenuClick callback when clicked", async () => {
      const user = userEvent.setup();
      const handleMenu = vi.fn();
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          showMenu={true}
          onMenuClick={handleMenu}
        />,
      );
      const menuButton = screen.getByRole("button", { name: /menu/i });
      await user.click(menuButton);
      expect(handleMenu).toHaveBeenCalledTimes(1);
    });
  });

  describe("Level 2 — helper text", () => {
    it("renders helper text when showHelperText=true", () => {
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          helperText="Draft"
          showHelperText={true}
        />,
      );
      expect(screen.getByText("Draft")).toBeInTheDocument();
    });

    it("does not render helper text when showHelperText=false", () => {
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          helperText="Draft"
          showHelperText={false}
        />,
      );
      expect(screen.queryByText("Draft")).not.toBeInTheDocument();
    });

    it("does not render helper text by default", () => {
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          helperText="Draft"
        />,
      );
      expect(screen.queryByText("Draft")).not.toBeInTheDocument();
    });

    it("applies the supporting text color token", () => {
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          helperText="Draft"
          showHelperText={true}
        />,
      );
      const helperText = screen.getByText("Draft");
      expect(helperText.className).toContain(
        "--colour-interface-text-supporting",
      );
    });
  });

  describe("Level 2 — AccountSettings", () => {
    it("renders accountSettings slot content", () => {
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          accountSettings={<div data-testid="account-settings">AS</div>}
        />,
      );
      expect(screen.getByTestId("account-settings")).toBeInTheDocument();
    });
  });

  describe("Cross-level isolation", () => {
    it("does not render back or menu buttons at level 1", () => {
      render(
        <PageHeader
          level={1}
          heading="Shows"
          onBackClick={() => {}}
          showMenu={true}
          onMenuClick={() => {}}
        />,
      );
      expect(
        screen.queryByRole("button", { name: /back/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /menu/i }),
      ).not.toBeInTheDocument();
    });

    it("does not render tabs at level 2 even when tabbedView=true and tabs are provided", () => {
      render(
        <PageHeader
          level={2}
          heading="Show Details"
          tabbedView={true}
          tabs={<div data-testid="tab-list">Tabs</div>}
        />,
      );
      expect(screen.queryByTestId("tab-list")).not.toBeInTheDocument();
    });

    it("does not render back button when onBackClick is not provided", () => {
      render(<PageHeader level={2} heading="Show Details" />);
      expect(
        screen.queryByRole("button", { name: /back/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe("Scroll state", () => {
    it("has no bottom border or shadow when scroll=false", () => {
      render(<PageHeader level={1} heading="Shows" scroll={false} />);
      const header = screen.getByRole("banner");
      expect(header.className).not.toContain(
        "--colour-interface-border-primary-light",
      );
      expect(header.className).not.toContain("shadow-");
    });

    it("has no bottom border or shadow by default (scroll defaults to false)", () => {
      render(<PageHeader level={1} heading="Shows" />);
      const header = screen.getByRole("banner");
      expect(header.className).not.toContain(
        "--colour-interface-border-primary-light",
      );
      expect(header.className).not.toContain("shadow-");
    });

    it("adds bottom border with correct token when scroll=true", () => {
      render(<PageHeader level={1} heading="Shows" scroll={true} />);
      const header = screen.getByRole("banner");
      expect(header.className).toContain("border-b");
      expect(header.className).toContain(
        "--colour-interface-border-primary-light",
      );
    });

    it("adds shadow when scroll=true", () => {
      render(<PageHeader level={1} heading="Shows" scroll={true} />);
      const header = screen.getByRole("banner");
      expect(header.className).toContain(
        "shadow-[0px_4px_8px_0px_rgba(67,73,82,0.04)]",
      );
    });

    it("applies scroll styling to Level 2", () => {
      render(
        <PageHeader level={2} heading="Show Details" scroll={true} />,
      );
      const header = screen.getByRole("banner");
      expect(header.className).toContain("border-b");
      expect(header.className).toContain(
        "shadow-[0px_4px_8px_0px_rgba(67,73,82,0.04)]",
      );
    });

    it("does not apply scroll styling to Level 2 when scroll=false", () => {
      render(
        <PageHeader level={2} heading="Show Details" scroll={false} />,
      );
      const header = screen.getByRole("banner");
      expect(header.className).not.toContain(
        "--colour-interface-border-primary-light",
      );
      expect(header.className).not.toContain("shadow-");
    });
  });
});
