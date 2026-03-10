import { formatMXN } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
}

export function CartSummary({ subtotal, shipping }: CartSummaryProps) {
  const iva = subtotal * 0.16;
  const base = subtotal;
  const total = base + iva + (shipping ?? 0);

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-[hsl(var(--muted-foreground))]">Subtotal (sin IVA)</span>
        <span>{formatMXN(base)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-[hsl(var(--muted-foreground))]">IVA (16%)</span>
        <span>{formatMXN(iva)}</span>
      </div>
      {shipping !== undefined && (
        <div className="flex justify-between">
          <span className="text-[hsl(var(--muted-foreground))]">Envío</span>
          <span>{shipping === 0 ? "Gratis" : formatMXN(shipping)}</span>
        </div>
      )}
      <Separator />
      <div className="flex justify-between font-semibold text-base">
        <span>Total</span>
        <span className="text-[hsl(var(--primary))]">{formatMXN(total)}</span>
      </div>
    </div>
  );
}
