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
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-display text-[#1A1A6E]/40">$</span>
          <NumberTicker
            key={selected}
            value={priceWithIVA}
            decimalPlaces={2}
            className="text-4xl font-display text-[#5B00B5]"
          />
          <span className="text-4xl font-display text-[#1A1A6E]/40">MXN</span>
        </div>
        <span className="text-xs text-[#1A1A6E]/50">IVA incluido</span>
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
                      ? "border-[#5B00B5] bg-[rgba(91,0,181,0.08)] text-[#5B00B5] font-bold"
                      : "border-[rgba(26,26,110,0.15)] bg-white text-[#1A1A6E]/60 hover:border-[rgba(91,0,181,0.4)] hover:text-[#5B00B5]"
                  )}
                >
                  <span>{p.size}</span>
                  <span className="text-xs opacity-70">{formatMXN(p.price * 1.16)}</span>
                  {isSelected && <BorderBeam size={80} duration={4} borderWidth={1.5} colorFrom="#5B00B5" colorTo="#80CC28" />}
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
        <span className="text-sm text-[#1A1A6E]/50">
          23 personas compraron esto esta semana
        </span>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="flex-1 gap-2 bg-[#5B00B5] hover:bg-[#3D007A] text-white border-0"
          aria-label={`Agregar ${product.name} (${selected}) al carrito`}
        >
          <ShoppingCart className="h-5 w-5" />
          Agregar al carrito
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="shrink-0 h-12 w-12 border-[rgba(26,26,110,0.2)] hover:border-[rgba(91,0,181,0.4)]"
          onClick={() => toggleItem(product)}
          aria-label={wishlisted ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
          aria-pressed={wishlisted}
        >
          <Heart className={cn("h-5 w-5", wishlisted && "fill-red-500 text-red-500")} />
        </Button>
      </div>

      <ul className="space-y-1.5 text-sm">
        <li className="flex items-center gap-2 text-[#1A1A6E]/60"><ShieldCheck className="h-4 w-4 text-[#5B00B5] shrink-0" aria-hidden="true" /> Certificado COFEPRIS</li>
        <li className="flex items-center gap-2 text-[#1A1A6E]/60"><Leaf className="h-4 w-4 text-[#80CC28] shrink-0" aria-hidden="true" /> Biodegradable</li>
        <li className="flex items-center gap-2 text-[#1A1A6E]/60"><Truck className="h-4 w-4 text-[#4DC8E8] shrink-0" aria-hidden="true" /> Envío a todo México</li>
        <li className="flex items-center gap-2 text-[#1A1A6E]/60"><RefreshCw className="h-4 w-4 text-[#4DC8E8] shrink-0" aria-hidden="true" /> Devoluciones en 30 días</li>
      </ul>
    </div>
  );
}
