import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-heading-xl",
        "text-heading-l",
        "text-heading-m",
        "text-heading-s",
        "text-heading-xs",
        "text-heading-eyebrow",
        "text-semibold-l",
        "text-semibold-m",
        "text-semibold-s",
        "text-semibold-xs",
        "text-medium-l",
        "text-medium-m",
        "text-medium-s",
        "text-medium-xs",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
