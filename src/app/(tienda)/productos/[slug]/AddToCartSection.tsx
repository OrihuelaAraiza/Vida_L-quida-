"use client";
import { useState } from "react";
import { ShoppingCart, Heart, ShieldCheck, Leaf, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SizeSelector } from "@/components/product/SizeSelector";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { Product } from "@/types";
import { cn, formatMXN } from "@/lib/utils";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BorderBeam } from "@/components/magicui/border-beam";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

const BUYER_AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
];

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
  const priceWithIVA = price * 1.16;

  function handleAddToCart() {
    addItem(product, selected);
  }

  return (
    <div className="space-y-5">
      {/* Animated price display — re-triggers on size change via key */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1 text-[hsl(var(--primary))]">
          <span className="text-2xl font-bold">$</span>
          <NumberTicker
            key={selected}
            value={priceWithIVA}
            decimalPlaces={2}
            className="text-2xl font-bold text-[hsl(var(--primary))]"
          />
          <span className="text-2xl font-bold">MXN</span>
        </div>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">IVA incluido</span>
      </div>

      {/* Size selector with BorderBeam on selected pill */}
      <div>
        <p className="text-sm font-medium mb-2" id="size-selector-label">Presentación:</p>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="size-selector-label">
          {(product.presentations ?? []).map((p) => {
            const isSelected = p.size === selected;
            return (
              <div key={p.size} className="relative">
                <button
                  type="button"
                  onClick={() => setSelected(p.size)}
                  aria-pressed={isSelected}
                  aria-label={`${p.size} — ${formatMXN(p.price * 1.16)}`}
                  className={cn(
                    "relative flex flex-col items-center gap-0.5 rounded-md border px-4 py-2 text-sm transition-colors",
                    isSelected
                      ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] font-medium"
                      : "border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)]"
                  )}
                >
                  <span>{p.size}</span>
                  <span className="text-xs opacity-70">{formatMXN(p.price * 1.16)}</span>
                  {isSelected && <BorderBeam size={80} duration={4} borderWidth={1.5} />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Social proof — AvatarCircles + buyer count */}
      <div className="flex items-center gap-3">
        <AvatarCircles
          numPeople={23}
          avatarUrls={BUYER_AVATARS}
          className="[&_img]:h-7 [&_img]:w-7 [&_a]:h-7 [&_a]:w-7 [&_a]:text-[10px]"
        />
        <span className="text-sm text-[hsl(var(--foreground)/0.6)]">
          23 personas compraron esto esta semana
        </span>
      </div>

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
        <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[hsl(var(--primary))] shrink-0" aria-hidden="true" /> Certificado COFEPRIS</li>
        <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-[hsl(var(--primary))] shrink-0" aria-hidden="true" /> Biodegradable</li>
        <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-[hsl(var(--primary))] shrink-0" aria-hidden="true" /> Envío a todo México</li>
        <li className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-[hsl(var(--primary))] shrink-0" aria-hidden="true" /> Devoluciones en 30 días</li>
      </ul>
    </div>
  );
}
