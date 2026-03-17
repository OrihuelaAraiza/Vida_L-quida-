/**
 * Stripe server-side client
 *
 * TO CONNECT: Set STRIPE_SECRET_KEY in .env.local
 * Get keys at: https://dashboard.stripe.com/apikeys
 */
import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder",
  {
    apiVersion: "2026-02-25.clover",
    typescript: true,
  }
);
