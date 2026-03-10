import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
  className?: string;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function Rating({ value, max = 5, size = "md", showCount = false, count, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`Calificación: ${value} de ${max} estrellas`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(value);
          const partial = !filled && i < value;
          return (
            <Star
              key={i}
              className={cn(
                sizeMap[size],
                "transition-colors",
                filled
                  ? "fill-[hsl(var(--accent))] text-[hsl(var(--accent))]"
                  : partial
                  ? "fill-[hsl(var(--accent)/50%)] text-[hsl(var(--accent))]"
                  : "fill-transparent text-[hsl(var(--muted))]"
              )}
            />
          );
        })}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-[hsl(var(--muted-foreground))]">({count})</span>
      )}
    </div>
  );
}
