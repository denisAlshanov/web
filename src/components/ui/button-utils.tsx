"use client";

import React from "react";

/** Event handler prop name pattern (matches onClick, onKeyDownCapture, etc.) */
export const EVENT_HANDLER_RE = /^on[A-Z]/;

/**
 * When asChild + disabled, strip all event handler props from the slotted child
 * so Radix Slot's mergeProps has nothing to merge for the child side.
 *
 * This avoids two problems with the previous native-capture-listener approach:
 * 1. React 19 delegates capture listeners on the root and dispatches synthetic
 *    capture handlers (onClickCapture, etc.) before native capture listeners
 *    on the target node fire — so child handlers could still run.
 * 2. Native listeners were tied to a useEffect dep array ([asChild, isDisabled])
 *    and would go stale if the underlying DOM node changed without those deps
 *    changing.
 */
export function stripChildEventHandlers(
  children: React.ReactNode,
): React.ReactNode {
  if (!React.isValidElement(children)) return children;
  const cleanProps = Object.fromEntries(
    Object.entries(children.props as Record<string, unknown>).map(
      ([key, value]) => [key, EVENT_HANDLER_RE.test(key) ? undefined : value],
    ),
  );
  return React.cloneElement(children, cleanProps);
}

/**
 * Prevent native activation (e.g. link navigation) when asChild + disabled.
 * pointer-events-none blocks pointer input but not programmatic clicks,
 * and aria-disabled does not prevent native behavior — so we need an
 * explicit handler that calls preventDefault.
 */
export function preventActivation(e: React.MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
}

/** Block Enter/Space from activating native link navigation when disabled. */
export function preventKeyboardActivation(e: React.KeyboardEvent) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    e.stopPropagation();
  }
}

export function Spinner() {
  return (
    <svg
      className="size-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
