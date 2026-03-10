"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "./ProductGallery";
import { SizeSelector } from "./SizeSelector";
import { Rating } from "@/components/shared/Rating";
import { PriceDisplay } from "./PriceDisplay";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import type { Product } from "@/types";
import Link from "next/link";

interface QuickViewProps {
  product: Product | null;
}

export function QuickView({ product }: QuickViewProps) {
  const { quickViewProductId, closeQuickView } = useUIStore();
  const addItem = useCartStore((s) => s.addItem);
  const [selected, setSelected] = useState<string>("");

  if (!product) return null;

  const currentPresentation = selected || (product.presentations?.[0]?.size ?? "");
  const currentPrice = product.presentations?.find((p) => p.size === currentPresentation)?.price ?? product.presentations?.[0]?.price ?? 0;

  function handleAdd() {
    if (product) {
      addItem(product, currentPresentation);
      closeQuickView();
    }
  }

  return (
    <Dialog open={!!quickViewProductId} onOpenChange={(open) => !open && closeQuickView()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-6">
            <ProductGallery images={product.images ?? []} productName={product.name} />
          </div>
          <div className="p-6 flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-xl">{product.name}</DialogTitle>
            </DialogHeader>
            <Rating value={product.rating ?? 0} size="md" showCount count={product.reviewCount} />
            <PriceDisplay price={currentPrice} size="lg" />
            <SizeSelector
              presentations={product.presentations ?? []}
              selected={currentPresentation}
              onChange={setSelected}
            />
            <Button onClick={handleAdd} className="gap-2 mt-auto">
              <ShoppingCart className="h-4 w-4" />
              Agregar al carrito
            </Button>
            <Link
              href={`/productos/${product.slug}`}
              onClick={closeQuickView}
              className="text-center text-sm text-[hsl(var(--primary))] hover:underline"
            >
              Ver producto completo →
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
