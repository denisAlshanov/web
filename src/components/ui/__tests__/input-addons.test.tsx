import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { InputAddons } from "../input-addons";

describe("InputAddons", () => {
  describe("base rendering", () => {
    it("renders an input element", () => {
      render(<InputAddons />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders with a placeholder", () => {
      render(<InputAddons placeholder="Enter URL" />);

      expect(screen.getByPlaceholderText("Enter URL")).toBeInTheDocument();
    });

    it("uses a space as default placeholder for :placeholder-shown detection", () => {
      render(<InputAddons />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("placeholder", " ");
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref to the input element", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<InputAddons ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("ref points to the actual input", () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<InputAddons ref={ref} placeholder="test" />);

      expect(ref.current?.tagName).toBe("INPUT");
      expect(ref.current).toBe(screen.getByRole("textbox"));
    });
  });

  describe("HTML attribute forwarding", () => {
    it("forwards name attribute", () => {
      render(<InputAddons name="website" />);

      expect(screen.getByRole("textbox")).toHaveAttribute("name", "website");
    });

    it("forwards controlled value", () => {
      render(<InputAddons value="test" onChange={() => {}} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("test");
    });

    it("supports typing into the input", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<InputAddons onChange={handleChange} />);

      await user.type(screen.getByRole("textbox"), "hello");
      expect(handleChange).toHaveBeenCalled();
    });

    it("forwards id attribute", () => {
      render(<InputAddons id="my-input" />);

      expect(screen.getByRole("textbox")).toHaveAttribute("id", "my-input");
    });

    it("forwards data attributes", () => {
      render(<InputAddons data-testid="custom-input" />);

      expect(screen.getByTestId("custom-input")).toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("applies disabled attribute to input", () => {
      render(<InputAddons disabled />);

      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("applies opacity and pointer-events-none on the wrapper", () => {
      render(<InputAddons disabled />);

      const wrapper = screen.getByRole("textbox").closest("[aria-disabled]");
      expect(wrapper).toHaveAttribute("aria-disabled", "true");
      expect(wrapper?.className).toContain("opacity-50");
      expect(wrapper?.className).toContain("pointer-events-none");
    });

    it("does not set aria-disabled when not disabled", () => {
      render(<InputAddons />);

      const wrapper = screen.getByRole("textbox").parentElement?.parentElement;
      expect(wrapper).not.toHaveAttribute("aria-disabled");
    });
  });

  describe("className forwarding", () => {
    it("forwards className to root wrapper", () => {
      render(<InputAddons className="custom-class" />);

      const wrapper = screen.getByRole("textbox").parentElement?.parentElement;
      expect(wrapper).toHaveClass("custom-class");
    });

    it("preserves base classes when custom className is added", () => {
      render(<InputAddons className="custom-class" />);

      const wrapper = screen.getByRole("textbox").parentElement?.parentElement;
      expect(wrapper?.className).toContain("flex");
      expect(wrapper?.className).toContain("flex-col");
      expect(wrapper?.className).toContain("custom-class");
    });
  });

  describe("lead addon", () => {
    it("renders lead addon text when leadAddon prop is set", () => {
      render(<InputAddons leadAddon="https://" />);

      expect(screen.getByText("https://")).toBeInTheDocument();
    });

    it("renders lead addon with secondary background", () => {
      render(<InputAddons leadAddon="https://" />);

      const addon = screen.getByText("https://");
      expect(addon.className).toContain(
        "bg-[var(--colour-interface-surface-secondary)]",
      );
    });

    it("renders lead addon with text-heavy color", () => {
      render(<InputAddons leadAddon="https://" />);

      const addon = screen.getByText("https://");
      expect(addon.className).toContain(
        "text-[color:var(--colour-interface-text-heavy)]",
      );
    });

    it("renders lead addon with right border separator", () => {
      render(<InputAddons leadAddon="https://" />);

      const addon = screen.getByText("https://");
      expect(addon.className).toContain("border-r-2");
    });

    it("renders lead addon with left-side rounded corners", () => {
      render(<InputAddons leadAddon="https://" />);

      const addon = screen.getByText("https://");
      expect(addon.className).toContain(
        "rounded-l-[var(--number-radius-rad-input)]",
      );
    });

    it("does not render lead addon when leadAddon is not set", () => {
      render(<InputAddons />);

      const container = screen.getByRole("textbox").parentElement;
      expect(container?.children).toHaveLength(1);
    });
  });

  describe("trail addon", () => {
    it("renders trail addon text when trailAddon prop is set", () => {
      render(<InputAddons trailAddon=".io" />);

      expect(screen.getByText(".io")).toBeInTheDocument();
    });

    it("renders trail addon with secondary background", () => {
      render(<InputAddons trailAddon=".io" />);

      const addon = screen.getByText(".io");
      expect(addon.className).toContain(
        "bg-[var(--colour-interface-surface-secondary)]",
      );
    });

    it("renders trail addon with text-heavy color", () => {
      render(<InputAddons trailAddon=".io" />);

      const addon = screen.getByText(".io");
      expect(addon.className).toContain(
        "text-[color:var(--colour-interface-text-heavy)]",
      );
    });

    it("renders trail addon with left border separator", () => {
      render(<InputAddons trailAddon=".io" />);

      const addon = screen.getByText(".io");
      expect(addon.className).toContain("border-l-2");
    });

    it("renders trail addon with right-side rounded corners", () => {
      render(<InputAddons trailAddon=".io" />);

      const addon = screen.getByText(".io");
      expect(addon.className).toContain(
        "rounded-r-[var(--number-radius-rad-input)]",
      );
    });

    it("does not render trail addon when trailAddon is not set", () => {
      render(<InputAddons />);

      const container = screen.getByRole("textbox").parentElement;
      expect(container?.children).toHaveLength(1);
    });
  });

  describe("both addons", () => {
    it("renders both addons together", () => {
      render(<InputAddons leadAddon="https://" trailAddon=".io" />);

      expect(screen.getByText("https://")).toBeInTheDocument();
      expect(screen.getByText(".io")).toBeInTheDocument();
    });

    it("renders lead addon before input and trail addon after", () => {
      render(<InputAddons leadAddon="https://" trailAddon=".io" />);

      const container = screen.getByRole("textbox").parentElement!;
      const children = Array.from(container.children);

      expect(children).toHaveLength(3);
      expect(children[0].textContent).toBe("https://");
      expect(children[1].tagName).toBe("INPUT");
      expect(children[2].textContent).toBe(".io");
    });

    it("input still works with both addons", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <InputAddons
          leadAddon="https://"
          trailAddon=".io"
          onChange={handleChange}
        />,
      );

      await user.type(screen.getByRole("textbox"), "example");
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("no addons", () => {
    it("input works without any addons", async () => {
      const user = userEvent.setup();
      render(<InputAddons />);

      const input = screen.getByRole("textbox");
      await user.type(input, "hello");
      expect(input).toHaveValue("hello");
    });

    it("applies full horizontal padding when no addons", () => {
      render(<InputAddons />);

      const input = screen.getByRole("textbox");
      expect(input.className).toContain(
        "pl-[var(--number-spacing-padding-pad-m)]",
      );
      expect(input.className).toContain(
        "pr-[var(--number-spacing-padding-pad-m)]",
      );
    });

    it("applies reduced left padding when lead addon present", () => {
      render(<InputAddons leadAddon="https://" />);

      const input = screen.getByRole("textbox");
      expect(input.className).toContain(
        "pl-[var(--number-spacing-padding-pad-s)]",
      );
      expect(input.className).not.toContain(
        "pl-[var(--number-spacing-padding-pad-m)]",
      );
    });

    it("applies reduced right padding when trail addon present", () => {
      render(<InputAddons trailAddon=".io" />);

      const input = screen.getByRole("textbox");
      expect(input.className).toContain(
        "pr-[var(--number-spacing-padding-pad-s)]",
      );
      expect(input.className).not.toContain(
        "pr-[var(--number-spacing-padding-pad-m)]",
      );
    });
  });

  describe("addon border state tracking", () => {
    it("lead addon has group-hover border class", () => {
      render(<InputAddons leadAddon="https://" />);

      const addon = screen.getByText("https://");
      expect(addon.className).toContain(
        "group-hover:border-[var(--colour-interface-form-border-hover)]",
      );
    });

    it("trail addon has group-hover border class", () => {
      render(<InputAddons trailAddon=".io" />);

      const addon = screen.getByText(".io");
      expect(addon.className).toContain(
        "group-hover:border-[var(--colour-interface-form-border-hover)]",
      );
    });

    it("lead addon has error border overrides when error is set", () => {
      render(<InputAddons leadAddon="https://" error="Invalid URL" />);

      const addon = screen.getByText("https://");
      expect(addon.className).toContain(
        "border-[var(--colour-interface-form-border-error)]",
      );
      expect(addon.className).toContain(
        "group-hover:border-[var(--colour-interface-form-border-error)]",
      );
    });

    it("trail addon has error border overrides when error is set", () => {
      render(<InputAddons trailAddon=".io" error="Invalid URL" />);

      const addon = screen.getByText(".io");
      expect(addon.className).toContain(
        "border-[var(--colour-interface-form-border-error)]",
      );
    });

    it("addon does not have error border when disabled with error", () => {
      render(<InputAddons leadAddon="https://" error="Error" disabled />);

      const addon = screen.getByText("https://");
      expect(addon.className).not.toContain(
        "group-hover:border-[var(--colour-interface-form-border-error)]",
      );
    });
  });

  describe("helper text", () => {
    it("renders helper text below the input", () => {
      render(<InputAddons helperText="Enter a valid URL" />);

      expect(screen.getByText("Enter a valid URL")).toBeInTheDocument();
    });

    it("renders helper text with supporting color", () => {
      render(<InputAddons helperText="Enter a valid URL" />);

      const helper = screen.getByText("Enter a valid URL");
      expect(helper.className).toContain(
        "text-[color:var(--colour-interface-text-supporting)]",
      );
    });

    it("renders helper text with text-medium-s style", () => {
      render(<InputAddons helperText="Enter a valid URL" />);

      const helper = screen.getByText("Enter a valid URL");
      expect(helper.className).toContain("text-medium-s");
    });

    it("does not render helper text when prop is not provided", () => {
      render(<InputAddons />);

      const wrapper = screen.getByRole("textbox").parentElement?.parentElement;
      const paragraphs = wrapper?.querySelectorAll("p");
      expect(paragraphs).toHaveLength(0);
    });
  });

  describe("error state", () => {
    it("renders error message when error is a string", () => {
      render(<InputAddons error="Invalid URL" />);

      expect(screen.getByText("Invalid URL")).toBeInTheDocument();
    });

    it("renders error message with semantic error color", () => {
      render(<InputAddons error="Invalid URL" />);

      const errorText = screen.getByText("Invalid URL");
      expect(errorText.className).toContain(
        "text-[color:var(--colour-interface-text-semantic-error)]",
      );
    });

    it("error message replaces helper text", () => {
      render(
        <InputAddons helperText="Enter a valid URL" error="Invalid URL" />,
      );

      expect(screen.getByText("Invalid URL")).toBeInTheDocument();
      expect(screen.queryByText("Enter a valid URL")).not.toBeInTheDocument();
    });

    it("shows helper text when error is boolean true (no message)", () => {
      render(<InputAddons helperText="Enter a valid URL" error={true} />);

      const helper = screen.getByText("Enter a valid URL");
      expect(helper).toBeInTheDocument();
      expect(helper.className).toContain(
        "text-[color:var(--colour-interface-text-semantic-error)]",
      );
      expect(helper).toHaveAttribute("aria-live", "polite");
    });

    it("error text has aria-live polite", () => {
      render(<InputAddons error="Invalid URL" />);

      const errorText = screen.getByText("Invalid URL");
      expect(errorText).toHaveAttribute("aria-live", "polite");
    });

    it("helper text does not have aria-live", () => {
      render(<InputAddons helperText="Enter a valid URL" />);

      const helper = screen.getByText("Enter a valid URL");
      expect(helper).not.toHaveAttribute("aria-live");
    });

    it("does not set error styling when disabled with error", () => {
      render(<InputAddons error="Invalid URL" disabled />);

      const errorText = screen.getByText("Invalid URL");
      expect(errorText.className).toContain(
        "text-[color:var(--colour-interface-text-supporting)]",
      );
      expect(errorText.className).not.toContain(
        "text-[color:var(--colour-interface-text-semantic-error)]",
      );
    });

    it("does not set aria-live when disabled with error", () => {
      render(<InputAddons error="Invalid URL" disabled />);

      const errorText = screen.getByText("Invalid URL");
      expect(errorText).not.toHaveAttribute("aria-live");
    });
  });

  describe("aria attributes", () => {
    it("sets aria-invalid on input when error is truthy", () => {
      render(<InputAddons error="Invalid URL" />);

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("sets aria-invalid when error is boolean true", () => {
      render(<InputAddons error={true} />);

      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("does not set aria-invalid when no error", () => {
      render(<InputAddons />);

      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
    });

    it("does not set aria-invalid when disabled with error", () => {
      render(<InputAddons error="Invalid URL" disabled />);

      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
    });

    it("sets aria-describedby linking input to helper text", () => {
      render(<InputAddons id="my-input" helperText="Enter a valid URL" />);

      const input = screen.getByRole("textbox");
      const helper = screen.getByText("Enter a valid URL");

      expect(input).toHaveAttribute("aria-describedby");
      expect(helper).toHaveAttribute("id");
      expect(input.getAttribute("aria-describedby")).toContain(
        helper.getAttribute("id"),
      );
    });

    it("sets aria-describedby linking input to error text", () => {
      render(<InputAddons id="my-input" error="Invalid URL" />);

      const input = screen.getByRole("textbox");
      const errorText = screen.getByText("Invalid URL");

      expect(input).toHaveAttribute("aria-describedby");
      expect(errorText).toHaveAttribute("id");
      expect(input.getAttribute("aria-describedby")).toContain(
        errorText.getAttribute("id"),
      );
    });

    it("does not set aria-describedby when no helper or error text", () => {
      render(<InputAddons />);

      expect(screen.getByRole("textbox")).not.toHaveAttribute(
        "aria-describedby",
      );
    });

    it("generates stable description id using useId when no id prop", () => {
      render(<InputAddons helperText="Help text" />);

      const input = screen.getByRole("textbox");
      const helper = screen.getByText("Help text");

      expect(input.getAttribute("aria-describedby")).toBe(
        helper.getAttribute("id"),
      );
      expect(helper.getAttribute("id")).toMatch(/-description$/);
    });

    it("uses provided id for description id", () => {
      render(<InputAddons id="custom-id" helperText="Help text" />);

      const helper = screen.getByText("Help text");
      expect(helper.getAttribute("id")).toBe("custom-id-description");
    });

    it("merges external aria-describedby with internal description id", () => {
      render(
        <InputAddons
          aria-describedby="external-hint"
          helperText="Help text"
        />,
      );

      const input = screen.getByRole("textbox");
      const describedBy = input.getAttribute("aria-describedby")!;
      expect(describedBy).toContain("external-hint");
      expect(describedBy).toMatch(/-description/);
    });
  });

  describe("input container styling", () => {
    it("applies state-aware border classes on input container", () => {
      render(<InputAddons />);

      const container = screen.getByRole("textbox").parentElement;
      expect(container?.className).toContain("border-2");
      expect(container?.className).toContain(
        "border-[var(--colour-interface-form-border-default)]",
      );
      expect(container?.className).toContain(
        "hover:border-[var(--colour-interface-form-border-hover)]",
      );
    });

    it("applies focus ring via box-shadow", () => {
      render(<InputAddons />);

      const container = screen.getByRole("textbox").parentElement;
      expect(container?.className).toContain(
        "has-[:focus-visible]:shadow-[0_0_0_3px_var(--colour-interface-form-border-focus)]",
      );
    });

    it("applies error border overrides when error is set", () => {
      render(<InputAddons error="Something went wrong" />);

      const container = screen.getByRole("textbox").parentElement;
      expect(container?.className).toContain(
        "hover:border-[var(--colour-interface-form-border-error)]",
      );
      expect(container?.className).toContain(
        "has-[:focus-visible]:border-[var(--colour-interface-form-border-error)]",
      );
    });

    it("does not apply error border overrides when disabled", () => {
      render(<InputAddons error="Error" disabled />);

      const container = screen.getByRole("textbox").parentElement;
      expect(container?.className).not.toContain(
        "hover:border-[var(--colour-interface-form-border-error)]",
      );
    });

    it("applies h-12 height to input container", () => {
      render(<InputAddons />);

      const container = screen.getByRole("textbox").parentElement;
      expect(container?.className).toContain("h-12");
    });

    it("applies surface-base background", () => {
      render(<InputAddons />);

      const container = screen.getByRole("textbox").parentElement;
      expect(container?.className).toContain(
        "bg-[var(--colour-interface-surface-base)]",
      );
    });
  });
});
