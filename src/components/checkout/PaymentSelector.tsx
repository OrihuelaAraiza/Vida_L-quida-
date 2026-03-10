"use client";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Store, Building2, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentMethod = "card" | "oxxo" | "spei" | "msi";

interface PaymentSelectorProps {
  total: number;
  onSubmit: (method: PaymentMethod, cardToken?: string) => void;
  loading?: boolean;
}

export function PaymentSelector({ total, onSubmit, loading }: PaymentSelectorProps) {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [msiMonths, setMsiMonths] = useState<3 | 6 | 12>(3);

  const showMSI = total >= 500;

  const paymentOptions = [
    { value: "card", label: "Tarjeta crédito / débito", icon: <CreditCard className="h-4 w-4" /> },
    { value: "oxxo", label: "OXXO Pay", icon: <Store className="h-4 w-4" /> },
    { value: "spei", label: "Transferencia SPEI", icon: <Building2 className="h-4 w-4" /> },
    ...(showMSI ? [{ value: "msi", label: "Meses sin intereses", icon: <Percent className="h-4 w-4" /> }] : []),
  ] as const;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, tokenize card via Conekta.js before submitting
    onSubmit(method);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup
        value={method}
        onValueChange={(v) => setMethod(v as PaymentMethod)}
        aria-label="Método de pago"
      >
        {paymentOptions.map((opt) => (
          <label
            key={opt.value}
            htmlFor={`payment-${opt.value}`}
            className={cn(
              "flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-colors",
              method === opt.value
                ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/5%)]"
                : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/50%)]"
            )}
          >
            <RadioGroupItem value={opt.value} id={`payment-${opt.value}`} />
            <span className="text-[hsl(var(--primary))]">{opt.icon}</span>
            <span className="font-medium text-sm">{opt.label}</span>
          </label>
        ))}
      </RadioGroup>

      {/* Card fields */}
      {(method === "card" || method === "msi") && (
        <div className="space-y-4 p-4 rounded-xl bg-[hsl(var(--muted)/30%)] border border-[hsl(var(--border))]">
          {method === "msi" && (
            <div className="space-y-2">
              <Label>Número de meses</Label>
              <div className="flex gap-2">
                {([3, 6, 12] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMsiMonths(m)}
                    className={cn(
                      "flex-1 py-2 rounded-lg border-2 text-sm font-medium transition-colors",
                      msiMonths === m
                        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white"
                        : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/50%)]"
                    )}
                  >
                    {m} meses
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="card-number">Número de tarjeta</Label>
            <Input
              id="card-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
              placeholder="1234 5678 9012 3456"
              autoComplete="cc-number"
              inputMode="numeric"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="card-name">Nombre en la tarjeta</Label>
            <Input
              id="card-name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Como aparece en la tarjeta"
              autoComplete="cc-name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="card-expiry">Vencimiento</Label>
              <Input
                id="card-expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/AA"
                maxLength={5}
                autoComplete="cc-exp"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="card-cvv">CVV</Label>
              <Input
                id="card-cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="123"
                maxLength={4}
                autoComplete="cc-csc"
                type="password"
              />
            </div>
          </div>
        </div>
      )}

      {method === "oxxo" && (
        <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
          <p className="font-medium mb-1">Pago en efectivo en OXXO</p>
          <p>Recibirás una referencia de pago válida por 48 horas. Puedes pagar en cualquier tienda OXXO del país.</p>
        </div>
      )}

      {method === "spei" && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-800">
          <p className="font-medium mb-1">Transferencia SPEI</p>
          <p>Recibirás una CLABE interbancaria. El pago se verifica en 72 horas hábiles.</p>
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "Procesando..." : "Confirmar pago →"}
      </Button>
    </form>
  );
}
