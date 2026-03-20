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

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  hogar:      { bg: "rgba(128,204,40,0.15)",  text: "#5FA01E", border: "rgba(128,204,40,0.4)" },
  industrial: { bg: "rgba(91,0,181,0.12)",    text: "#5B00B5", border: "rgba(91,0,181,0.3)" },
  automotriz: { bg: "rgba(26,26,110,0.12)",   text: "#1A1A6E", border: "rgba(26,26,110,0.3)" },
  cosmetica:  { bg: "rgba(255,214,0,0.15)",   text: "#C28A00", border: "rgba(255,214,0,0.4)" },
  default:    { bg: "rgba(77,200,232,0.12)",  text: "#2AAAC8", border: "rgba(77,200,232,0.3)" },
};

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
  const isStatic = Boolean(product._staticImageUrl);
  const imageUrl = product._staticImageUrl
    ?? (product.images?.[0] ? urlForWithDimensions(product.images[0], 400, 400) : "/placeholder-product.jpg");

  const catKey = (product.category?.slug ?? "default").toLowerCase();
  const catColor = CATEGORY_COLORS[catKey] ?? CATEGORY_COLORS.default;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, defaultPresentation);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleItem(product);
  }

  return (
    <BlurFade delay={index * 0.05} className="h-full">
      <MagicCard
        gradientColor="rgba(91,0,181,0.08)"
        gradientSize={180}
        className="rounded-xl overflow-hidden bg-white border border-[rgba(26,26,110,0.1)] shadow-sm hover:shadow-md transition-shadow"
      >
        <article className="group relative w-full">
          <Link href={`/productos/${product.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ring))] rounded-xl">
            <div
              className={cn(
                "relative overflow-hidden rounded-xl bg-gray-100 mb-3",
                isStatic ? "aspect-[16/9]" : (featured ? "aspect-[4/3] md:aspect-square" : "aspect-square")
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
                <Badge
                  className="absolute top-2 left-2 text-xs border hover:opacity-90"
                  style={{ background: catColor.bg, color: catColor.text, borderColor: catColor.border }}
                >
                  {product.category.name}
                </Badge>
              )}

              {/* Wishlist */}
              <button
                onClick={handleWishlist}
                aria-label={wishlisted ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
                className={cn(
                  "absolute top-2 right-2 h-9 w-9 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all shadow-sm hover:scale-110 border border-[rgba(26,26,110,0.15)]",
                  wishlisted ? "text-red-500" : "text-[#1A1A6E]/50"
                )}
              >
                <Heart className={cn("h-4 w-4", wishlisted && "fill-red-500")} />
              </button>

              {/* Quick add */}
              <div className="absolute bottom-0 inset-x-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="w-full gap-2 bg-[#5B00B5] hover:bg-[#3D007A] text-white border-0"
                  aria-label={`Agregar ${product.name} al carrito`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Agregar
                </Button>
              </div>
            </div>

            <div className="space-y-1 px-1 pb-3">
              <h3 className="font-medium text-sm leading-snug line-clamp-2 text-[#1A1A6E] group-hover:text-[#5B00B5] transition-colors">
                {product.name}
              </h3>
              <Rating value={product.rating ?? 0} size="sm" showCount count={product.reviewCount} className="[&_.count]:text-[#1A1A6E]/50" />
              <PriceDisplay price={product.presentations?.[0]?.price ?? 0} size="sm" showIVA={false} className="text-[#5B00B5] font-bold" />
            </div>
          </Link>
        </article>

        {/* BorderBeam for bestseller products */}
        {product.isBestseller && (
          <BorderBeam
            colorFrom="#5B00B5"
            colorTo="#80CC28"
            duration={8}
            borderWidth={1.5}
          />
        )}
      </MagicCard>
    </BlurFade>
  );
}
