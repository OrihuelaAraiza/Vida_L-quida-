import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Información" },
  { id: 2, label: "Envío" },
  { id: 3, label: "Pago" },
  { id: 4, label: "Confirmación" },
];

interface CheckoutStepperProps {
  currentStep: number;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <nav aria-label="Pasos del proceso de compra">
      <ol className="flex items-center gap-0">
        {STEPS.map((step, index) => {
          const done = currentStep > step.id;
          const active = currentStep === step.id;
          return (
            <li key={step.id} className="flex items-center flex-1" aria-current={active ? "step" : undefined}>
              <div className="flex flex-col items-center">
                <div className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                  done && "bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-white",
                  active && "border-[hsl(var(--primary))] text-[hsl(var(--primary))] bg-white",
                  !done && !active && "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] bg-white"
                )}>
                  {done ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <span className={cn(
                  "text-xs mt-1 whitespace-nowrap",
                  (active || done) ? "text-[hsl(var(--foreground))] font-medium" : "text-[hsl(var(--muted-foreground))]"
                )}>
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-2 mb-5 transition-colors",
                  done ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--border))]"
                )} aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
