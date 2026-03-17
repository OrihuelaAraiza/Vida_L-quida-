"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface StripeCardFormProps {
  /** Total amount in MXN (not centavos) */
  amount: number;
  customerName: string;
  customerEmail: string;
  /** Called on successful payment with the PaymentIntent ID */
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
}

export function StripeCardForm({
  amount,
  customerName,
  customerEmail,
  onSuccess,
  onError,
  loading,
  setLoading,
}: StripeCardFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) {
      onError("Stripe no está listo. Intenta de nuevo.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Create PaymentIntent on the server
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "mxn",
          metadata: { customerName, customerEmail },
        }),
      });

      const { clientSecret, error: serverError } = await res.json();

      if (serverError || !clientSecret) {
        throw new Error(serverError ?? "No se pudo iniciar el pago");
      }

      // 2. Confirm payment with Stripe Elements (handles 3DS automatically)
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/confirmacion/pending`,
          payment_method_data: {
            billing_details: {
              name: customerName,
              email: customerEmail,
            },
          },
        },
        redirect: "if_required",
      });

      if (error) {
        // Card declined, insufficient funds, etc.
        const msg =
          error.message ?? "Error al procesar el pago. Verifica tus datos.";
        setErrorMessage(msg);
        onError(msg);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        onSuccess(paymentIntent.id);
      } else if (paymentIntent?.status === "requires_action") {
        // 3DS redirect handled by Stripe — this path shouldn't hit since redirect:"if_required"
        setErrorMessage("Tu banco requiere verificación adicional. Revisa tu correo o app bancaria.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      setErrorMessage(msg);
      onError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Stripe's PaymentElement renders card, Apple Pay, Google Pay, etc. */}
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/20%)] p-4">
        <PaymentElement
          options={{
            layout: "tabs",
            defaultValues: {
              billingDetails: {
                name: customerName,
                email: customerEmail,
              },
            },
          }}
        />
      </div>

      {errorMessage && (
        <p role="alert" className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full gap-2"
        disabled={!stripe || !elements || loading}
      >
        <Lock className="h-4 w-4" aria-hidden="true" />
        {loading ? "Procesando..." : `Pagar $${amount.toFixed(2)} MXN`}
      </Button>

      <p className="text-center text-xs text-[hsl(var(--muted-foreground))] flex items-center justify-center gap-1">
        <Lock className="h-3 w-3" aria-hidden="true" />
        Pago 100% seguro con cifrado SSL · Powered by Stripe
      </p>
    </form>
  );
}
