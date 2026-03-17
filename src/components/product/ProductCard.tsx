"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { urlForWithDimensions } from "@/lib/sanity/client";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/shared/Rating";
import { PriceDisplay } from "./PriceDisplay";
import { cn } from "@/lib/utils";
import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { BlurFade } from "@/components/magicui/blur-fade";

interface ProductCardProps {
  product: Product;
  index?: number;
  featured?: boolean;
}

export function ProductCard({ product, index = 0, featured = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product._id);
  const defaultPresentation = product.presentations?.[0]?.size ?? "";
  const imageUrl = product.images?.[0]
    ? urlForWithDimensions(product.images[0], 400, 400)
    : "/placeholder-product.jpg";

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, defaultPresentation);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleItem(product);
  }

  return (
    <BlurFade delay={index * 0.05} inView className="h-full">
      <MagicCard
        gradientColor="rgba(0,194,240,0.15)"
        gradientSize={180}
        className="rounded-xl overflow-hidden bg-[#071A2E] border border-[rgba(0,194,240,0.1)]"
      >
        <article className="group relative w-full">
          <Link href={`/productos/${product.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ring))] rounded-xl">
            <div
              className={cn(
                "relative overflow-hidden rounded-xl bg-[hsl(var(--muted))] mb-3",
                featured ? "aspect-[4/3] md:aspect-square" : "aspect-square"
              )}
            >
              <Image
                src={imageUrl}
                alt={product.images?.[0]?.alt ?? `${product.name} - Vida Líquida`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Category badge */}
              {product.category && (
                <Badge className="absolute top-2 left-2 text-xs bg-[rgba(0,194,240,0.15)] text-[#00C2F0] border border-[rgba(0,194,240,0.3)] hover:bg-[rgba(0,194,240,0.25)]">
                  {product.category.name}
                </Badge>
              )}

              {/* Wishlist */}
              <button
                onClick={handleWishlist}
                aria-label={wishlisted ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
                className={cn(
                  "absolute top-2 right-2 h-9 w-9 rounded-full flex items-center justify-center bg-[#071A2E]/80 backdrop-blur-sm transition-all shadow-sm hover:scale-110 border border-[rgba(0,194,240,0.2)]",
                  wishlisted ? "text-red-500" : "text-white/50"
                )}
              >
                <Heart className={cn("h-4 w-4", wishlisted && "fill-red-500")} />
              </button>

              {/* Quick add */}
              <div className="absolute bottom-0 inset-x-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="w-full gap-2"
                  aria-label={`Agregar ${product.name} al carrito`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Agregar
                </Button>
              </div>
            </div>

            <div className="space-y-1 px-1 pb-3">
              <h3 className="font-medium text-sm leading-snug line-clamp-2 text-white group-hover:text-[#00C2F0] transition-colors">
                {product.name}
              </h3>
              <Rating value={product.rating ?? 0} size="sm" showCount count={product.reviewCount} className="[&_.count]:text-white/50" />
              <PriceDisplay price={product.presentations?.[0]?.price ?? 0} size="sm" showIVA={false} className="text-[#00C2F0]" />
            </div>
          </Link>
        </article>

        {/* BorderBeam for bestseller products */}
        {product.isBestseller && (
          <BorderBeam
            colorFrom="#00C2F0"
            colorTo="#FFD600"
            duration={8}
            borderWidth={1.5}
          />
        )}
      </MagicCard>
    </BlurFade>
  );
}
