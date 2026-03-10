"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Search, User, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Categorías", href: "/productos", icon: Grid3X3 },
  { label: "Buscar", href: null, icon: Search, action: "search" as const },
  { label: "Cuenta", href: "/cuenta", icon: User },
  { label: "Carrito", href: null, icon: ShoppingCart, action: "cart" as const },
];

export function MobileNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const { openSearch } = useUIStore();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-[hsl(var(--border))] safe-area-inset-bottom"
    >
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.href ? pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href)) : false;

          const content = (
            <span className={cn(
              "flex flex-col items-center justify-center gap-0.5 text-xs transition-colors relative",
              isActive ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"
            )}>
              <span className="relative">
                <Icon className="h-5 w-5" />
                {tab.action === "cart" && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-[hsl(var(--primary))] text-white text-[9px] flex items-center justify-center font-bold">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </span>
              {tab.label}
            </span>
          );

          if (tab.action === "cart") {
            return (
              <button
                key={tab.label}
                onClick={openCart}
                aria-label={`Carrito, ${itemCount} artículos`}
                className="flex items-center justify-center min-h-[44px]"
              >
                {content}
              </button>
            );
          }
          if (tab.action === "search") {
            return (
              <button
                key={tab.label}
                onClick={openSearch}
                aria-label="Buscar"
                className="flex items-center justify-center min-h-[44px]"
              >
                {content}
              </button>
            );
          }
          return (
            <Link
              key={tab.label}
              href={tab.href!}
              aria-current={isActive ? "page" : undefined}
              className="flex items-center justify-center min-h-[44px]"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
