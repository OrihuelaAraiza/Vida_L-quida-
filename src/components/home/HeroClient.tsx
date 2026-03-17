"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { Leaf, ShieldCheck } from "lucide-react";
import { WordPullUp } from "@/components/magicui/word-pull-up";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

// Dynamic imports for components that require DOM APIs (no SSR)
const AnimatedGridPattern = dynamic(
  () =>
    import("@/components/magicui/animated-grid-pattern").then(
      (m) => m.AnimatedGridPattern
    ),
  { ssr: false }
);

const Ripple = dynamic(
  () =>
    import("@/components/magicui/ripple").then((m) => m.Ripple),
  { ssr: false }
);

const STATS = [
  { value: 15, suffix: "+ estados", label: "Cobertura nacional" },
  { value: 7, suffix: " productos", label: "Líneas especializadas" },
  { value: 500, suffix: "+ familias", label: "Nos eligen cada mes" },
];

export function HeroClient() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(153,45%,15%)] via-[hsl(153,45%,25%)] to-[hsl(153,45%,30%)] text-white">
      {/* Animated grid background — replaced by static gradient when reduced motion is preferred */}
      {shouldReduceMotion ? (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "repeating-linear-gradient(0deg,hsl(var(--primary)/0.3) 0 1px,transparent 1px 40px),repeating-linear-gradient(90deg,hsl(var(--primary)/0.3) 0 1px,transparent 1px 40px)",
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ willChange: "transform", contain: "layout paint" }}
          aria-hidden="true"
        >
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.15}
            duration={3}
            repeatDelay={1}
            className="[mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_80%)] text-[hsl(var(--primary))]"
          />
        </div>
      )}

      {/* Ripple centered behind the hero content */}
      {!shouldReduceMotion && (
        <div
          className="absolute inset-0 flex items-center justify-end pointer-events-none"
          aria-hidden="true"
        >
          <div className="relative w-[500px] h-full opacity-20">
            <Ripple
              mainCircleSize={150}
              mainCircleOpacity={0.3}
              numCircles={6}
            />
          </div>
        </div>
      )}

      <Container className="relative py-20 md:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-medium mb-6 text-white">
            <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
            Certificado COFEPRIS
            <span className="opacity-50">·</span>
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Aval BUAP
          </span>

          {/* Headline — animated with WordPullUp, static h1 when reduced motion */}
          {shouldReduceMotion ? (
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Limpieza orgánica para un hogar más sano
            </h1>
          ) : (
            <WordPullUp
              words="Limpieza orgánica para un hogar más sano"
              className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-left text-white drop-shadow-none tracking-normal"
            />
          )}

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            Productos biodegradables, sin vapores tóxicos, formulados con
            ingredientes naturales en Puebla. Seguros para tu familia y el
            planeta.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mb-8" aria-label="Datos de Vida Líquida">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white leading-none">
                  <NumberTicker
                    value={stat.value}
                    className="text-white"
                  />
                  <span className="text-white">{stat.suffix}</span>
                </p>
                <p className="text-xs text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <ShimmerButton
              background="hsl(var(--primary))"
              shimmerColor="#ffffff"
              borderRadius="0.75rem"
              className="text-white font-semibold text-base px-7 py-3"
              onClick={() => {
                window.location.href = "/productos";
              }}
            >
              Ver catálogo →
            </ShimmerButton>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/nosotros" className="flex items-center justify-center">Conoce más</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
