"use client";
import Link from "next/link";
import { ShoppingCart, User, Search } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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

  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(128,204,40,1)", "rgba(128,204,40,0.97)"]
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 80],
    ["0 0 0px transparent", "0 4px 24px rgba(91,0,181,0.15)"]
  );

  return (
    <motion.header
      className="sticky top-0 z-40 w-full relative"
      style={{
        backgroundColor: headerBg,
        boxShadow: headerShadow,
      }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Vida Líquida - Inicio">
            <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, #5B00B5, #7B20D5)" }}>
              <span className="text-white font-bold text-sm">VL</span>
            </div>
            <span className="hidden sm:block font-body font-extrabold text-lg text-white drop-shadow">
              Vida Líquida
            </span>
          </Link>

          {/* Category nav */}
          <nav
            aria-label="Categorías de productos"
            className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 px-4"
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="whitespace-nowrap px-3 py-2 text-sm rounded-[var(--radius)] hover:bg-white/20 transition-colors text-white/90 hover:text-white min-h-[44px] flex items-center font-medium"
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
              className="text-white hover:bg-white/20 hover:text-white"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" asChild aria-label="Mi cuenta" className="text-white hover:bg-white/20 hover:text-white">
              <Link href="/cuenta">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              aria-label={`Carrito de compras, ${itemCount} artículos`}
              className="relative text-white hover:bg-white/20 hover:text-white"
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.div
                    key="cart-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge
                      className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] min-h-0 min-w-0 bg-[#5B00B5] text-white border-0"
                      aria-hidden
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
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
                className="whitespace-nowrap px-3 py-1.5 text-xs rounded-full border border-white/40 text-white hover:bg-white/20 transition-colors font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5B00B5] to-transparent opacity-60" aria-hidden="true" />
    </motion.header>
  );
}
