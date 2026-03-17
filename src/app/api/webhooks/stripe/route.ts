/**
 * Stripe Webhook Handler
 *
 * TO CONNECT:
 * 1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
 * 2. Run: stripe listen --forward-to localhost:3000/api/webhooks/stripe
 * 3. Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET in .env.local
 *
 * In production:
 * - Go to https://dashboard.stripe.com/webhooks
 * - Add endpoint: https://vidaliquida.mx/api/webhooks/stripe
 * - Select events: payment_intent.succeeded, payment_intent.payment_failed
 * - Copy the signing secret to your production env vars
 */
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook verification failed";
    console.error("[Stripe Webhook] Signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("[Stripe Webhook] payment_intent.succeeded:", paymentIntent.id);

        // TODO: Update order status to "paid" in your database
        // Example with Sanity:
        // await sanityClient.patch(orderId).set({ status: "paid" }).commit()
        //
        // The paymentIntentId links to your order:
        // const orderId = paymentIntent.metadata.orderId
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const failureMessage = paymentIntent.last_payment_error?.message ?? "Unknown error";
        console.error("[Stripe Webhook] payment_intent.payment_failed:", paymentIntent.id, failureMessage);

        // TODO: Mark order as failed / notify customer
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        console.log("[Stripe Webhook] charge.refunded:", charge.id);

        // TODO: Update order status to "cancelled" and trigger refund email
        break;
      }

      default:
        // Unhandled event — safe to ignore
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook handler error";
    console.error("[Stripe Webhook] Handler error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

