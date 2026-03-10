import { formatMXN } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, MapPin } from "lucide-react";

interface OxxoVoucherProps {
  reference: string;
  amount: number;
  expiresAt: string;
  orderNumber: string;
}

export function OxxoVoucher({ reference, amount, expiresAt, orderNumber }: OxxoVoucherProps) {
  return (
    <div className="border-2 border-[hsl(var(--border))] rounded-xl overflow-hidden">
      {/* OXXO header */}
      <div className="bg-[#EE2737] p-4 text-white text-center">
        <p className="font-bold text-2xl tracking-widest">OXXO</p>
        <p className="text-sm opacity-90">Ficha de pago</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="text-center">
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Pedido #{orderNumber}</p>
          <p className="text-3xl font-bold text-[hsl(var(--primary))]">{formatMXN(amount)}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            Válido hasta: {new Date(expiresAt).toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="bg-[hsl(var(--muted))] rounded-lg p-4 text-center">
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Referencia de pago</p>
          <p className="font-mono text-2xl font-bold tracking-widest text-[hsl(var(--foreground))]">
            {reference.replace(/(.{4})/g, "$1 ").trim()}
          </p>
        </div>

        <div className="flex items-start gap-2 text-xs text-[hsl(var(--muted-foreground))]">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[hsl(var(--primary))]" />
          <p>Presenta esta referencia en cualquier tienda OXXO de México. El pago se verifica en 1-2 horas.</p>
        </div>

        <Button variant="outline" className="w-full gap-2" onClick={() => window.print()}>
          <Download className="h-4 w-4" />
          Descargar ficha
        </Button>
      </div>
    </div>
  );
}
