import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "../empty-state";

describe("EmptyState", () => {
  it("renders heading and description text", () => {
    render(
      <EmptyState
        heading="Nothing to see here"
        description="Come back later"
      />,
    );

    expect(screen.getByText("Nothing to see here")).toBeInTheDocument();
    expect(screen.getByText("Come back later")).toBeInTheDocument();
  });

  it("renders heading as an h2 element", () => {
    render(
      <EmptyState heading="Test Heading" description="Test description" />,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Test Heading");
  });

  it("applies custom className to the container", () => {
    const { container } = render(
      <EmptyState
        heading="Heading"
        description="Description"
        className="my-custom-class"
      />,
    );

    expect(container.firstChild).toHaveClass("my-custom-class");
  });
});
