import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const all = [{ label: "Inicio", href: "/" }, ...items];

  return (
    <nav aria-label="Ruta de navegación" className={cn("flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))]", className)}>
      <ol className="flex items-center gap-1 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        {all.map((item, index) => (
          <li key={index} className="flex items-center gap-1" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {index > 0 && <ChevronRight className="h-3 w-3 shrink-0" aria-hidden />}
            {item.href && index < all.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-[hsl(var(--foreground))] transition-colors"
                itemProp="item"
              >
                {index === 0 ? <Home className="h-3.5 w-3.5" aria-hidden /> : null}
                <span itemProp="name">{index === 0 ? <span className="sr-only">{item.label}</span> : item.label}</span>
              </Link>
            ) : (
              <span className="text-[hsl(var(--foreground))] font-medium" aria-current="page" itemProp="name">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
