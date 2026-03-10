"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";
import { formatMXN } from "@/lib/utils";
import { useState, useCallback } from "react";

interface ProductFiltersProps {
  categories: Category[];
}

const PRESENTATIONS = ["500ml", "1L", "5L", "20L"];
const SORT_OPTIONS = [
  { value: "", label: "Más recientes" },
  { value: "price_asc", label: "Precio: menor a mayor" },
  { value: "price_desc", label: "Precio: mayor a menor" },
  { value: "popular", label: "Más populares" },
];

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 3000]);

  const updateParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/productos?${params.toString()}`);
  }, [router, searchParams]);

  const activeCategory = searchParams.get("categoria");
  const activeSort = searchParams.get("sort") ?? "";

  return (
    <aside aria-label="Filtros de productos" className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Ordenar por</h3>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("sort", opt.value || null)}
              className={cn(
                "w-full text-left text-sm py-2 px-3 rounded-lg transition-colors min-h-[44px]",
                activeSort === opt.value
                  ? "bg-[hsl(var(--primary))] text-white font-medium"
                  : "hover:bg-[hsl(var(--muted))]"
              )}
              aria-pressed={activeSort === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Categoría</h3>
        <div className="space-y-1">
          <button
            onClick={() => updateParam("categoria", null)}
            className={cn(
              "w-full text-left text-sm py-2 px-3 rounded-lg transition-colors min-h-[44px]",
              !activeCategory
                ? "bg-[hsl(var(--primary))] text-white font-medium"
                : "hover:bg-[hsl(var(--muted))]"
            )}
            aria-pressed={!activeCategory}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateParam("categoria", cat.slug)}
              className={cn(
                "w-full text-left text-sm py-2 px-3 rounded-lg transition-colors min-h-[44px]",
                activeCategory === cat.slug
                  ? "bg-[hsl(var(--primary))] text-white font-medium"
                  : "hover:bg-[hsl(var(--muted))]"
              )}
              aria-pressed={activeCategory === cat.slug}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Presentations */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Presentación</h3>
        <div className="space-y-1">
          {PRESENTATIONS.map((size) => (
            <button
              key={size}
              onClick={() => updateParam("presentacion", searchParams.get("presentacion") === size ? null : size)}
              className={cn(
                "w-full text-left text-sm py-2 px-3 rounded-lg transition-colors min-h-[44px]",
                searchParams.get("presentacion") === size
                  ? "bg-[hsl(var(--primary))] text-white font-medium"
                  : "hover:bg-[hsl(var(--muted))]"
              )}
              aria-pressed={searchParams.get("presentacion") === size}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price range */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Precio</h3>
        <Slider
          min={0}
          max={3000}
          step={50}
          value={priceRange}
          onValueChange={setPriceRange}
          onValueCommit={(val) => {
            updateParam("min", val[0] > 0 ? String(val[0]) : null);
            updateParam("max", val[1] < 3000 ? String(val[1]) : null);
          }}
          aria-label="Rango de precio"
        />
        <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-2">
          <span>{formatMXN(priceRange[0])}</span>
          <span>{formatMXN(priceRange[1])}</span>
        </div>
      </div>
    </aside>
  );
}
