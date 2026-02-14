import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  heading: string;
  description: string;
  className?: string;
}

export function EmptyState({ heading, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-[var(--number-spacing-gap-gap-m)]",
        className,
      )}
    >
      <h2 className="text-heading-l text-[color:var(--colour-interface-text-heavy)]">
        {heading}
      </h2>
      <p className="text-medium-l text-[color:var(--colour-interface-text-default)]">
        {description}
      </p>
    </div>
  );
}
