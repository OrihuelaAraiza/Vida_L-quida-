import { NextResponse } from "next/server";
import { createConektaOrder } from "@/lib/conekta";
import { stripe } from "@/lib/stripe";
import type { OrderItem, Address } from "@/types";

type IncomingPaymentMethod = "stripe" | "oxxo" | "spei" | "msi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      items,
      total,
      customer,
      address,
      paymentMethod,
      shipping,
      // Stripe
      stripePaymentIntentId,
      // Conekta (legacy)
      tokenId,
      msiMonths,
    } = body as {
      items: OrderItem[];
      total: number;
      shipping: number;
      customer: { name: string; email: string; phone: string };
      address: Address;
      paymentMethod: IncomingPaymentMethod;
      stripePaymentIntentId?: string;
      tokenId?: string;
      msiMonths?: number;
    };

    // ── Stripe card payment ───────────────────────────────────────────────────
    if (paymentMethod === "stripe") {
      if (!stripePaymentIntentId) {
        return NextResponse.json(
          { error: "stripePaymentIntentId is required for Stripe payments" },
          { status: 400 }
        );
      }

      // Verify the PaymentIntent actually succeeded (never trust the client)
      const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentIntentId);

      if (paymentIntent.status !== "succeeded") {
        return NextResponse.json(
          { error: `Pago no completado. Estado: ${paymentIntent.status}` },
          { status: 400 }
        );
      }

      // TODO: Save order to database (Sanity, Prisma, etc.)
      // For now we return the PaymentIntent ID as the order reference
      const orderId = `stripe_${paymentIntent.id}`;

      return NextResponse.json({
        orderId,
        orderNumber: paymentIntent.id.slice(-8).toUpperCase(),
        paymentMethod: "stripe",
        stripePaymentIntentId: paymentIntent.id,
        status: "paid",
      });
    }

    // ── Conekta — OXXO / SPEI / MSI ──────────────────────────────────────────
    const conektaMethod = paymentMethod === "msi" ? "card" : paymentMethod;

    const conektaOrder = await createConektaOrder({
      items,
      total,
      customer,
      address,
      paymentMethod: conektaMethod as "card" | "oxxo" | "spei",
      tokenId,
      msiMonths: paymentMethod === "msi" ? msiMonths : undefined,
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error al procesar el pago";
    console.error("[Checkout] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
