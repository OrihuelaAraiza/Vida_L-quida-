"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { PRODUCTOS, getPrecioDesde, type Producto } from "@/data/productos";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const CATEGORIAS = [
  { key: "todos", label: "Todos" },
  { key: "hogar", label: "Hogar" },
  { key: "desinfeccion", label: "Desinfección" },
  { key: "industrial", label: "Industrial" },
  { key: "automotriz", label: "Automotriz" },
  { key: "cosmetica", label: "Cosmética" },
] as const;

type CatKey = (typeof CATEGORIAS)[number]["key"];

function ProductCard({ producto }: { producto: Producto }) {
  const router = useRouter();
  const precio = getPrecioDesde(producto);
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={() => router.push(`/productos/${producto.slug}`)}
      className="group relative rounded-2xl overflow-hidden text-left w-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B00B5]"
      aria-label={`Ver ${producto.nombre}`}
    >
      {/* Banner image or color fallback */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={{ background: producto.colorBanner }}
      >
        {!imgError ? (
          <Image
            src={producto.banner}
            alt={producto.nombre}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          // Fallback when image not yet uploaded
          <div
            className="absolute inset-0 flex items-center justify-center p-4 text-center"
            style={{ color: producto.colorTexto }}
          >
            <span className="font-bold text-lg leading-tight">{producto.nombre}</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {producto.ecoAmigable && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#80CC28] text-white shadow">
              Eco Amigable
            </span>
          )}
          {producto.buap && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1A1A6E] text-white shadow">
              BUAP
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-white border border-gray-100 rounded-b-2xl">
        <h3 className="font-bold text-[#1A1A6E] text-sm leading-tight mb-1 line-clamp-2 group-hover:text-[#5B00B5] transition-colors">
          {producto.nombre}
        </h3>

        <ul className="mb-3 space-y-0.5">
          {producto.beneficios.slice(0, 2).map((b) => (
            <li key={b} className="flex items-start gap-1.5 text-xs text-gray-600">
              <CheckCircle2 className="h-3 w-3 text-[#80CC28] shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Desde</span>
            <p className="text-[#5B00B5] font-bold text-base">
              ${precio.toFixed(2)}
            </p>
          </div>
          <span className="flex items-center gap-0.5 text-xs text-[#5B00B5] font-semibold group-hover:underline">
            Ver más <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

export function ProductShowcase() {
  const [activeCat, setActiveCat] = useState<CatKey>("todos");

  const filtered =
    activeCat === "todos"
      ? PRODUCTOS
      : PRODUCTOS.filter((p) => p.categoria === activeCat);

  return (
    <section className="py-16 bg-[#F4F8FF]" aria-labelledby="showcase-heading">
      <Container>
        <div className="flex flex-col items-center mb-10">
          <h2 id="showcase-heading" className="text-3xl md:text-4xl font-bold text-[#1A1A6E] mb-2 text-center">
            Nuestros Productos
          </h2>
          <p className="text-gray-500 text-center max-w-xl mb-6">
            Limpieza profesional biodegradable, sin vapores tóxicos, certificados COFEPRIS y BUAP.
          </p>

          {/* Category filter */}
          <div
            className="flex flex-wrap gap-2 justify-center"
            role="group"
            aria-label="Filtrar por categoría"
          >
            {CATEGORIAS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCat(key)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-semibold border transition-all",
                  activeCat === key
                    ? "bg-[#5B00B5] text-white border-[#5B00B5]"
                    : "bg-white text-[#1A1A6E] border-[#1A1A6E]/20 hover:border-[#5B00B5] hover:text-[#5B00B5]"
                )}
                aria-pressed={activeCat === key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((producto) => (
            <ProductCard key={producto.slug} producto={producto} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">No hay productos en esta categoría aún.</p>
        )}
      </Container>
    </section>
  );
}
