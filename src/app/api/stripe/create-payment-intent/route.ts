import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe no está configurado. Contacta al administrador." },
      { status: 503 }
    );
  }

  try {
    const { amount, currency = "mxn", metadata } = await req.json();

    if (!amount || typeof amount !== "number" || amount < 10) {
      return NextResponse.json(
        { error: "Monto inválido" },
        { status: 400 }
      );
    }

    // Create PaymentIntent — amount in centavos (Stripe uses smallest currency unit)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        source: "vida-liquida-ecommerce",
        ...metadata,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error al crear intento de pago";
    console.error("[Stripe] create-payment-intent error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
