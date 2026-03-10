"use client";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import type { CartItem as CartItemType } from "@/types";
import { urlForWithDimensions } from "@/lib/sanity/client";
import { formatMXN } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const price = item.product.presentations?.find((p) => p.size === item.selectedPresentation)?.price ?? 0;
  const imageUrl = item.product.images?.[0] ? urlForWithDimensions(item.product.images[0], 80, 80) : "/placeholder-product.jpg";

  return (
    <div className="flex gap-3 py-4 border-b border-[hsl(var(--border))] last:border-0">
      <div className="h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-[hsl(var(--muted))]">
        <Image
          src={imageUrl}
          alt={item.product.images?.[0]?.alt ?? item.product.name}
          width={80}
          height={80}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-snug line-clamp-2">{item.product.name}</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{item.selectedPresentation}</p>
        <p className="font-semibold text-sm text-[hsl(var(--primary))] mt-1">
          {formatMXN(price * item.quantity * 1.16)}
        </p>

        {/* Quantity control */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 min-h-0 min-w-0"
            onClick={() => updateQuantity(item.product._id, item.selectedPresentation, item.quantity - 1)}
            aria-label="Disminuir cantidad"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm w-6 text-center font-medium" aria-live="polite" aria-label={`Cantidad: ${item.quantity}`}>
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 min-h-0 min-w-0"
            onClick={() => updateQuantity(item.product._id, item.selectedPresentation, item.quantity + 1)}
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 min-h-0 min-w-0 shrink-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))]"
        onClick={() => removeItem(item.product._id, item.selectedPresentation)}
        aria-label={`Eliminar ${item.product.name} del carrito`}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
