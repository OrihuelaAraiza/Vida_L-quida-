import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMXN(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMXNWithIVA(amount: number): string {
  const withIVA = amount * 1.16;
  return formatMXN(withIVA);
}

export function calculateIVA(subtotal: number): number {
  return subtotal * 0.16;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

export function getShippingCost(cp: string): { standard: number; express: number } {
  // Puebla state CPs
  const pueblaCPs = ["72", "73", "74", "75"];
  const isPuebla = pueblaCPs.some((prefix) => cp.startsWith(prefix));
  if (isPuebla) {
    return { standard: 0, express: 99 };
  }
  return { standard: 149, express: 249 };
}
