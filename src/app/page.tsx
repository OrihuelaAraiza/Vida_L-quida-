import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { getFeaturedProducts } from "@/lib/sanity/queries";
import { Star, ChevronRight } from "lucide-react";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Vida Líquida — Limpieza Orgánica desde Puebla",
  description: "Productos de limpieza biodegradables certificados COFEPRIS. Sin vapores tóxicos. Envío a todo México.",
};

const CATEGORIES = [
  { name: "Hogar", emoji: "🏠", href: "/productos?categoria=hogar", color: "bg-green-50" },
  { name: "Industrial", emoji: "🏭", href: "/productos?categoria=industrial", color: "bg-blue-50" },
  { name: "Automotriz", emoji: "🚗", href: "/productos?categoria=automotriz", color: "bg-orange-50" },
  { name: "Cosmética", emoji: "✨", href: "/productos?categoria=cosmetica", color: "bg-pink-50" },
];

const TESTIMONIALS = [
  { author: "María González", location: "Puebla", rating: 5, text: "Increíbles productos, mi casa huele diferente y sé que no hay químicos peligrosos para mis hijos." },
  { author: "Carlos Ramírez", location: "Ciudad de México", rating: 5, text: "Uso el desengrasante industrial en mi taller y es el mejor que he probado. 100% recomendado." },
  { author: "Ana Mejía", location: "Guadalajara", rating: 5, text: "Excelente servicio y envío rápido. Los productos funcionan perfecto y son amigables con el ambiente." },
];

// JSON-LD schemas
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Vida Líquida",
  url: "https://vidaliquida.mx",
  description: "Productos de limpieza orgánicos biodegradables certificados COFEPRIS",
  address: { "@type": "PostalAddress", addressLocality: "Puebla", addressCountry: "MX" },
  telephone: "+522221234567",
  email: "hola@vidaliquida.mx",
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts().catch(() => []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(153,45%,15%)] via-[hsl(153,45%,25%)] to-[hsl(153,45%,30%)] text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/hero-pattern.svg')" }} aria-hidden />
        <Container className="relative py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-medium mb-6 text-white">
              🌿 Certificado COFEPRIS · Aval BUAP
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Limpieza orgánica para un hogar más sano
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Productos biodegradables, sin vapores tóxicos, formulados con ingredientes naturales en Puebla. Seguros para tu familia y el planeta.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-white text-[hsl(var(--primary))] hover:bg-white/90 font-semibold">
                <Link href="/productos">Ver catálogo →</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                <Link href="/nosotros">Conoce más</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-12" aria-labelledby="categories-heading">
        <Container>
          <h2 id="categories-heading" className="text-2xl font-bold mb-6 text-center">Nuestras categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`${cat.color} rounded-2xl p-6 text-center hover:shadow-md transition-shadow group min-h-[44px] flex flex-col items-center gap-2`}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="font-semibold text-sm group-hover:text-[hsl(var(--primary))] transition-colors">
                  {cat.name}
                </span>
                <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured products */}
      <section className="py-12 bg-white" aria-labelledby="featured-heading">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 id="featured-heading" className="text-2xl font-bold">Productos destacados</h2>
            <Link href="/productos" className="text-sm text-[hsl(var(--primary))] hover:underline font-medium flex items-center gap-1">
              Ver todos <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </Container>
      </section>

      {/* Trust badges */}
      <TrustBadges />

      {/* Value props */}
      <section className="py-16" aria-labelledby="values-heading">
        <Container>
          <h2 id="values-heading" className="text-2xl font-bold text-center mb-12">¿Por qué elegir Vida Líquida?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { emoji: "🌿", title: "Ingredientes naturales", desc: "Formulados con extractos vegetales y sin compuestos petroquímicos." },
              { emoji: "🫁", title: "Sin vapores tóxicos", desc: "Seguros de usar en espacios cerrados sin necesidad de ventilación especial." },
              { emoji: "♻️", title: "Biodegradables al 100%", desc: "Se degradan completamente sin contaminar agua ni suelo." },
              { emoji: "🔬", title: "Respaldo científico", desc: "Formulados y certificados en colaboración con la BUAP." },
              { emoji: "🛡️", title: "COFEPRIS", desc: "Registro sanitario vigente, cumplimos todas las normas mexicanas." },
              { emoji: "📦", title: "Envío a todo México", desc: "Llegamos a más de 15 estados con servicio estándar y express." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[hsl(var(--primary))] text-white" aria-labelledby="testimonials-heading">
        <Container>
          <h2 id="testimonials-heading" className="text-2xl font-bold text-center mb-10">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.author} className="bg-white/10 rounded-2xl p-6 space-y-3">
                <div className="flex gap-0.5" aria-label={`${t.rating} estrellas`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-white/90">&ldquo;{t.text}&rdquo;</p>
                <footer className="text-xs text-white/60 font-medium">
                  — {t.author}, {t.location}
                </footer>
              </blockquote>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <Container narrow>
          <div className="rounded-3xl bg-[hsl(var(--accent))] p-10 text-center">
            <h2 className="text-3xl font-bold text-[hsl(var(--accent-foreground))] mb-4">
              ¿Tienes un negocio o empresa?
            </h2>
            <p className="text-[hsl(var(--accent-foreground)/70%)] mb-8 max-w-md mx-auto">
              Ofrecemos presentaciones industriales de 5L y 20L con precios especiales para volumen.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/productos?categoria=industrial">Ver productos industriales</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
