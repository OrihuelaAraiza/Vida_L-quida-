import type { Metadata } from "next";
import type React from "react";
import { Container } from "@/components/layout/Container";
import { MapPin, Phone, Mail, Users, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "Distribuidores Autorizados",
  description: "Red de distribuidores autorizados Vida Líquida en México. Puebla, Toluca, Aguascalientes y Monclova Coahuila.",
};

interface Contacto {
  ciudad?: string;
  nombre: string;
  tel: string;
  telNota?: string;
  email: string;
}

interface Distribuidor {
  tipo: string;
  icon: React.ElementType;
  direccion?: string;
  contactos: Contacto[];
}

const DISTRIBUIDORES: Distribuidor[] = [
  {
    tipo: "Distribuidores Autorizados Puebla",
    icon: Users,
    contactos: [
      {
        nombre: "Rosa Nallely Gerón",
        tel: "222 710 9372",
        email: "gedirona@gmail.com",
      },
    ],
  },
  {
    tipo: "Distribuidores Autorizados en la República",
    icon: Users,
    contactos: [
      {
        ciudad: "Toluca",
        nombre: "Basilia Lopez A.",
        tel: "722 120 22 72",
        email: "bmlopez67@gmail.com",
      },
    ],
  },
  {
    tipo: "Sucursal Aguascalientes, Ags.",
    icon: Store,
    direccion: "Av. Constitución 608, Col. Constitución, C.P. 20126",
    contactos: [
      {
        nombre: "Adriana",
        tel: "449 894 5214",
        email: "adry.aleman@iCloud.com",
      },
    ],
  },
  {
    tipo: "Distribuidores Autorizados en la República",
    icon: Users,
    contactos: [
      {
        ciudad: "Monclova, Coahuila",
        nombre: "Enrique",
        tel: "449 438 8415",
        telNota: "sólo WhatsApp",
        email: "aztec01@outlook.com",
      },
    ],
  },
];

export default function DistribuidoresPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #3D7A1A, #4A9420)" }}>
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Distribuidores Autorizados</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Encuentra un distribuidor Vida Líquida cerca de ti. Red autorizada con presencia en toda la República Mexicana.
          </p>
        </Container>
      </section>

      {/* Grid de distribuidores */}
      <section className="py-16" style={{ background: "linear-gradient(180deg, #4A9420 0%, #3D7A1A 100%)" }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DISTRIBUIDORES.map((dist, i) => {
              const Icon = dist.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl p-6 text-white"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Icon className="h-6 w-6 shrink-0 mt-0.5 text-[#80CC28]" aria-hidden="true" />
                    <div>
                      <h2 className="font-bold text-[#80CC28] text-sm tracking-wide uppercase">
                        {dist.tipo}
                      </h2>
                      {dist.direccion && (
                        <p className="text-white/70 text-sm mt-1 flex items-start gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-white/50" />
                          {dist.direccion}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {dist.contactos.map((c, j) => (
                      <div key={j} className="space-y-1.5">
                        {c.ciudad && (
                          <p className="text-xs text-white/50 font-bold uppercase tracking-widest">{c.ciudad}</p>
                        )}
                        <p className="font-bold text-white italic">{c.nombre}</p>
                        <p className="flex items-center gap-2 text-sm text-white/80">
                          <Phone className="h-3.5 w-3.5 shrink-0 text-white/50" />
                          <a href={`tel:+52${c.tel.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                            Tel. {c.telNota ? `(${c.telNota}) ` : ""}
                            <span className="font-semibold">{c.tel}</span>
                          </a>
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                          <Mail className="h-3.5 w-3.5 shrink-0 text-white/50" />
                          <a
                            href={`mailto:${c.email}`}
                            className="text-[#80CC28] hover:text-[#A8E850] transition-colors"
                          >
                            {c.email}
                          </a>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ¿Quieres ser distribuidor? */}
      <section className="py-12 bg-[#F5F9FF]">
        <Container narrow>
          <div className="text-center rounded-3xl p-10" style={{ background: "linear-gradient(135deg, #5B00B5, #3D007A)" }}>
            <h2 className="text-2xl font-bold text-white mb-3">¿Quieres ser distribuidor?</h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">
              Únete a nuestra red de distribuidores autorizados. Contáctanos para conocer los requisitos y beneficios.
            </p>
            <a
              href="mailto:hola@vidaliquida.mx"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-[#5B00B5] bg-white hover:bg-white/90 transition-colors min-h-[44px]"
            >
              <Mail className="h-4 w-4" />
              Contáctanos
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
