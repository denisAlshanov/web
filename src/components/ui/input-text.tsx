"use client";

import React from "react";

import { cn } from "@/lib/utils";

export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

function InputText({
  className,
  error,
  disabled,
  helperText,
  leadingIcon,
  trailingIcon,
  ref,
  id,
  placeholder = " ",
  "aria-describedby": externalDescribedBy,
  ...props
}: InputTextProps) {
  const autoId = React.useId();
  const errorMessage = typeof error === "string" ? error : undefined;
  const displayHelperText = errorMessage || helperText;
  const descriptionId = displayHelperText
    ? `${id ?? autoId}-description`
    : undefined;
  const mergedDescribedBy =
    [descriptionId, externalDescribedBy].filter(Boolean).join(" ") || undefined;

  return (
    <div
      aria-disabled={disabled || undefined}
      className={cn(
        "flex flex-col gap-[var(--number-spacing-gap-gap-2xs)] items-start",
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
    >
      <div
        className={cn(
          // Layout
          "group flex flex-row items-center gap-[var(--number-spacing-gap-gap-s)]",
          "w-full min-h-[44px]",
          "pl-[var(--number-spacing-padding-pad-m)] pr-[var(--number-spacing-padding-pad-l)] py-[var(--number-spacing-padding-pad-m)]",
          // Background and border
          "bg-[var(--colour-interface-surface-base)]",
          "border-2 border-solid rounded-[var(--number-radius-rad-input)]",
          // Default state
          "border-[var(--colour-interface-form-border-default)]",
          // Hover state
          "hover:border-[var(--colour-interface-form-border-hover)]",
          // Active (mouse focus) state - border changes to active color
          "has-[:focus:not(:focus-visible)]:border-[var(--colour-interface-form-border-active)]",
          // Filled state - border changes to active color when input has a value
          "has-[:not(:placeholder-shown)]:border-[var(--colour-interface-form-border-active)]",
          // Focus (keyboard) state - 3px outer ring via box-shadow, inner border stays default
          // Placed after filled/active so focus-visible wins when both match
          "has-[:focus-visible]:shadow-[0_0_0_3px_var(--colour-interface-form-border-focus)]",
          "has-[:focus-visible]:border-[var(--colour-interface-form-border-default)]",
          // Transition
          "transition-[border-color,box-shadow]",
          // Error state overrides (must override hover and focus states too)
          error && !disabled && [
            "border-[var(--colour-interface-form-border-error)]",
            "hover:border-[var(--colour-interface-form-border-error)]",
            "has-[:focus-visible]:border-[var(--colour-interface-form-border-error)]",
            "has-[:focus:not(:focus-visible)]:border-[var(--colour-interface-form-border-error)]",
            "has-[:not(:placeholder-shown)]:border-[var(--colour-interface-form-border-error)]",
          ],
          // Disabled state
          disabled &&
            "has-[:not(:placeholder-shown)]:border-[var(--colour-interface-form-border-default)]",
        )}
      >
        {leadingIcon && (
          <span
            aria-hidden="true"
            inert={disabled || undefined}
            className="shrink-0 flex items-center"
          >
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={(!!error && !disabled) || undefined}
          aria-describedby={mergedDescribedBy}
          className={cn(
            "flex-1 min-w-0 bg-transparent border-none outline-none",
            "text-medium-m",
            // Default placeholder color, darkens on hover/focus per Figma spec
            "placeholder:text-[color:var(--colour-interface-text-placeholder)]",
            "group-hover:placeholder:text-[color:var(--colour-interface-text-default)]",
            "group-focus-within:placeholder:text-[color:var(--colour-interface-text-default)]",
            // Input text color when filled
            "text-[color:var(--colour-interface-text-heavy)]",
          )}
          placeholder={placeholder}
          {...props}
        />
        {trailingIcon && (
          <span
            aria-hidden="true"
            inert={disabled || undefined}
            className="shrink-0 flex items-center"
          >
            {trailingIcon}
          </span>
        )}
      </div>

      {displayHelperText && (
        <p
          id={descriptionId}
          aria-live={error && !disabled ? "polite" : undefined}
          className={cn(
            "text-medium-s pl-[var(--number-spacing-padding-pad-xs)]",
            error && !disabled
              ? "text-[color:var(--colour-interface-text-semantic-error)]"
              : "text-[color:var(--colour-interface-text-supporting)]",
          )}
        >
          {displayHelperText}
        </p>
      )}
    </div>
  );
}

export { InputText };
