import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/shared/LoadingSkeleton";
import { getAllProducts, getAllCategories } from "@/lib/sanity/queries";
import { STATIC_PRODUCTS } from "@/data/productos";
import { ProductFilters } from "./ProductFilters";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Todos los productos",
  description: "Catálogo completo de productos de limpieza orgánicos Vida Líquida. Hogar, industrial, automotriz y cosmética.",
};

interface Props {
  searchParams: Promise<{ categoria?: string; presentacion?: string; sort?: string; min?: string; max?: string }>;
}

export default async function ProductosPage({ searchParams }: Props) {
  const params = await searchParams;

  const [sanityProducts, categories] = await Promise.all([
    getAllProducts({
      category: params.categoria,
      sort: params.sort,
      minPrice: params.min ? Number(params.min) : undefined,
      maxPrice: params.max ? Number(params.max) : undefined,
    }).catch(() => []),
    getAllCategories().catch(() => []),
  ]);

  // Usar catálogo estático mientras no haya productos en Sanity
  let products = sanityProducts.length > 0 ? sanityProducts : STATIC_PRODUCTS;

  // Aplicar filtro de categoría sobre estáticos si corresponde
  if (sanityProducts.length === 0 && params.categoria) {
    products = products.filter((p: { category?: { slug?: string } }) => p.category?.slug === params.categoria);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: "https://vidaliquida.mx" },
              { "@type": "ListItem", position: 2, name: "Productos", item: "https://vidaliquida.mx/productos" },
            ],
          }),
        }}
      />
      <Container className="py-8">
        <Breadcrumb items={[{ label: "Productos" }]} className="mb-6" />
        <h1 className="text-3xl font-bold mb-8">
          {params.categoria
            ? categories.find((c: any) => c.slug === params.categoria)?.name ?? "Productos"
            : "Todos los productos"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <ProductFilters categories={categories} />
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
