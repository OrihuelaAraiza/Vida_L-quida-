import { formatMXN } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  size?: "sm" | "md" | "lg";
  showIVA?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl font-bold",
};

export function PriceDisplay({ price, size = "md", showIVA = true, className }: PriceDisplayProps) {
  const withIVA = price * 1.16;
  return (
    <div className={cn("flex flex-col", className)}>
      <span className={cn("font-semibold text-[hsl(var(--primary))]", sizeMap[size])}>
        {formatMXN(withIVA)}
      </span>
      {showIVA && (
        <span className="text-xs text-[hsl(var(--muted-foreground))]">
          IVA incluido
        </span>
      )}
    </div>
  );
}
