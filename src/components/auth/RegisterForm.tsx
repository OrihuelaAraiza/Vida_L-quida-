"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  loading?: boolean;
  error?: string | null;
}

export function RegisterForm({ onSubmit, loading, error }: RegisterFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {error && (
        <div role="alert" className="p-3 rounded-lg bg-[hsl(var(--destructive)/10%)] text-[hsl(var(--destructive))] text-sm">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="reg-name">Nombre completo</Label>
        <Input
          id="reg-name"
          autoComplete="name"
          {...register("name", { required: "El nombre es requerido" })}
          aria-describedby={errors.name ? "reg-name-error" : undefined}
        />
        {errors.name && <p id="reg-name-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reg-email">Correo electrónico</Label>
        <Input
          id="reg-email"
          type="email"
          autoComplete="email"
          {...register("email", { required: "El correo es requerido", pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" } })}
          aria-describedby={errors.email ? "reg-email-error" : undefined}
        />
        {errors.email && <p id="reg-email-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reg-password">Contraseña</Label>
        <Input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          {...register("password", { required: "La contraseña es requerida", minLength: { value: 8, message: "Mínimo 8 caracteres" } })}
          aria-describedby={errors.password ? "reg-password-error" : undefined}
        />
        {errors.password && <p id="reg-password-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.password.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reg-confirm">Confirmar contraseña</Label>
        <Input
          id="reg-confirm"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword", { validate: (val) => val === password || "Las contraseñas no coinciden" })}
          aria-describedby={errors.confirmPassword ? "reg-confirm-error" : undefined}
        />
        {errors.confirmPassword && <p id="reg-confirm-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </Button>

      <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-[hsl(var(--primary))] hover:underline font-medium">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
