"use client";
import dynamic from "next/dynamic";
import { ShieldCheck, GraduationCap, Leaf, Tv2 } from "lucide-react";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";

const LiveActivity = dynamic(
  () => import("@/components/shared/LiveActivity").then((m) => m.LiveActivity),
  { ssr: false }
);

// ─── Trust-badge items rendered with AnimatedShinyText ────────────────────────
const TRUST_ITEMS = [
  { Icon: ShieldCheck, label: "Certificado COFEPRIS" },
  { Icon: GraduationCap, label: "Aval BUAP" },
  { Icon: Leaf, label: "100% Biodegradable" },
  { Icon: Tv2, label: "Shark Tank MX T8E16" },
];

export function PDPTrustBadges() {
  return (
    <ul className="flex flex-wrap gap-3">
      {TRUST_ITEMS.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-1.5 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)] px-3 py-1"
        >
          <item.Icon className="h-3.5 w-3.5 text-[hsl(var(--primary))] shrink-0" aria-hidden="true" />
          <AnimatedShinyText shimmerWidth={120} className="text-sm font-medium mx-0 max-w-none text-[hsl(var(--foreground)/0.8)]">
            {item.label}
          </AnimatedShinyText>
        </li>
      ))}
    </ul>
  );
}

// ─── BlurFade wrappers ─────────────────────────────────────────────────────────
interface BlurFadeSectionProps {
  children: React.ReactNode;
  delay?: number;
  inView?: boolean;
  className?: string;
}

export function BlurFadeSection({ children, delay = 0, className }: BlurFadeSectionProps) {
  return (
    <BlurFade delay={delay} inView className={className}>
      {children}
    </BlurFade>
  );
}

// ─── LiveActivity float ────────────────────────────────────────────────────────
export function PDPLiveActivity() {
  return <LiveActivity />;
}
