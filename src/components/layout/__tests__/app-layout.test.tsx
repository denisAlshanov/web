import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { AppLayout } from "../app-layout";

// Mock next-auth/react
const mockUseSession = vi.fn();
vi.mock("next-auth/react", () => ({
  useSession: () => mockUseSession(),
  signOut: vi.fn(),
}));

// Mock child layout components to keep tests focused
vi.mock("@/components/layout/side-navbar", () => ({
  SideNavbar: ({
    activeItem,
  }: {
    activeItem?: string;
  }) => (
    <nav data-testid="side-navbar" data-active-item={activeItem}>
      SideNavbar
    </nav>
  ),
}));

vi.mock("@/components/layout/page-header", () => ({
  PageHeader: ({
    heading,
    accountSettings,
  }: {
    heading?: string;
    accountSettings?: React.ReactNode;
  }) => (
    <header data-testid="page-header">
      {heading && <h1>{heading}</h1>}
      {accountSettings && <div data-testid="account-settings-slot">{accountSettings}</div>}
    </header>
  ),
}));

vi.mock("@/components/ui/account-settings", () => ({
  AccountSettings: ({ userName }: { userName: string }) => (
    <div data-testid="account-settings">{userName}</div>
  ),
}));

const mockSession = {
  data: {
    user: { name: "Jane Doe", image: "https://example.com/avatar.jpg" },
    backendUser: { roles: ["host"] },
  },
  status: "authenticated" as const,
};

describe("AppLayout", () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue(mockSession);
  });

  it("renders SideNavbar, PageHeader with heading, and children content", () => {
    render(
      <AppLayout heading="Home">
        <p>Page content</p>
      </AppLayout>,
    );

    expect(screen.getByTestId("side-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("page-header")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("passes activeNavItem to SideNavbar (defaults to home)", () => {
    render(
      <AppLayout heading="Home">
        <p>Content</p>
      </AppLayout>,
    );

    const navbar = screen.getByTestId("side-navbar");
    expect(navbar).toHaveAttribute("data-active-item", "home");
  });

  it("passes custom activeNavItem to SideNavbar", () => {
    render(
      <AppLayout heading="Shows" activeNavItem="shows">
        <p>Content</p>
      </AppLayout>,
    );

    const navbar = screen.getByTestId("side-navbar");
    expect(navbar).toHaveAttribute("data-active-item", "shows");
  });

  it("renders AccountSettings with session user name", () => {
    render(
      <AppLayout heading="Home">
        <p>Content</p>
      </AppLayout>,
    );

    expect(screen.getByTestId("account-settings")).toHaveTextContent("Jane Doe");
  });

  it("renders AccountSettings inside PageHeader slot", () => {
    render(
      <AppLayout heading="Home">
        <p>Content</p>
      </AppLayout>,
    );

    const slot = screen.getByTestId("account-settings-slot");
    expect(slot).toContainElement(screen.getByTestId("account-settings"));
  });

  it("renders children inside a main element", () => {
    render(
      <AppLayout heading="Home">
        <p>Hello world</p>
      </AppLayout>,
    );

    const main = screen.getByRole("main");
    expect(main).toContainElement(screen.getByText("Hello world"));
  });

  it("handles missing session gracefully", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });

    render(
      <AppLayout heading="Home">
        <p>Content</p>
      </AppLayout>,
    );

    expect(screen.getByTestId("account-settings")).toHaveTextContent("");
  });

  it("hides AccountSettings while session is loading", () => {
    mockUseSession.mockReturnValue({ data: null, status: "loading" });

    render(
      <AppLayout heading="Home">
        <p>Content</p>
      </AppLayout>,
    );

    expect(screen.queryByTestId("account-settings")).not.toBeInTheDocument();
  });

  it("renders a 60px spacer div for sidebar space reservation", () => {
    render(
      <AppLayout heading="Home">
        <p>Content</p>
      </AppLayout>,
    );

    const spacer = screen.getByTestId("sidebar-spacer");
    expect(spacer).toHaveClass("w-[60px]", "shrink-0");
  });

  it("wraps layout in a relative flex container for overlay positioning", () => {
    const { container } = render(
      <AppLayout heading="Home">
        <p>Content</p>
      </AppLayout>,
    );

    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass("relative", "flex", "h-screen");

    // SideNavbar and spacer are both direct children of the relative wrapper
    const navbar = screen.getByTestId("side-navbar");
    const spacer = screen.getByTestId("sidebar-spacer");
    expect(wrapper).toContainElement(navbar);
    expect(wrapper).toContainElement(spacer);
  });
});
