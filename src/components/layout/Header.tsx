"use client";
import Link from "next/link";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  { name: "Todos los productos", href: "/productos" },
  { name: "Hogar", href: "/productos?categoria=hogar" },
  { name: "Industrial", href: "/productos?categoria=industrial" },
  { name: "Automotriz", href: "/productos?categoria=automotriz" },
  { name: "Cosmética", href: "/productos?categoria=cosmetica" },
];

export function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const { openSearch } = useUIStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[hsl(var(--border))] bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Vida Líquida - Inicio">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))]">
              <span className="text-white font-bold text-sm font-['Alegreya']">VL</span>
            </div>
            <span className="hidden sm:block font-bold text-lg font-['Alegreya'] text-[hsl(var(--primary))]">
              Vida Líquida
            </span>
          </Link>

          {/* Category nav — horizontal scroll on mobile */}
          <nav
            aria-label="Categorías de productos"
            className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 px-4"
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="whitespace-nowrap px-3 py-2 text-sm rounded-[var(--radius)] hover:bg-[hsl(var(--muted))] transition-colors text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] min-h-[44px] flex items-center"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={openSearch}
              aria-label="Buscar productos"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" asChild aria-label="Mi cuenta">
              <Link href="/cuenta">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              aria-label={`Carrito de compras, ${itemCount} artículos`}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] min-h-0 min-w-0"
                  aria-hidden
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile category scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-none pb-2">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="whitespace-nowrap px-3 py-1.5 text-xs rounded-full border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
}
