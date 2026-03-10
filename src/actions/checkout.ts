"use server";

import type { CartItem, Address } from "@/types";

interface CheckoutInput {
  items: CartItem[];
  customer: { name: string; email: string; phone: string };
  address: Address;
  paymentMethod: "card" | "oxxo" | "spei" | "msi";
  tokenId?: string;
}

export async function createOrder(input: CheckoutInput) {
  const { items, customer, address, paymentMethod, tokenId } = input;

  const orderItems = items.map((item) => ({
    productId: item.product._id,
    name: item.product.name,
    presentation: item.selectedPresentation,
    price: item.product.presentations?.find((p) => p.size === item.selectedPresentation)?.price ?? 0,
    quantity: item.quantity,
  }));

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal * 1.16 + 149;

  // In production: call Conekta API, save to DB
  const orderId = `VL${Date.now()}`;

  return { orderId, orderNumber: orderId.slice(-8).toUpperCase() };
}
