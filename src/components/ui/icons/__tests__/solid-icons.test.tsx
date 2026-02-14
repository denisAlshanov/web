import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  CalendarSolid,
  GroupSolid,
  HomeSimpleDoorSolid,
  TvSolid,
  UserSquareSolid,
  WrenchSolid,
} from "../index";

const icons = [
  { name: "HomeSimpleDoorSolid", Component: HomeSimpleDoorSolid },
  { name: "TvSolid", Component: TvSolid },
  { name: "GroupSolid", Component: GroupSolid },
  { name: "UserSquareSolid", Component: UserSquareSolid },
  { name: "WrenchSolid", Component: WrenchSolid },
  { name: "CalendarSolid", Component: CalendarSolid },
] as const;

describe("Solid icon components", () => {
  describe.each(icons)("$name", ({ Component }) => {
    it("renders an SVG element", () => {
      const { container } = render(<Component data-testid="icon" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("has viewBox 0 0 24 24", () => {
      const { container } = render(<Component />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has default width and height of 24", () => {
      const { container } = render(<Component />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });

    it("contains at least one path with fill=currentColor", () => {
      const { container } = render(<Component />);
      const paths = container.querySelectorAll('path[fill="currentColor"]');
      expect(paths.length).toBeGreaterThanOrEqual(1);
    });

    it("forwards className prop", () => {
      const { container } = render(<Component className="test-class" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("test-class");
    });

    it("forwards width and height props", () => {
      const { container } = render(<Component width={32} height={32} />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "32");
      expect(svg).toHaveAttribute("height", "32");
    });

    it("forwards arbitrary SVG props", () => {
      const { container } = render(
        <Component data-testid="custom-icon" aria-hidden="true" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("data-testid", "custom-icon");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });
});
