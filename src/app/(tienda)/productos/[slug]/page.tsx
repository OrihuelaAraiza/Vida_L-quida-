import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductTabs } from "@/components/product/ProductTabs";
import { SizeSelector } from "@/components/product/SizeSelector";
import { Rating } from "@/components/shared/Rating";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug, getRelatedProducts } from "@/lib/sanity/queries";
import { AddToCartSection } from "./AddToCartSection";
import { ProductGrid } from "@/components/product/ProductGrid";

export const revalidate = 30;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description?.slice(0, 160),
    openGraph: {
      images: product.images?.[0] ? [{ url: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${product.images[0].asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}` }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();

  const related = await getRelatedProducts(product._id, product.category?.slug ?? "").catch(() => []);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Vida Líquida" },
    aggregateRating: product.rating > 0 ? {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    } : undefined,
    offers: product.presentations?.map((p: any) => ({
      "@type": "Offer",
      price: (p.price * 1.16).toFixed(2),
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      name: p.size,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Productos", href: "/productos" },
            { label: product.category?.name ?? "Categoría", href: `/productos?categoria=${product.category?.slug}` },
            { label: product.name },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images ?? []} productName={product.name} />

          {/* Info */}
          <div className="space-y-6">
            {product.category && (
              <Badge variant="secondary">{product.category.name}</Badge>
            )}
            <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3">
              <Rating value={product.rating ?? 0} size="md" showCount count={product.reviewCount} />
              {product.reviewCount > 0 && (
                <a href="#reviews" className="text-sm text-[hsl(var(--primary))] hover:underline">
                  Ver {product.reviewCount} reseña{product.reviewCount !== 1 ? "s" : ""}
                </a>
              )}
            </div>

            <AddToCartSection product={product} />

            {/* Demo video */}
            {product.videoUrl && (
              <div className="rounded-xl overflow-hidden aspect-video">
                <iframe
                  src={product.videoUrl.replace("watch?v=", "embed/")}
                  title={`Video demostrativo: ${product.name}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <ProductTabs product={product} />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold mb-6">Frecuentemente comprados juntos</h2>
            <ProductGrid products={related.slice(0, 4)} />
          </section>
        )}
      </Container>
    </>
  );
}
