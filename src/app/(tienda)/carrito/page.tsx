"use client";
import { useCartStore } from "@/stores/cart-store";
import { Container } from "@/components/layout/Container";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default function CartPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const subtotal = getTotalPrice();

  if (items.length === 0) {
    return (
      <Container className="py-20">
        <EmptyState
          title="Tu carrito está vacío"
          description="Explora nuestros productos de limpieza orgánica y añade los que te interesen."
          action={{ label: "Ver productos", href: "/productos" }}
          icon={<ShoppingCart className="h-16 w-16" />}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Breadcrumb items={[{ label: "Carrito" }]} className="mb-6" />
      <h1 className="text-3xl font-bold mb-8">Mi carrito</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <div>
          {items.map((item) => (
            <CartItem key={`${item.product._id}-${item.selectedPresentation}`} item={item} />
          ))}
          <button
            onClick={clearCart}
            className="mt-4 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))] transition-colors min-h-[44px] flex items-center"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 h-fit space-y-6">
          <h2 className="font-semibold text-lg">Resumen del pedido</h2>
          <CartSummary subtotal={subtotal} />
          <Button asChild className="w-full" size="lg">
            <Link href="/checkout">Proceder al pago →</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/productos">Seguir comprando</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
