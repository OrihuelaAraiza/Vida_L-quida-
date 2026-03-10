import { NextResponse } from "next/server";
import { createConektaOrder } from "@/lib/conekta";
import type { OrderItem, Address } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, total, customer, address, paymentMethod, tokenId, msiMonths } = body as {
      items: OrderItem[];
      total: number;
      customer: { name: string; email: string; phone: string };
      address: Address;
      paymentMethod: "card" | "oxxo" | "spei";
      tokenId?: string;
      msiMonths?: number;
    };

    const conektaOrder = await createConektaOrder({
      items,
      total,
      customer,
      address,
      paymentMethod,
      tokenId,
      msiMonths,
    });

    const orderId = conektaOrder.id;
    const charges = conektaOrder.charges?.data?.[0];

    return NextResponse.json({
      orderId,
      orderNumber: orderId.slice(-8).toUpperCase(),
      paymentMethod,
      oxxoReference: charges?.payment_method?.reference ?? null,
      speiClabe: charges?.payment_method?.clabe ?? null,
      status: conektaOrder.payment_status,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message ?? "Error al procesar el pago" },
      { status: 500 }
    );
  }
}
