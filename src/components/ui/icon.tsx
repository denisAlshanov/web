import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentType, Ref, SVGProps } from "react";

import { cn } from "@/lib/utils";

const iconVariants = cva("inline-block shrink-0", {
  variants: {
    color: {
      heavy: "text-[var(--colour-interface-icon-heavy)]",
      default: "text-[var(--colour-interface-icon-default)]",
      supporting: "text-[var(--colour-interface-icon-supporting)]",
      onHeavy: "text-[var(--colour-interface-icon-onHeavy)]",
      error: "text-[var(--colour-interface-icon-semantic-error)]",
      info: "text-[var(--colour-interface-icon-semantic-info)]",
      success: "text-[var(--colour-interface-icon-semantic-success)]",
      warning: "text-[var(--colour-interface-icon-semantic-warning)]",
      danger: "text-[var(--colour-interface-icon-semantic-danger)]",
    },
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    color: "heavy",
    size: "md",
  },
});

type SizeVariant = NonNullable<VariantProps<typeof iconVariants>["size"]>;

const sizeMap: Record<SizeVariant, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type IconProps = Omit<SVGProps<SVGSVGElement>, "color" | "width" | "height"> &
  VariantProps<typeof iconVariants> & {
    icon: IconComponent;
    ref?: Ref<SVGSVGElement>;
  };

export function Icon({
  icon: IconComponent,
  color,
  size,
  className,
  strokeWidth = 2,
  ref,
  ...props
}: IconProps) {
  const resolvedSize = sizeMap[size ?? "md"];

  return (
    <IconComponent
      {...props}
      ref={ref}
      width={resolvedSize}
      height={resolvedSize}
      strokeWidth={strokeWidth}
      className={cn(iconVariants({ color, size }), className)}
    />
  );
}
