import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { ProductGridSkeleton } from "@/components/shared/LoadingSkeleton";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) return <ProductGridSkeleton />;

  if (!products.length) {
    return (
      <EmptyState
        title="Sin productos"
        description="No encontramos productos con esos filtros. Intenta con otros criterios."
        action={{ label: "Ver todos los productos", href: "/productos" }}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto">
      {products.map((product, index) => {
        const isFeatured = index % 6 === 0;
        return (
          <div
            key={product._id}
            className={cn(
              isFeatured && "md:col-span-2 md:row-span-2"
            )}
          >
            <ProductCard product={product} index={index} featured={isFeatured} />
          </div>
        );
      })}
    </div>
  );
}
