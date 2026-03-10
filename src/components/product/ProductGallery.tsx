"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SanityImage } from "@/types";
import { urlForWithDimensions } from "@/lib/sanity/client";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: SanityImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [current, setCurrent] = useState(0);
  const hasImages = images?.length > 0;

  function prev() {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }
  function next() {
    setCurrent((c) => (c + 1) % images.length);
  }

  if (!hasImages) {
    return (
      <div className="aspect-square rounded-xl bg-[hsl(var(--muted))] flex items-center justify-center">
        <span className="text-[hsl(var(--muted-foreground))]">Sin imagen</span>
      </div>
    );
  }

  const currentImage = images[current];
  const imageUrl = urlForWithDimensions(currentImage, 800, 800);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-[hsl(var(--muted))] group">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={imageUrl}
              alt={currentImage.alt ?? `${productName} - imagen ${current + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={current === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img._key ?? i}
              onClick={() => setCurrent(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={current === i ? "true" : undefined}
              className={cn(
                "shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-colors",
                current === i
                  ? "border-[hsl(var(--primary))]"
                  : "border-transparent hover:border-[hsl(var(--border))]"
              )}
            >
              <Image
                src={urlForWithDimensions(img, 64, 64)}
                alt={img.alt ?? `Miniatura ${i + 1}`}
                width={64}
                height={64}
                className="object-cover h-full w-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
