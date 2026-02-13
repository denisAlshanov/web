"use client";

import React from "react";
import { NavArrowDown, NavArrowUp } from "iconoir-react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

export interface SelectProps {
  placeholder?: string;
  value?: string;
  leadingIcon?: React.ReactNode;
  helperText?: string;
  error?: string | boolean;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  "aria-describedby"?: string;
}

function Select({
  placeholder = "Select...",
  value,
  leadingIcon,
  helperText,
  error,
  disabled,
  open: controlledOpen,
  onOpenChange,
  children,
  className,
  id,
  "aria-describedby": externalDescribedBy,
}: SelectProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  // Guard against duplicate close calls within the same event loop tick
  // (e.g. mousedown outside + focusout both fire before a re-render).
  const closeFiredRef = React.useRef(false);

  const autoId = React.useId();
  const errorMessage = typeof error === "string" ? error : undefined;
  const displayHelperText = errorMessage || helperText;
  const descriptionId = displayHelperText
    ? `${id ?? autoId}-description`
    : undefined;
  const mergedDescribedBy =
    [descriptionId, externalDescribedBy].filter(Boolean).join(" ") || undefined;

  const setOpen = React.useCallback(
    (next: boolean) => {
      // Deduplicate only concurrent close events (mousedown outside +
      // focusout firing in the same tick). The flag is cleared via
      // microtask so subsequent user interactions still fire onOpenChange,
      // even when a controlled parent ignores the callback.
      if (!next && closeFiredRef.current) return;
      if (!next) {
        closeFiredRef.current = true;
        queueMicrotask(() => {
          closeFiredRef.current = false;
        });
      }
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  // Reset open state when disabled — prevents aria-expanded mismatch
  // and stale popup reappearing when re-enabled
  React.useEffect(() => {
    if (disabled && isOpen) {
      setOpen(false);
    }
  }, [disabled, isOpen, setOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setOpen(!isOpen);
  };

  // Close on click outside
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setOpen]);

  // Close on Escape — attached to root so stopPropagation prevents
  // parent components (e.g. modals) from also receiving the event.
  React.useEffect(() => {
    if (!isOpen) return;

    const root = rootRef.current;
    if (!root) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    root.addEventListener("keydown", handleKeyDown);
    return () => root.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setOpen]);

  // Close when focus leaves the component
  React.useEffect(() => {
    if (!isOpen) return;

    const root = rootRef.current;
    if (!root) return;

    let rafId: number;
    const handleFocusOut = () => {
      rafId = requestAnimationFrame(() => {
        if (root && !root.contains(document.activeElement)) {
          setOpen(false);
        }
      });
    };

    root.addEventListener("focusout", handleFocusOut);
    return () => {
      cancelAnimationFrame(rafId);
      root.removeEventListener("focusout", handleFocusOut);
    };
  }, [isOpen, setOpen]);

  const hasValue = value !== undefined && value !== "";

  return (
    <div
      ref={rootRef}
      className={cn(
        "flex flex-col gap-[var(--number-spacing-gap-gap-2xs)] items-start",
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
    >
      <div className="relative w-full">
        <button
          ref={triggerRef}
          type="button"
          id={id}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={disabled ? undefined : isOpen}
          aria-invalid={(!!error && !disabled) || undefined}
          aria-disabled={disabled || undefined}
          aria-describedby={mergedDescribedBy}
          onClick={handleToggle}
          className={cn(
            // Layout
            "group flex flex-row items-center gap-[var(--number-spacing-gap-gap-s)]",
            "w-full min-h-[44px]",
            "pl-[var(--number-spacing-padding-pad-m)] pr-[var(--number-spacing-padding-pad-l)] py-[var(--number-spacing-padding-pad-m)]",
            // Background and border
            "bg-[var(--colour-interface-surface-base)]",
            "border-2 border-solid rounded-[var(--number-radius-rad-input)]",
            // Text
            "text-left text-medium-m outline-none",
            // Default state
            "border-[var(--colour-interface-form-border-default)]",
            // Hover state
            !isOpen &&
              "hover:border-[var(--colour-interface-form-border-hover)]",
            // Focus (keyboard) state - 3px outer ring via box-shadow, inner border stays default
            "focus-visible:shadow-[0_0_0_3px_var(--colour-interface-form-border-focus)]",
            "focus-visible:border-[var(--colour-interface-form-border-default)]",
            // Active (open) state
            isOpen && "border-[var(--colour-interface-form-border-active)]",
            // Filled state (value present, closed)
            !isOpen &&
              hasValue &&
              "border-[var(--colour-interface-form-border-active)]",
            // Transition
            "transition-[border-color,box-shadow]",
            // Error state overrides
            error &&
              !disabled && [
                "border-[var(--colour-interface-form-border-error)]",
                "hover:border-[var(--colour-interface-form-border-error)]",
                "focus-visible:border-[var(--colour-interface-form-border-error)]",
              ],
            // Disabled state
            disabled &&
              "border-[var(--colour-interface-form-border-default)] cursor-default",
            // Cursor
            !disabled && "cursor-pointer",
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

          <span
            className={cn(
              "flex-1 min-w-0 truncate",
              hasValue
                ? "text-[color:var(--colour-interface-text-heavy)]"
                : "text-[color:var(--colour-interface-text-placeholder)]",
              // Hover darkens placeholder text
              !hasValue &&
                "group-hover:text-[color:var(--colour-interface-text-default)]",
              // Open state darkens placeholder text
              !hasValue &&
                isOpen &&
                "text-[color:var(--colour-interface-text-default)]",
            )}
          >
            {hasValue ? value : placeholder}
          </span>

          <span aria-hidden="true" className="shrink-0 flex items-center">
            <Icon
              icon={isOpen ? NavArrowUp : NavArrowDown}
              size="sm"
              color="supporting"
            />
          </span>
        </button>

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 z-50 mt-[var(--number-spacing-gap-gap-2xs)]">
            {children}
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

export { Select };
