"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/ui-store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchProducts } from "@/lib/sanity/queries";
import type { Product } from "@/types";
import Image from "next/image";
import { urlForWithDimensions } from "@/lib/sanity/client";
import { formatMXN } from "@/lib/utils";

const POPULAR_SEARCHES = [
  "Desengrasante",
  "Multilimpiador",
  "Desinfectante",
  "Automotriz",
  "Industrial",
];

export function SearchBar() {
  const { searchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await searchProducts(query);
        setResults(data ?? []);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  function handleSelect(slug: string) {
    closeSearch();
    setQuery("");
    router.push(`/productos/${slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      closeSearch();
      router.push(`/buscar?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  }

  return (
    <Dialog open={searchOpen} onOpenChange={(open) => !open && closeSearch()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <form onSubmit={handleSubmit} className="flex items-center border-b border-[hsl(var(--border))] px-4">
          <Search className="h-5 w-5 text-[hsl(var(--muted-foreground))] shrink-0" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-14"
            aria-label="Buscar productos"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} className="h-11 w-11 flex items-center justify-center" aria-label="Limpiar búsqueda">
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        <div className="max-h-96 overflow-y-auto p-4">
          {!query && (
            <div>
              <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-3">Búsquedas populares</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 rounded-full border border-[hsl(var(--border))] text-sm hover:bg-[hsl(var(--muted))] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[hsl(var(--primary))] border-t-transparent" />
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-1">
              {results.map((product) => (
                <button
                  key={product._id}
                  onClick={() => handleSelect(product.slug)}
                  className="w-full flex items-center gap-3 rounded-lg p-2 hover:bg-[hsl(var(--muted))] transition-colors text-left"
                >
                  {product.images?.[0] && (
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[hsl(var(--muted))]">
                      <Image
                        src={urlForWithDimensions(product.images[0], 48, 48)}
                        alt={product.images[0].alt ?? product.name}
                        width={48}
                        height={48}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{product.category?.name}</p>
                  </div>
                  <span className="text-sm font-semibold text-[hsl(var(--primary))] shrink-0">
                    {formatMXN(product.presentations?.[0]?.price ?? 0)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <p className="text-center py-8 text-[hsl(var(--muted-foreground))]">
              No se encontraron productos para &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
