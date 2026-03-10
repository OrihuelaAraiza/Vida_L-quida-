"use client";
import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SizeSelector } from "@/components/product/SizeSelector";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface AddToCartSectionProps {
  product: Product;
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const [selected, setSelected] = useState(product.presentations?.[0]?.size ?? "");
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product._id);

  const currentPresentation = product.presentations?.find((p) => p.size === selected);
  const price = currentPresentation?.price ?? product.presentations?.[0]?.price ?? 0;

  function handleAddToCart() {
    addItem(product, selected);
  }

  return (
    <div className="space-y-5">
      <PriceDisplay price={price} size="lg" />

      <SizeSelector
        presentations={product.presentations ?? []}
        selected={selected}
        onChange={setSelected}
      />

      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="flex-1 gap-2"
          aria-label={`Agregar ${product.name} (${selected}) al carrito`}
        >
          <ShoppingCart className="h-5 w-5" />
          Agregar al carrito
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="shrink-0 h-12 w-12"
          onClick={() => toggleItem(product)}
          aria-label={wishlisted ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
          aria-pressed={wishlisted}
        >
          <Heart className={cn("h-5 w-5", wishlisted && "fill-red-500 text-red-500")} />
        </Button>
      </div>

      <ul className="space-y-1.5 text-sm text-[hsl(var(--muted-foreground))]">
        <li className="flex items-center gap-2">✅ Certificado COFEPRIS</li>
        <li className="flex items-center gap-2">🌿 Biodegradable</li>
        <li className="flex items-center gap-2">🚚 Envío a todo México</li>
        <li className="flex items-center gap-2">🔄 Devoluciones en 30 días</li>
      </ul>
    </div>
  );
}
