"use client";
import { ShieldCheck, GraduationCap, Leaf, Tv2, Truck, CreditCard, Users, Recycle } from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";

const MARQUEE_ITEMS = [
  { Icon: ShieldCheck, label: "Certificado COFEPRIS", color: "#00C2F0" },
  { Icon: GraduationCap, label: "Aval BUAP", color: "#39D353" },
  { Icon: Leaf, label: "100% Biodegradable", color: "#39D353" },
  { Icon: Tv2, label: "Shark Tank MX T8E16", color: "#FFD600" },
  { Icon: Truck, label: "Envío a 15+ estados", color: "#00C2F0" },
  { Icon: CreditCard, label: "Pagos 100% Seguros MX", color: "#00C2F0" },
  { Icon: Users, label: "500+ distribuidores", color: "#39D353" },
  { Icon: Recycle, label: "Eco-friendly", color: "#39D353" },
];

export function TrustBadges() {
  return (
    <section
      className="relative overflow-hidden py-3"
      style={{ background: "linear-gradient(90deg, #003A8C, #1AA334)" }}
      role="region"
      aria-label="Certificaciones y garantías de Vida Líquida"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
           style={{ background: "linear-gradient(90deg, #003A8C, transparent)" }} aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
           style={{ background: "linear-gradient(270deg, #1AA334, transparent)" }} aria-hidden="true" />

      <Marquee pauseOnHover className="[--duration:30s]">
        {MARQUEE_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 px-5 py-1.5 text-xs font-bold tracking-widest text-white/90 uppercase whitespace-nowrap"
          >
            <item.Icon className="h-3.5 w-3.5 shrink-0" style={{ color: item.color }} aria-hidden="true" />
            <span>{item.label}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
