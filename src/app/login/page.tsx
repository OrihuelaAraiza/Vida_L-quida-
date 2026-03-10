import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <Container narrow className="py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white font-bold text-lg mb-4">
            VL
          </div>
          <h1 className="text-2xl font-bold">Bienvenido de vuelta</h1>
          <p className="text-[hsl(var(--muted-foreground))] mt-1">Inicia sesión en tu cuenta</p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-[hsl(var(--border))]">
          <LoginForm />
        </div>
      </div>
    </Container>
  );
}
