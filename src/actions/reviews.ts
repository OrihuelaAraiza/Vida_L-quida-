"use server";

import { sanityClient } from "@/lib/sanity/client";

interface CreateReviewInput {
  productId: string;
  author: string;
  rating: number;
  body: string;
  orderEmail?: string;
}

export async function createReview(input: CreateReviewInput) {
  const { productId, author, rating, body, orderEmail } = input;

  // In production, verify the buyer has purchased the product
  const verified = Boolean(orderEmail);

  const review = await sanityClient.create({
    _type: "review",
    product: { _type: "reference", _ref: productId },
    author,
    rating,
    body,
    verified,
  });

  // Update product aggregate rating
  const reviews = await sanityClient.fetch(
    `*[_type == "review" && product._ref == $productId]{ rating }`,
    { productId }
  );
  const avgRating = reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length;
  await sanityClient.patch(productId).set({
    rating: Math.round(avgRating * 10) / 10,
    reviewCount: reviews.length,
  }).commit();

  return review;
}
