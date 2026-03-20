"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, ChevronRight, ShoppingCart } from "lucide-react";
import { PRODUCTOS, getPrecioDesde, type Producto } from "@/data/productos";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const CATEGORIAS = [
  { key: "todos",       label: "Todos" },
  { key: "hogar",       label: "Hogar" },
  { key: "desinfeccion",label: "Desinfección" },
  { key: "industrial",  label: "Industrial" },
  { key: "automotriz",  label: "Automotriz" },
  { key: "cosmetica",   label: "Cosmética" },
] as const;

type CatKey = (typeof CATEGORIAS)[number]["key"];

function ProductCard({ producto }: { producto: Producto }) {
  const router = useRouter();
  const precioDesde = getPrecioDesde(producto);

  return (
    <article
      onClick={() => router.push(`/productos/${producto.slug}`)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Banner image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={producto.banner}
          alt={producto.nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {producto.ecoAmigable && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#80CC28] text-white shadow-md">
              Eco Amigable
            </span>
          )}
          {producto.buap && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1A1A6E] text-white shadow-md">
              Aval BUAP
            </span>
          )}
        </div>

        {/* Price badge — bottom right */}
        <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md">
          <p className="text-[10px] text-gray-400 leading-none">Desde</p>
          <p className="text-[#5B00B5] font-black text-base leading-tight">
            ${precioDesde.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Info panel */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-bold text-[#1A1A6E] text-sm leading-snug group-hover:text-[#5B00B5] transition-colors line-clamp-2">
          {producto.nombre}
        </h3>

        {/* Benefits */}
        <ul className="flex-1 space-y-1">
          {producto.beneficios.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#80CC28] shrink-0 mt-px" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Presentations preview */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-gray-100">
          {producto.presentaciones.slice(0, 4).map((p) => (
            <span
              key={p.volumen}
              className="text-[10px] px-2 py-0.5 rounded-full border border-[#5B00B5]/20 text-[#5B00B5] bg-[#5B00B5]/5 font-medium"
            >
              {p.volumen}
            </span>
          ))}
          {producto.presentaciones.length > 4 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-gray-200 text-gray-400">
              +{producto.presentaciones.length - 4} más
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); router.push(`/productos/${producto.slug}`); }}
          className="mt-1 w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: "linear-gradient(90deg, #5B00B5, #7B20D5)" }}
        >
          <span className="flex items-center gap-1.5">
            <ShoppingCart className="h-4 w-4" />
            Ver producto
          </span>
          <ChevronRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
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

        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <span className="text-xs font-bold tracking-widest text-[#80CC28] uppercase mb-2">
            Catálogo completo
          </span>
          <h2 id="showcase-heading" className="text-3xl md:text-4xl font-bold text-[#1A1A6E] mb-3 text-center">
            Nuestros Productos
          </h2>
          <p className="text-[#1A1A6E]/60 text-center max-w-lg text-sm mb-8">
            Limpieza profesional biodegradable — sin vapores tóxicos, certificados COFEPRIS y BUAP.
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
                aria-pressed={activeCat === key}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200",
                  activeCat === key
                    ? "bg-[#5B00B5] text-white border-[#5B00B5] shadow-md"
                    : "bg-white text-[#1A1A6E] border-[#1A1A6E]/15 hover:border-[#5B00B5] hover:text-[#5B00B5]"
                )}
              >
                {label}
                <span className={cn(
                  "ml-1.5 text-xs",
                  activeCat === key ? "text-white/70" : "text-gray-400"
                )}>
                  {key === "todos"
                    ? PRODUCTOS.length
                    : PRODUCTOS.filter((p) => p.categoria === key).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((producto) => (
            <ProductCard key={producto.slug} producto={producto} />
          ))}
        </div>

      </Container>
    </section>
  );
}
