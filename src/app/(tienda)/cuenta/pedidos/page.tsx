import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { Package } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; variant: "default" | "secondary" | "accent" | "muted" }> = {
  pending: { label: "Pendiente de pago", variant: "muted" },
  paid: { label: "Pagado", variant: "accent" },
  shipped: { label: "En camino", variant: "secondary" },
  delivered: { label: "Entregado", variant: "default" },
  cancelled: { label: "Cancelado", variant: "muted" },
};

// In a real app, fetch from DB
const MOCK_ORDERS: any[] = [];

export default function PedidosPage() {
  return (
    <Container className="py-8">
      <Breadcrumb
        items={[{ label: "Mi cuenta", href: "/cuenta" }, { label: "Mis pedidos" }]}
        className="mb-6"
      />
      <h1 className="text-3xl font-bold mb-8">Mis pedidos</h1>

      {MOCK_ORDERS.length === 0 ? (
        <EmptyState
          title="Sin pedidos aún"
          description="Cuando realices tu primera compra, aparecerá aquí."
          action={{ label: "Ir a la tienda", href: "/productos" }}
          icon={<Package className="h-16 w-16" />}
        />
      ) : (
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => {
            const status = STATUS_LABELS[order.status] ?? { label: order.status, variant: "muted" as const };
            return (
              <div key={order._id} className="bg-white rounded-2xl p-6 border border-[hsl(var(--border))]">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold">Pedido #{order.orderNumber}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {new Date(order._createdAt).toLocaleDateString("es-MX")}
                    </p>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <div className="mt-4 flex gap-3 flex-wrap">
                  <Button size="sm" variant="outline" asChild>
                    <a href={`/checkout/confirmacion/${order._id}`}>Ver detalles</a>
                  </Button>
                  <Button size="sm" variant="ghost">Reordenar</Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
