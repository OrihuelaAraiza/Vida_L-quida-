/**
 * Stripe server-side client
 *
 * TO CONNECT: Set STRIPE_SECRET_KEY in .env.local
 * Get keys at: https://dashboard.stripe.com/apikeys
 */
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set. Add it to .env.local");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-02-25.clover",
  typescript: true,
});
