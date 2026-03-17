"use client";
import {
  ShieldCheck,
  GraduationCap,
  Leaf,
  Tv2,
  Truck,
  CreditCard,
  Users,
  Recycle,
} from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";

const MARQUEE_ITEMS = [
  { icon: <ShieldCheck className="h-4 w-4 shrink-0" />, label: "Certificado COFEPRIS" },
  { icon: <GraduationCap className="h-4 w-4 shrink-0" />, label: "Aval BUAP" },
  { icon: <Leaf className="h-4 w-4 shrink-0" />, label: "100% Biodegradable" },
  { icon: <Tv2 className="h-4 w-4 shrink-0" />, label: "Shark Tank MX T8E16" },
  { icon: <Truck className="h-4 w-4 shrink-0" />, label: "Envío a 15+ estados" },
  { icon: <CreditCard className="h-4 w-4 shrink-0" />, label: "Pagos 100% Seguros MX" },
  { icon: <Users className="h-4 w-4 shrink-0" />, label: "500+ distribuidores" },
  { icon: <Recycle className="h-4 w-4 shrink-0" />, label: "Eco-friendly" },
];

export function TrustBadges() {
  return (
    <section
      className="py-8 bg-[hsl(var(--background))] border-y border-border overflow-hidden"
      role="region"
      aria-label="Certificaciones y garantías de Vida Líquida"
    >
      <Marquee pauseOnHover className="[--duration:30s]">
        {MARQUEE_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-foreground/70"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
