import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getAllBlogPosts } from "@/lib/sanity/queries";
import { urlForWithDimensions } from "@/lib/sanity/client";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos sobre limpieza orgánica, consejos del hogar y sustentabilidad de Vida Líquida.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts().catch(() => []);

  return (
    <Container className="py-8">
      <Breadcrumb items={[{ label: "Blog" }]} className="mb-6" />
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-[hsl(var(--muted-foreground))]">Próximamente publicaremos artículos sobre limpieza orgánica.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group block">
              <article className="bg-white rounded-2xl overflow-hidden border border-[hsl(var(--border))] hover:shadow-md transition-shadow">
                {post.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={urlForWithDimensions(post.coverImage, 600, 340)}
                      alt={post.coverImage.alt ?? post.title}
                      width={600}
                      height={340}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <time className="text-xs text-[hsl(var(--muted-foreground))]">
                    {new Date(post._createdAt).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                  <h2 className="font-bold text-lg mt-1 mb-2 group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-3">{post.excerpt}</p>}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
