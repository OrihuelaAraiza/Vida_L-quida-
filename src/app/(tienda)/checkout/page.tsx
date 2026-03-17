"use client";

import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Container } from "@/components/layout/Container";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { AddressForm } from "@/components/checkout/AddressForm";
import { PaymentSelector, type PaymentMethod } from "@/components/checkout/PaymentSelector";
import { StripeCardForm } from "@/components/checkout/StripeCardForm";
import { CartSummary } from "@/components/cart/CartSummary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { useRouter } from "next/navigation";
import type { Address } from "@/types";
import { formatMXN, getShippingCost } from "@/lib/utils";
import { stripePromise } from "@/lib/stripe-client";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const subtotal = getTotalPrice();
  const shippingCost = address ? getShippingCost(address.cp) : { standard: 149, express: 249 };
  const shipping = shippingCost[shippingMethod];
  const total = subtotal * 1.16 + shipping;

  async function handleCustomerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setCustomer({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
    });
    setStep(2);
  }

  async function handleAddressSubmit(data: Address) {
    setAddress(data);
    setStep(3);
  }

  /** Called for OXXO / SPEI — Conekta flow unchanged */
  async function handleConektaPayment(method: PaymentMethod) {
    if (!customer || !address || method === "stripe") return;
    setLoading(true);
    setPaymentError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product._id,
            name: i.product.name,
            presentation: i.selectedPresentation,
            price:
              i.product.presentations?.find((p) => p.size === i.selectedPresentation)?.price ?? 0,
            quantity: i.quantity,
          })),
          total,
          customer,
          address,
          paymentMethod: method,
          shipping,
        }),
      });
      const data = await response.json();
      if (data.orderId) {
        clearCart();
        router.push(`/checkout/confirmacion/${data.orderId}`);
      } else {
        setPaymentError(data.error ?? "No se pudo crear el pedido");
      }
    } catch {
      setPaymentError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Called by StripeCardForm on successful PaymentIntent confirmation.
   * Creates the order record in our system and redirects to confirmation.
   */
  async function handleStripeSuccess(paymentIntentId: string) {
    if (!customer || !address) return;
    setLoading(true);
    setPaymentError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product._id,
            name: i.product.name,
            presentation: i.selectedPresentation,
            price:
              i.product.presentations?.find((p) => p.size === i.selectedPresentation)?.price ?? 0,
            quantity: i.quantity,
          })),
          total,
          customer,
          address,
          paymentMethod: "stripe",
          shipping,
          stripePaymentIntentId: paymentIntentId,
        }),
      });
      const data = await response.json();
      if (data.orderId) {
        clearCart();
        router.push(`/checkout/confirmacion/${data.orderId}`);
      } else {
        setPaymentError(data.error ?? "No se pudo registrar el pedido");
      }
    } catch {
      setPaymentError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container narrow className="py-8">
      <CheckoutStepper currentStep={step} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div>
          {/* Step 1: Customer info */}
          {step === 1 && (
            <section aria-labelledby="step1-heading">
              <h2 id="step1-heading" className="text-xl font-bold mb-6">Tu información</h2>
              <form onSubmit={handleCustomerSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-name">Nombre completo</Label>
                  <Input id="checkout-name" name="name" autoComplete="name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-email">Correo electrónico</Label>
                  <Input id="checkout-email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-phone">Teléfono</Label>
                  <Input id="checkout-phone" name="phone" type="tel" autoComplete="tel" required />
                </div>
                <Button type="submit" className="w-full">Continuar →</Button>
              </form>
            </section>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <section aria-labelledby="step2-heading">
              <h2 id="step2-heading" className="text-xl font-bold mb-6">Dirección de envío</h2>
              <AddressForm
                onSubmit={handleAddressSubmit}
                defaultValues={{ name: customer?.name, phone: customer?.phone }}
              />
              <Button variant="ghost" onClick={() => setStep(1)} className="mt-4">← Regresar</Button>
            </section>
          )}

          {/* Step 3: Payment — Stripe Elements wraps the whole step */}
          {step === 3 && (
            <section aria-labelledby="step3-heading">
              <h2 id="step3-heading" className="text-xl font-bold mb-4">Método de pago</h2>

              {/* Shipping options */}
              <div className="mb-6 space-y-2">
                <p className="text-sm font-medium mb-2">Opciones de envío</p>
                {address && (
                  <>
                    <button
                      onClick={() => setShippingMethod("standard")}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors min-h-[44px] ${shippingMethod === "standard" ? "border-[hsl(var(--primary))]" : "border-[hsl(var(--border))]"}`}
                    >
                      <div className="text-left">
                        <p className="font-medium text-sm">Envío estándar</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">5–7 días hábiles</p>
                      </div>
                      <span className="font-semibold text-sm">
                        {shippingCost.standard === 0 ? "Gratis" : formatMXN(shippingCost.standard)}
                      </span>
                    </button>
                    <button
                      onClick={() => setShippingMethod("express")}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors min-h-[44px] ${shippingMethod === "express" ? "border-[hsl(var(--primary))]" : "border-[hsl(var(--border))]"}`}
                    >
                      <div className="text-left">
                        <p className="font-medium text-sm">Envío express</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">1–3 días hábiles</p>
                      </div>
                      <span className="font-semibold text-sm">{formatMXN(shippingCost.express)}</span>
                    </button>
                  </>
                )}
              </div>

              {/* Wrap in Elements for Stripe card payments */}
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: Math.round(total * 100),
                  currency: "mxn",
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "hsl(153 45% 30%)",
                      colorBackground: "hsl(40 25% 95%)",
                      borderRadius: "0.75rem",
                      fontFamily: "'Alegreya Sans', system-ui, sans-serif",
                    },
                  },
                }}
              >
                <PaymentSelector
                  total={total}
                  onSubmit={handleConektaPayment}
                  loading={loading}
                  renderStripeForm={() => (
                    <StripeCardForm
                      amount={total}
                      customerName={customer?.name ?? ""}
                      customerEmail={customer?.email ?? ""}
                      onSuccess={handleStripeSuccess}
                      onError={(msg) => setPaymentError(msg)}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  )}
                />
              </Elements>

              {paymentError && (
                <p role="alert" className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                  {paymentError}
                </p>
              )}

              <Button variant="ghost" onClick={() => setStep(2)} className="mt-4">← Regresar</Button>
            </section>
          )}
        </div>

        {/* Order summary */}
        <aside aria-label="Resumen del pedido" className="bg-white rounded-2xl p-6 h-fit space-y-4">
          <h3 className="font-semibold">Tu pedido</h3>
          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={`${item.product._id}-${item.selectedPresentation}`} className="flex justify-between">
                <span>{item.product.name} ({item.selectedPresentation}) ×{item.quantity}</span>
                <span>
                  {formatMXN(
                    (item.product.presentations?.find((p) => p.size === item.selectedPresentation)?.price ?? 0) *
                      item.quantity *
                      1.16
                  )}
                </span>
              </li>
            ))}
          </ul>
          <CartSummary subtotal={subtotal} shipping={step >= 3 ? shipping : undefined} />
        </aside>
      </div>
    </Container>
  );
}
