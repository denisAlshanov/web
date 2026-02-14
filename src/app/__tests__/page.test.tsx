import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home from "../page";

// Mock next-auth/react (required by AppLayout)
vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      user: { name: "Test User", image: null },
      backendUser: { roles: ["host"] },
    },
    status: "authenticated" as const,
  }),
  signOut: vi.fn(),
}));

// Mock layout components to isolate page-level concerns
vi.mock("@/components/layout/side-navbar", () => ({
  SideNavbar: ({ activeItem }: { activeItem?: string }) => (
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
      {accountSettings}
    </header>
  ),
}));

vi.mock("@/components/ui/account-settings", () => ({
  AccountSettings: () => <div data-testid="account-settings" />,
}));

describe("Home page", () => {
  it("renders the empty state heading and description", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Nothing to see here (yet)." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Come back later to check if there's someone new!"),
    ).toBeInTheDocument();
  });

  it("renders within AppLayout with nav and page header", () => {
    render(<Home />);

    expect(screen.getByTestId("side-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("page-header")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
  });

  it("sets activeNavItem to home on the sidebar", () => {
    render(<Home />);

    expect(screen.getByTestId("side-navbar")).toHaveAttribute(
      "data-active-item",
      "home",
    );
  });
});
