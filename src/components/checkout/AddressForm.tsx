"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Address } from "@/types";

const ESTADOS_MEXICO = [
  "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas",
  "Chihuahua","Ciudad de México","Coahuila","Colima","Durango","Estado de México",
  "Guanajuato","Guerrero","Hidalgo","Jalisco","Michoacán","Morelos","Nayarit",
  "Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo","San Luis Potosí",
  "Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas"
];

interface AddressFormProps {
  defaultValues?: Partial<Address>;
  onSubmit: (data: Address) => void;
  loading?: boolean;
}

export function AddressForm({ defaultValues, onSubmit, loading }: AddressFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Address>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="address-name">Nombre completo *</Label>
          <Input
            id="address-name"
            autoComplete="name"
            aria-describedby={errors.name ? "address-name-error" : undefined}
            {...register("name", { required: "El nombre es requerido" })}
          />
          {errors.name && <p id="address-name-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="address-phone">Teléfono *</Label>
          <Input
            id="address-phone"
            type="tel"
            autoComplete="tel"
            aria-describedby={errors.phone ? "address-phone-error" : undefined}
            {...register("phone", { required: "El teléfono es requerido", pattern: { value: /^[0-9]{10}$/, message: "Ingresa 10 dígitos" } })}
          />
          {errors.phone && <p id="address-phone-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="address-street">Calle y número *</Label>
        <Input
          id="address-street"
          autoComplete="address-line1"
          placeholder="Calle, número exterior e interior"
          aria-describedby={errors.street ? "address-street-error" : undefined}
          {...register("street", { required: "La calle es requerida" })}
        />
        {errors.street && <p id="address-street-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.street.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="address-colonia">Colonia *</Label>
          <Input
            id="address-colonia"
            aria-describedby={errors.colonia ? "address-colonia-error" : undefined}
            {...register("colonia", { required: "La colonia es requerida" })}
          />
          {errors.colonia && <p id="address-colonia-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.colonia.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="address-cp">Código postal *</Label>
          <Input
            id="address-cp"
            autoComplete="postal-code"
            maxLength={5}
            aria-describedby={errors.cp ? "address-cp-error" : undefined}
            {...register("cp", { required: "El CP es requerido", pattern: { value: /^[0-9]{5}$/, message: "Ingresa 5 dígitos" } })}
          />
          {errors.cp && <p id="address-cp-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.cp.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="address-municipio">Municipio / Delegación *</Label>
          <Input
            id="address-municipio"
            aria-describedby={errors.municipio ? "address-municipio-error" : undefined}
            {...register("municipio", { required: "El municipio es requerido" })}
          />
          {errors.municipio && <p id="address-municipio-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.municipio.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="address-estado">Estado *</Label>
          <Select onValueChange={(v) => setValue("estado", v)} defaultValue={defaultValues?.estado}>
            <SelectTrigger id="address-estado" aria-describedby={errors.estado ? "address-estado-error" : undefined}>
              <SelectValue placeholder="Selecciona un estado" />
            </SelectTrigger>
            <SelectContent>
              {ESTADOS_MEXICO.map((estado) => (
                <SelectItem key={estado} value={estado}>{estado}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" {...register("estado", { required: "El estado es requerido" })} />
          {errors.estado && <p id="address-estado-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.estado.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="address-referencias">Referencias (opcional)</Label>
        <Input
          id="address-referencias"
          placeholder="Entre calles, color de la fachada, etc."
          {...register("referencias")}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Guardando..." : "Continuar →"}
      </Button>
    </form>
  );
}
