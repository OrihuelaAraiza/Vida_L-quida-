import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { HeroClient } from "@/components/home/HeroClient";
import { getFeaturedProducts } from "@/lib/sanity/queries";
import { Star, ChevronRight, Home, Factory, Car, Sparkles, Leaf, Wind, Recycle, FlaskConical, ShieldCheck, Package } from "lucide-react";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Vida Líquida — Limpieza Orgánica desde Puebla",
  description: "Productos de limpieza biodegradables certificados COFEPRIS. Sin vapores tóxicos. Envío a todo México.",
};

const CATEGORIES = [
  { name: "Hogar", Icon: Home, href: "/productos?categoria=hogar", color: "#80CC28", bg: "rgba(128,204,40,0.08)" },
  { name: "Industrial", Icon: Factory, href: "/productos?categoria=industrial", color: "#5B00B5", bg: "rgba(91,0,181,0.08)" },
  { name: "Automotriz", Icon: Car, href: "/productos?categoria=automotriz", color: "#1A1A6E", bg: "rgba(26,26,110,0.08)" },
  { name: "Cosmética", Icon: Sparkles, href: "/productos?categoria=cosmetica", color: "#C28A00", bg: "rgba(255,214,0,0.1)" },
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
      <HeroClient />

      {/* Categories */}
      <section className="py-12" aria-labelledby="categories-heading">
        <Container>
          <h2 id="categories-heading" className="text-2xl font-bold mb-6 text-center text-[#1A1A6E]">Nuestras categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="relative overflow-hidden rounded-xl p-6 text-center hover:shadow-lg transition-all group min-h-[120px] flex flex-col items-center gap-3 border border-[rgba(26,26,110,0.12)] bg-white hover:border-[rgba(91,0,181,0.3)] hover:shadow-[0_4px_20px_rgba(91,0,181,0.1)]"
              >
                <cat.Icon className="h-9 w-9 transition-transform group-hover:scale-110" style={{ color: cat.color }} aria-hidden="true" />
                <span className="font-semibold text-sm text-[#1A1A6E]/80 group-hover:text-[#5B00B5] transition-colors">
                  {cat.name}
                </span>
                <ChevronRight className="h-4 w-4 text-[#1A1A6E]/40 group-hover:text-[#5B00B5] transition-colors" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured products */}
      <section className="py-12 bg-transparent" aria-labelledby="featured-heading">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 id="featured-heading" className="text-2xl font-bold text-[#1A1A6E]">Productos destacados</h2>
            <Link href="/productos" className="text-sm text-[#5B00B5] hover:underline font-medium flex items-center gap-1">
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
          <h2 id="values-heading" className="text-2xl font-bold text-center mb-12 text-[#1A1A6E]">¿Por qué elegir Vida Líquida?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { Icon: Leaf, title: "Ingredientes naturales", desc: "Formulados con extractos vegetales y sin compuestos petroquímicos.", color: "#80CC28" },
              { Icon: Wind, title: "Sin vapores tóxicos", desc: "Seguros de usar en espacios cerrados sin necesidad de ventilación especial.", color: "#4DC8E8" },
              { Icon: Recycle, title: "Biodegradables al 100%", desc: "Se degradan completamente sin contaminar agua ni suelo.", color: "#80CC28" },
              { Icon: FlaskConical, title: "Respaldo científico", desc: "Formulados y certificados en colaboración con la BUAP.", color: "#5B00B5" },
              { Icon: ShieldCheck, title: "COFEPRIS", desc: "Registro sanitario vigente, cumplimos todas las normas mexicanas.", color: "#5B00B5" },
              { Icon: Package, title: "Envío a todo México", desc: "Llegamos a más de 15 estados con servicio estándar y express.", color: "#4DC8E8" },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <item.Icon className="h-7 w-7 shrink-0 mt-0.5" style={{ color: item.color }} aria-hidden="true" />
                <div>
                  <h3 className="font-semibold mb-1 text-[#1A1A6E]">{item.title}</h3>
                  <p className="text-sm text-[#1A1A6E]/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section
        className="py-16 text-white"
        style={{ background: "linear-gradient(135deg, #5B00B5, #3D007A)" }}
        aria-labelledby="testimonials-heading"
      >
        <Container>
          <h2 id="testimonials-heading" className="text-2xl font-bold text-center mb-10">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.author} className="bg-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-sm">
                <div className="flex gap-0.5" aria-label={`${t.rating} estrellas`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FFD600] text-[#FFD600]" />
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
          <div className="rounded-3xl p-10 text-center text-white" style={{ background: "linear-gradient(135deg, #80CC28, #5FA01E)" }}>
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Tienes un negocio o empresa?
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Ofrecemos presentaciones industriales de 5L y 20L con precios especiales para volumen.
            </p>
            <Button size="lg" asChild className="bg-[#5B00B5] hover:bg-[#3D007A] text-white border-0">
              <Link href="/productos?categoria=industrial">Ver productos industriales</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
