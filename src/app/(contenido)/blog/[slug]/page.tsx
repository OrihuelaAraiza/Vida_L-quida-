import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getBlogPostBySlug } from "@/lib/sanity/queries";
import { urlForWithDimensions } from "@/lib/sanity/client";

export const revalidate = 300;

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  return (
    <Container narrow className="py-8">
      <Breadcrumb
        items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
        className="mb-6"
      />
      <article>
        <header className="mb-8">
          <time className="text-sm text-[hsl(var(--muted-foreground))]">
            {new Date(post._createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
          </time>
          <h1 className="text-4xl font-bold mt-2 mb-4">{post.title}</h1>
          {post.excerpt && <p className="text-lg text-[hsl(var(--muted-foreground))]">{post.excerpt}</p>}
        </header>

        {post.coverImage && (
          <div className="mb-8 rounded-2xl overflow-hidden aspect-video">
            <Image
              src={urlForWithDimensions(post.coverImage, 1200, 675)}
              alt={post.coverImage.alt ?? post.title}
              width={1200}
              height={675}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-['Alegreya'] prose-a:text-[hsl(var(--primary))]">
          {/* In production use @portabletext/react */}
          <p className="text-[hsl(var(--muted-foreground))]">Contenido del artículo...</p>
        </div>
      </article>
    </Container>
  );
}
