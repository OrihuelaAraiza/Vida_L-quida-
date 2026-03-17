/**
 * Stripe client-side loader (singleton)
 *
 * TO CONNECT: Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local
 * Get keys at: https://dashboard.stripe.com/apikeys
 */
import { loadStripe } from "@stripe/stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.warn(
    "[Stripe] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set. Card payments will not work."
  );
}

// Singleton — called once, reused everywhere
export const stripePromise = publishableKey ? loadStripe(publishableKey) : null;
