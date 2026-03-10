import { CheckCircle, Package, Truck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OxxoVoucher } from "./OxxoVoucher";
import type { Order } from "@/types";
import { formatMXN } from "@/lib/utils";
import Link from "next/link";

interface OrderConfirmationProps {
  order: Order;
}

const STATUS_STEPS = [
  { icon: CheckCircle, label: "Pedido confirmado", done: true },
  { icon: Package, label: "Preparando tu pedido", done: false },
  { icon: Truck, label: "En camino", done: false },
  { icon: CheckCircle, label: "Entregado", done: false },
];

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-[hsl(var(--primary))]" />
        </div>
        <h1 className="text-2xl font-bold">¡Pedido confirmado!</h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          Hemos recibido tu pedido #{order.orderNumber}.
          {" "}Recibirás un correo en <strong>{order.customerEmail}</strong>
        </p>
      </div>

      {/* OXXO voucher */}
      {order.paymentMethod === "oxxo" && order.oxxoReference && (
        <OxxoVoucher
          reference={order.oxxoReference}
          amount={order.total}
          expiresAt={new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()}
          orderNumber={order.orderNumber}
        />
      )}

      {/* SPEI */}
      {order.paymentMethod === "spei" && order.speiClabe && (
        <div className="p-6 rounded-xl border-2 border-[hsl(var(--border))] space-y-3">
          <p className="font-semibold">Transferencia SPEI</p>
          <div className="bg-[hsl(var(--muted))] rounded-lg p-4">
            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1">CLABE interbancaria</p>
            <p className="font-mono text-xl font-bold tracking-wider">{order.speiClabe}</p>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Monto a transferir: <strong>{formatMXN(order.total)}</strong>.
            El pago se verifica en 72 horas hábiles.
          </p>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-3">
        <h2 className="font-semibold">Estado de tu pedido</h2>
        <ol className="space-y-3">
          {STATUS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={i} className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${step.done ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                <span className={`text-sm ${step.done ? "font-medium" : "text-[hsl(var(--muted-foreground))]"}`}>
                  {step.label}
                </span>
                {step.done && <span className="text-xs text-[hsl(var(--primary))] ml-auto">✓</span>}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild className="flex-1">
          <Link href="/cuenta/pedidos">Ver mis pedidos</Link>
        </Button>
        <Button variant="outline" asChild className="flex-1">
          <Link href="/productos">Seguir comprando</Link>
        </Button>
      </div>
    </div>
  );
}
