"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { urlForWithDimensions } from "@/lib/sanity/client";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/shared/Rating";
import { PriceDisplay } from "./PriceDisplay";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/productos/${product.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ring))] rounded-xl">
        <div className="relative overflow-hidden rounded-xl bg-[hsl(var(--muted))] aspect-square mb-3">
          <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt ?? `${product.name} - Vida Líquida`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Category badge */}
          {product.category && (
            <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
              {product.category.name}
            </Badge>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
            className={cn(
              "absolute top-2 right-2 h-9 w-9 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all shadow-sm hover:scale-110",
              wishlisted ? "text-red-500" : "text-[hsl(var(--muted-foreground))]"
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

        <div className="space-y-1 px-1">
          <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-[hsl(var(--primary))] transition-colors">
            {product.name}
          </h3>
          <Rating value={product.rating ?? 0} size="sm" showCount count={product.reviewCount} />
          <PriceDisplay price={product.presentations?.[0]?.price ?? 0} size="sm" showIVA={false} />
        </div>
      </Link>
    </motion.article>
  );
}
