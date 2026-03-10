import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { Package, MapPin, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CuentaPage() {
  return (
    <Container className="py-8">
      <Breadcrumb items={[{ label: "Mi cuenta" }]} className="mb-6" />
      <h1 className="text-3xl font-bold mb-8">Mi cuenta</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl">
        <Link
          href="/cuenta/pedidos"
          className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-md transition-shadow border border-[hsl(var(--border))] min-h-[44px]"
        >
          <Package className="h-8 w-8 text-[hsl(var(--primary))]" />
          <div>
            <p className="font-semibold">Mis pedidos</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Historial y estado</p>
          </div>
        </Link>

        <Link
          href="/cuenta/direcciones"
          className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-md transition-shadow border border-[hsl(var(--border))] min-h-[44px]"
        >
          <MapPin className="h-8 w-8 text-[hsl(var(--secondary))]" />
          <div>
            <p className="font-semibold">Direcciones</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Gestiona tus domicilios</p>
          </div>
        </Link>

        <button className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-md transition-shadow border border-[hsl(var(--border))] text-left min-h-[44px]">
          <LogOut className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
          <div>
            <p className="font-semibold">Cerrar sesión</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Salir de tu cuenta</p>
          </div>
        </button>
      </div>
    </Container>
  );
}
