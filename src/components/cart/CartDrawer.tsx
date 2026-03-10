"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyState } from "@/components/shared/EmptyState";
import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";

export function CartDrawer() {
  const { isOpen, closeCart, items, getTotalPrice } = useCartStore();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const subtotal = getTotalPrice();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex flex-col w-full max-w-md p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-[hsl(var(--border))]">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-[hsl(var(--primary))]" />
            Mi carrito
            {items.length > 0 && (
              <span className="ml-auto text-sm font-normal text-[hsl(var(--muted-foreground))]">
                {items.length} producto{items.length !== 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              title="Tu carrito está vacío"
              description="Agrega productos para comenzar tu pedido."
              action={{ label: "Ver productos", href: "/productos" }}
              icon={<ShoppingCart className="h-14 w-14" />}
            />
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6" aria-label="Productos en el carrito">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={`${item.product._id}-${item.selectedPresentation}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            <div className="px-6 pb-6 pt-4 border-t border-[hsl(var(--border))] space-y-4">
              <CartSummary subtotal={subtotal} />
              <Button asChild className="w-full" size="lg" onClick={closeCart}>
                <Link href="/checkout">Ir al checkout →</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={closeCart}>
                Seguir comprando
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
