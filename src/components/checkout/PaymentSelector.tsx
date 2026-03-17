"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { CreditCard, Store, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentMethod = "stripe" | "oxxo" | "spei";

interface PaymentSelectorProps {
  total: number;
  /** Called for OXXO / SPEI. For Stripe card, StripeCardForm handles its own submit. */
  onSubmit: (method: PaymentMethod) => void;
  loading?: boolean;
  /** Render prop — called when method === "stripe" so the checkout page can inject <StripeCardForm> */
  renderStripeForm?: () => React.ReactNode;
}

const PAYMENT_OPTIONS = [
  { value: "stripe" as const, label: "Tarjeta crédito / débito", icon: CreditCard },
  { value: "oxxo" as const, label: "OXXO Pay", icon: Store },
  { value: "spei" as const, label: "Transferencia SPEI", icon: Building2 },
];

export function PaymentSelector({
  onSubmit,
  loading,
  renderStripeForm,
}: PaymentSelectorProps) {
  const [method, setMethod] = useState<PaymentMethod>("stripe");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (method !== "stripe") {
      onSubmit(method);
    }
    // Stripe submit is handled by StripeCardForm internally
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup
        value={method}
        onValueChange={(v) => setMethod(v as PaymentMethod)}
        aria-label="Método de pago"
      >
        {PAYMENT_OPTIONS.map(({ value, label, icon: Icon }) => (
          <label
            key={value}
            htmlFor={`payment-${value}`}
            className={cn(
              "flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-colors",
              method === value
                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/5%)]"
                : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/50%)]"
            )}
          >
            <RadioGroupItem value={value} id={`payment-${value}`} />
            <Icon className="h-4 w-4 text-[hsl(var(--primary))]" aria-hidden="true" />
            <span className="font-medium text-sm">{label}</span>
          </label>
        ))}
      </RadioGroup>

      {/* Stripe card form — injected by parent so it has access to Elements context */}
      {method === "stripe" && renderStripeForm && renderStripeForm()}

      {method === "oxxo" && (
        <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 space-y-1">
          <p className="font-medium">Pago en efectivo en OXXO</p>
          <p>Recibirás una referencia de pago válida por 48 horas. Puedes pagar en cualquier tienda OXXO del país.</p>
        </div>
      )}

      {method === "spei" && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-800 space-y-1">
          <p className="font-medium">Transferencia SPEI</p>
          <p>Recibirás una CLABE interbancaria. El pago se verifica en 72 horas hábiles.</p>
        </div>
      )}

      {/* Submit button only for non-Stripe methods (Stripe has its own button inside StripeCardForm) */}
      {method !== "stripe" && (
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Procesando..." : "Confirmar pago →"}
        </Button>
      )}
    </form>
  );
}
