"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, presentation: string) => void;
  removeItem: (productId: string, presentation: string) => void;
  updateQuantity: (productId: string, presentation: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, presentation) => {
        const { items } = get();
        const existing = items.find(
          (i) => i.product._id === product._id && i.selectedPresentation === presentation
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.product._id === product._id && i.selectedPresentation === presentation
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { product, quantity: 1, selectedPresentation: presentation }] });
        }
        set({ isOpen: true });
      },

      removeItem: (productId, presentation) => {
        set({
          items: get().items.filter(
            (i) => !(i.product._id === productId && i.selectedPresentation === presentation)
          ),
        });
      },

      updateQuantity: (productId, presentation, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, presentation);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product._id === productId && i.selectedPresentation === presentation
              ? { ...i, quantity: qty }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const pres = item.product.presentations.find(
            (p) => p.size === item.selectedPresentation
          );
          return total + (pres?.price ?? 0) * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "vida-liquida-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
