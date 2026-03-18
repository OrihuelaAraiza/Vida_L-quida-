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

const STATS = [
  { value: 15, suffix: "+ estados", label: "Cobertura nacional" },
  { value: 7, suffix: " productos", label: "Líneas certificadas" },
  { value: 500, suffix: "+ familias", label: "Nos eligen cada mes" },
];

export function HeroClient() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden text-white min-h-[85vh] flex items-center" style={{ background: "linear-gradient(135deg, #4DC8E8 0%, #2AAAC8 60%, #1A8AAA 100%)" }}>
      {/* Background layers */}
      {!shouldReduceMotion && (
        <div
          className="absolute inset-0 opacity-15"
          style={{ willChange: "transform", contain: "layout paint" }}
          aria-hidden="true"
        >
          <AnimatedGridPattern
            numSquares={40}
            maxOpacity={0.3}
            duration={4}
            repeatDelay={0.5}
            className="text-white [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,white_20%,transparent_90%)]"
          />
        </div>
      )}

      {/* Purple glow accent — top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(91,0,181,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Green glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(128,204,40,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-20 py-24 md:py-36">
        <div className="max-w-3xl">

          {/* Certification badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/40 bg-white/20 text-xs font-bold tracking-widest text-white uppercase mb-8 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Certificado COFEPRIS
            <span className="opacity-60">·</span>
            <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
            Aval BUAP
          </div>

          {/* Headline */}
          <div className="mb-8 space-y-1">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest leading-none text-white drop-shadow-lg">
              LIMPIEZA
            </h1>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest leading-none" style={{ color: "#5B00B5", textShadow: "0 2px 20px rgba(91,0,181,0.4)" }}>
              ORGÁNICA
            </h1>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest leading-none" style={{ color: "#80CC28", textShadow: "0 2px 20px rgba(128,204,40,0.4)" }}>
              CERTIFICADA
            </h1>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-white/90 mb-10 max-w-xl leading-relaxed font-body drop-shadow">
            Biodegradables, sin vapores tóxicos, formulados con ingredientes naturales en Puebla.
            Seguros para tu familia y el planeta.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-10" aria-label="Datos de Vida Líquida">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl tracking-wider text-white leading-none drop-shadow">
                  <NumberTicker value={stat.value} className="text-white" />
                  <span>{stat.suffix}</span>
                </p>
                <p className="text-xs text-white/70 mt-1 font-body uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <ShimmerButton
              background="#5B00B5"
              shimmerColor="#80CC28"
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
              className="border-white/50 text-white hover:bg-white/20 hover:text-white hover:border-white/70 font-body backdrop-blur-sm"
            >
              <Link href="/nosotros">Conoce más</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
