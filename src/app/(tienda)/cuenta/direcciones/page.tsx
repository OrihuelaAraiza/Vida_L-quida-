"use client";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AddressForm } from "@/components/checkout/AddressForm";
import { Button } from "@/components/ui/button";
import type { Address } from "@/types";
import { MapPin, Plus, Trash2 } from "lucide-react";

export default function DireccionesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);

  function handleAdd(data: Address) {
    setAddresses((prev) => [...prev, { ...data, id: Date.now().toString() }]);
    setShowForm(false);
  }

  return (
    <Container className="py-8">
      <Breadcrumb
        items={[{ label: "Mi cuenta", href: "/cuenta" }, { label: "Direcciones" }]}
        className="mb-6"
      />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mis direcciones</h1>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva dirección
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-[hsl(var(--border))] mb-6">
          <h2 className="font-semibold mb-4">Agregar dirección</h2>
          <AddressForm onSubmit={handleAdd} />
          <Button variant="ghost" onClick={() => setShowForm(false)} className="mt-2">Cancelar</Button>
        </div>
      )}

      {addresses.length === 0 ? (
        <div className="text-center py-16 text-[hsl(var(--muted-foreground))]">
          <MapPin className="h-12 w-12 mx-auto mb-4" />
          <p>No tienes direcciones guardadas.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-white rounded-2xl p-5 border border-[hsl(var(--border))]">
              <p className="font-semibold">{addr.name}</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                {addr.street}, {addr.colonia}, CP {addr.cp}<br />
                {addr.municipio}, {addr.estado}
              </p>
              <p className="text-sm mt-1">{addr.phone}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 text-[hsl(var(--destructive))] gap-2"
                onClick={() => setAddresses((prev) => prev.filter((a) => a.id !== addr.id))}
                aria-label={`Eliminar dirección de ${addr.name}`}
              >
                <Trash2 className="h-3 w-3" />
                Eliminar
              </Button>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
