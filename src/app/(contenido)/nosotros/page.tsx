import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce la historia de Vida Líquida, empresa poblana de productos de limpieza orgánicos certificados COFEPRIS.",
};

export default function NosotrosPage() {
  return (
    <>
      <Container className="py-8">
        <Breadcrumb items={[{ label: "Nosotros" }]} className="mb-6" />

        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">Nuestra historia</h1>

          <div className="space-y-6 text-[hsl(var(--foreground))] leading-relaxed">
            <p className="text-lg">
              Vida Líquida nació en Puebla con una misión clara: demostrar que la limpieza eficaz y el cuidado del medio ambiente pueden ir de la mano.
            </p>
            <p>
              Fundada por un equipo de químicos y emprendedores poblanos, en colaboración con la Benemérita Universidad Autónoma de Puebla (BUAP), desarrollamos formulaciones que reemplazan los productos convencionales a base de petroquímicos con alternativas biodegradables y seguros para toda la familia.
            </p>
            <p>
              Nuestros productos están certificados por COFEPRIS, cumplen con la NOM correspondiente y han sido evaluados para garantizar que no emiten vapores tóxicos, son seguros para niños y mascotas, y se degradan por completo sin contaminar el agua ni el suelo.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "8+", label: "Productos certificados" },
              { number: "15+", label: "Estados con envío" },
              { number: "500+", label: "Clientes satisfechos" },
              { number: "3", label: "Años de experiencia" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 border border-[hsl(var(--border))]">
                <p className="text-3xl font-bold text-[hsl(var(--primary))]">{stat.number}</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link href="/productos">Ver nuestros productos</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <a href="mailto:hola@vidaliquida.mx">Contactar</a>
            </Button>
          </div>
        </div>
      </Container>

      <TrustBadges />
    </>
  );
}
