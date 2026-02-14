"use client";

import React from "react";

import { cn } from "@/lib/utils";

export interface InputAddonsProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leadAddon?: string;
  trailAddon?: string;
  error?: string | boolean;
  helperText?: string;
  ref?: React.Ref<HTMLInputElement>;
}

function InputAddons({
  className,
  error,
  disabled,
  helperText,
  leadAddon,
  trailAddon,
  ref,
  id,
  placeholder = " ",
  "aria-describedby": externalDescribedBy,
  ...props
}: InputAddonsProps) {
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
          "group flex items-stretch h-12 w-full",
          // Background and border
          "bg-[var(--colour-interface-surface-base)]",
          "border-2 border-solid rounded-[var(--number-radius-rad-input)]",
          // Default state
          "border-[var(--colour-interface-form-border-default)]",
          // Hover state
          "hover:border-[var(--colour-interface-form-border-hover)]",
          // Active (mouse focus) state
          "has-[:focus:not(:focus-visible)]:border-[var(--colour-interface-form-border-active)]",
          // Filled state
          "has-[:not(:placeholder-shown)]:border-[var(--colour-interface-form-border-active)]",
          // Focus (keyboard) state - 3px outer ring via box-shadow
          "has-[:focus-visible]:shadow-[0_0_0_3px_var(--colour-interface-form-border-focus)]",
          "has-[:focus-visible]:border-[var(--colour-interface-form-border-default)]",
          // Transition
          "transition-[border-color,box-shadow]",
          // Error state overrides
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
        {leadAddon && (
          <div
            className={cn(
              "flex items-center shrink-0",
              "bg-[var(--colour-interface-surface-secondary)]",
              "rounded-l-[var(--number-radius-rad-input)]",
              "border-r-2 border-solid",
              "pl-[var(--number-spacing-padding-pad-m)] pr-[var(--number-spacing-padding-pad-s)]",
              "text-medium-m text-[color:var(--colour-interface-text-heavy)]",
              // Default border
              "border-[var(--colour-interface-form-border-default)]",
              // Hover
              "group-hover:border-[var(--colour-interface-form-border-hover)]",
              // Active (mouse focus)
              "group-has-[:focus:not(:focus-visible)]:border-[var(--colour-interface-form-border-active)]",
              // Focus (keyboard) - stays default
              "group-has-[:focus-visible]:border-[var(--colour-interface-form-border-default)]",
              // Transition
              "transition-[border-color]",
              // Error state overrides
              error && !disabled && [
                "border-[var(--colour-interface-form-border-error)]",
                "group-hover:border-[var(--colour-interface-form-border-error)]",
                "group-has-[:focus-visible]:border-[var(--colour-interface-form-border-error)]",
                "group-has-[:focus:not(:focus-visible)]:border-[var(--colour-interface-form-border-error)]",
              ],
            )}
          >
            {leadAddon}
          </div>
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
            // Placeholder color
            "placeholder:text-[color:var(--colour-interface-text-placeholder)]",
            "group-hover:placeholder:text-[color:var(--colour-interface-text-default)]",
            "group-focus-within:placeholder:text-[color:var(--colour-interface-text-default)]",
            // Filled text color
            "text-[color:var(--colour-interface-text-heavy)]",
            // Horizontal padding when no addons
            !leadAddon && "pl-[var(--number-spacing-padding-pad-m)]",
            !trailAddon && "pr-[var(--number-spacing-padding-pad-m)]",
            // Reduced padding when addons present (gap provides spacing)
            leadAddon && "pl-[var(--number-spacing-padding-pad-s)]",
            trailAddon && "pr-[var(--number-spacing-padding-pad-s)]",
          )}
          placeholder={placeholder}
          {...props}
        />

        {trailAddon && (
          <div
            className={cn(
              "flex items-center shrink-0",
              "bg-[var(--colour-interface-surface-secondary)]",
              "rounded-r-[var(--number-radius-rad-input)]",
              "border-l-2 border-solid",
              "pl-[var(--number-spacing-padding-pad-s)] pr-[var(--number-spacing-padding-pad-m)]",
              "text-medium-m text-[color:var(--colour-interface-text-heavy)]",
              // Default border
              "border-[var(--colour-interface-form-border-default)]",
              // Hover
              "group-hover:border-[var(--colour-interface-form-border-hover)]",
              // Active (mouse focus)
              "group-has-[:focus:not(:focus-visible)]:border-[var(--colour-interface-form-border-active)]",
              // Focus (keyboard) - stays default
              "group-has-[:focus-visible]:border-[var(--colour-interface-form-border-default)]",
              // Transition
              "transition-[border-color]",
              // Error state overrides
              error && !disabled && [
                "border-[var(--colour-interface-form-border-error)]",
                "group-hover:border-[var(--colour-interface-form-border-error)]",
                "group-has-[:focus-visible]:border-[var(--colour-interface-form-border-error)]",
                "group-has-[:focus:not(:focus-visible)]:border-[var(--colour-interface-form-border-error)]",
              ],
            )}
          >
            {trailAddon}
          </div>
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

export { InputAddons };
