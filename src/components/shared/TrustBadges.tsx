import { ShieldCheck, Leaf, Truck, Award } from "lucide-react";

const badges = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-[hsl(var(--primary))]" />,
    title: "Certificado COFEPRIS",
    description: "Cumple normas sanitarias mexicanas",
  },
  {
    icon: <Leaf className="h-8 w-8 text-[hsl(var(--primary))]" />,
    title: "100% Biodegradable",
    description: "Sin vapores tóxicos ni sustancias nocivas",
  },
  {
    icon: <Award className="h-8 w-8 text-[hsl(var(--accent))]" />,
    title: "Aval BUAP",
    description: "Respaldado por investigación universitaria",
  },
  {
    icon: <Truck className="h-8 w-8 text-[hsl(var(--secondary))]" />,
    title: "Envío a 15+ estados",
    description: "Entrega rápida a todo México",
  },
];

export function TrustBadges() {
  return (
    <section className="py-12 bg-white" aria-label="Certificaciones y beneficios">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-[hsl(var(--background))]"
            >
              {badge.icon}
              <div>
                <p className="font-semibold text-sm">{badge.title}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
