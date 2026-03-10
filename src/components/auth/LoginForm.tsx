"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Correo o contraseña incorrectos");
    } else {
      router.push("/cuenta");
    }
  }

  async function handleGoogle() {
    await signIn("google", { callbackUrl: "/cuenta" });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {error && (
          <div role="alert" className="p-3 rounded-lg bg-[hsl(var(--destructive)/10%)] text-[hsl(var(--destructive))] text-sm">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="login-email">Correo electrónico</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            aria-describedby={errors.email ? "login-email-error" : undefined}
            {...register("email", { required: "El correo es requerido", pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" } })}
          />
          {errors.email && <p id="login-email-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label htmlFor="login-password">Contraseña</Label>
            <Link href="/recuperar" className="text-xs text-[hsl(var(--primary))] hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            aria-describedby={errors.password ? "login-password-error" : undefined}
            {...register("password", { required: "La contraseña es requerida" })}
          />
          {errors.password && <p id="login-password-error" role="alert" className="text-xs text-[hsl(var(--destructive))]">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-[hsl(var(--muted-foreground))]">o continúa con</span>
        <Separator className="flex-1" />
      </div>

      <Button variant="outline" className="w-full gap-2" onClick={handleGoogle}>
        <svg viewBox="0 0 24 24" className="h-4 w-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Google
      </Button>

      <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="text-[hsl(var(--primary))] hover:underline font-medium">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
