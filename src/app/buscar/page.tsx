import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { searchProducts } from "@/lib/sanity/queries";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `Resultados para "${q}"` : "Buscar" };
}

export default async function BuscarPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const results = q ? await searchProducts(q).catch(() => []) : [];

  return (
    <Container className="py-8">
      <Breadcrumb items={[{ label: "Buscar" }]} className="mb-6" />
      <h1 className="text-3xl font-bold mb-2">
        {q ? `Resultados para "${q}"` : "Buscar productos"}
      </h1>
      {q && (
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          {results.length} resultado{results.length !== 1 ? "s" : ""}
        </p>
      )}
      {q ? (
        <ProductGrid products={results} />
      ) : (
        <p className="text-[hsl(var(--muted-foreground))]">Usa la barra de búsqueda para encontrar productos.</p>
      )}
    </Container>
  );
}
