"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isWishlisted(product._id)) {
          set({ items: [...get().items, product] });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((p) => p._id !== productId) });
      },

      isWishlisted: (productId) => {
        return get().items.some((p) => p._id === productId);
      },

      toggleItem: (product) => {
        if (get().isWishlisted(product._id)) {
          get().removeItem(product._id);
        } else {
          get().addItem(product);
        }
      },
    }),
    { name: "vida-liquida-wishlist" }
  )
);
