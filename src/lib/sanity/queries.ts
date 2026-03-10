import { sanityClient } from "./client";

const productFields = `
  _id,
  name,
  "slug": slug.current,
  description,
  presentations,
  images[] { _key, asset, alt },
  category-> { _id, name, "slug": slug.current, icon },
  technicalSheet,
  safetySheet,
  videoUrl,
  isFeatured,
  rating,
  reviewCount,
  useCase,
  _createdAt,
  _updatedAt
`;

export async function getFeaturedProducts() {
  return sanityClient.fetch(
    `*[_type == "product" && isFeatured == true] | order(_createdAt desc) [0...8] { ${productFields} }`,
    {},
    { next: { revalidate: 300 } }
  );
}

export async function getAllProducts(params?: {
  category?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  let filter = `*[_type == "product"`;
  if (params?.category) filter += ` && category->slug.current == "${params.category}"`;
  if (params?.minPrice !== undefined) filter += ` && presentations[].price >= ${params.minPrice}`;
  filter += `]`;

  let order = `| order(_createdAt desc)`;
  if (params?.sort === "price_asc") order = `| order(presentations[0].price asc)`;
  if (params?.sort === "price_desc") order = `| order(presentations[0].price desc)`;
  if (params?.sort === "popular") order = `| order(rating desc)`;

  return sanityClient.fetch(
    `${filter} ${order} { ${productFields} }`,
    {},
    { next: { revalidate: 30 } }
  );
}

export async function getProductBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "product" && slug.current == $slug][0] { ${productFields} }`,
    { slug },
    { next: { revalidate: 30 } }
  );
}

export async function getAllCategories() {
  return sanityClient.fetch(
    `*[_type == "category"] | order(name asc) { _id, name, "slug": slug.current, icon }`,
    {},
    { next: { revalidate: 300 } }
  );
}

export async function getRelatedProducts(productId: string, categorySlug: string) {
  return sanityClient.fetch(
    `*[_type == "product" && category->slug.current == $categorySlug && _id != $productId] | order(rating desc) [0...4] { ${productFields} }`,
    { categorySlug, productId },
    { next: { revalidate: 300 } }
  );
}

export async function getProductReviews(productId: string) {
  return sanityClient.fetch(
    `*[_type == "review" && product._ref == $productId] | order(_createdAt desc) { _id, author, rating, body, verified, _createdAt }`,
    { productId },
    { next: { revalidate: 60 } }
  );
}

export async function searchProducts(query: string) {
  const groqQuery = `*[_type == "product" && (name match $query || description match $query)] | order(rating desc) [0...10] { ${productFields} }`;
  return (sanityClient as any).fetch(groqQuery, { query: `${query}*` });
}

export async function getAllBlogPosts() {
  return sanityClient.fetch(
    `*[_type == "post"] | order(_createdAt desc) { _id, title, "slug": slug.current, excerpt, coverImage { asset, alt }, author, _createdAt }`,
    {},
    { next: { revalidate: 300 } }
  );
}

export async function getBlogPostBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] { _id, title, "slug": slug.current, excerpt, body, coverImage { asset, alt }, author, _createdAt }`,
    { slug },
    { next: { revalidate: 300 } }
  );
}
