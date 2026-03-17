"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ShieldCheck, Leaf } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

const AnimatedGridPattern = dynamic(
  () => import("@/components/magicui/animated-grid-pattern").then((m) => m.AnimatedGridPattern),
  { ssr: false }
);

const BackgroundBeams = dynamic(
  () => import("@/components/aceternity/background-beams").then((m) => m.BackgroundBeams),
  { ssr: false }
);

const STATS = [
  { value: 15, suffix: "+ estados", label: "Cobertura nacional" },
  { value: 7, suffix: " productos", label: "Líneas certificadas" },
  { value: 500, suffix: "+ familias", label: "Nos eligen cada mes" },
];

export function HeroClient() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#050E1A] text-white min-h-[85vh] flex items-center">
      {/* Background layers */}
      {!shouldReduceMotion && (
        <>
          {/* Animated grid — very subtle */}
          <div
            className="absolute inset-0 opacity-20"
            style={{ willChange: "transform", contain: "layout paint" }}
            aria-hidden="true"
          >
            <AnimatedGridPattern
              numSquares={40}
              maxOpacity={0.3}
              duration={4}
              repeatDelay={0.5}
              className="text-[#00C2F0] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,white_20%,transparent_90%)]"
            />
          </div>
          {/* Background beams */}
          <BackgroundBeams className="opacity-25" />
        </>
      )}

      {/* Scan line */}
      {!shouldReduceMotion && (
        <div
          className="absolute left-0 right-0 h-[1px] z-10 pointer-events-none vl-scan-line"
          aria-hidden="true"
        />
      )}

      {/* Blue glow accent — top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,194,240,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Green glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(57,211,83,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-20 py-24 md:py-36">
        <div className="max-w-3xl">

          {/* Certification badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,194,240,0.3)] bg-[rgba(0,194,240,0.08)] text-xs font-bold tracking-widest text-[#00C2F0] uppercase mb-8">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Certificado COFEPRIS
            <span className="opacity-40">·</span>
            <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
            Aval BUAP
          </div>

          {/* Headline — multi-line display type */}
          <div className="mb-8 space-y-1">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest leading-none text-white">
              LIMPIEZA
            </h1>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest leading-none vl-gradient-text-blue">
              ORGÁNICA
            </h1>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest leading-none vl-gradient-text-green">
              CERTIFICADA
            </h1>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-white/60 mb-10 max-w-xl leading-relaxed font-body">
            Biodegradables, sin vapores tóxicos, formulados con ingredientes naturales en Puebla.
            Seguros para tu familia y el planeta.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-10" aria-label="Datos de Vida Líquida">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl tracking-wider text-[#00C2F0] leading-none">
                  <NumberTicker value={stat.value} className="text-[#00C2F0]" />
                  <span>{stat.suffix}</span>
                </p>
                <p className="text-xs text-white/40 mt-1 font-body uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <ShimmerButton
              background="#0088CC"
              shimmerColor="#FFD600"
              borderRadius="0.5rem"
              shimmerDuration="2.5s"
              className="font-display text-lg tracking-widest text-white px-8 py-3"
              onClick={() => { window.location.href = "/productos"; }}
            >
              VER CATÁLOGO
            </ShimmerButton>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/20 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/40 font-body"
            >
              <Link href="/nosotros">Conoce más</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
