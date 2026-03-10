import { PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: { label: string; href: string };
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "Sin resultados",
  description = "No encontramos lo que buscas.",
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="mb-4 text-[hsl(var(--muted-foreground))]">
        {icon ?? <PackageOpen className="h-16 w-16" />}
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-[hsl(var(--muted-foreground))] mb-6 max-w-md">{description}</p>
      {action && (
        <Button asChild>
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
