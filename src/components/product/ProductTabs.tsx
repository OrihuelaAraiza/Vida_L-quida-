import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, ExternalLink } from "lucide-react";
import type { Product } from "@/types";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="descripcion" className="w-full">
      <TabsList className="w-full flex-wrap h-auto gap-1">
        <TabsTrigger value="descripcion">Descripción</TabsTrigger>
        <TabsTrigger value="uso">Modo de uso</TabsTrigger>
        {product.technicalSheet && <TabsTrigger value="ficha">Ficha técnica</TabsTrigger>}
        {product.safetySheet && <TabsTrigger value="seguridad">Hoja de seguridad</TabsTrigger>}
      </TabsList>

      <TabsContent value="descripcion" className="prose prose-sm max-w-none">
        <p className="leading-relaxed text-[hsl(var(--foreground))]">
          {product.description ?? "Producto de limpieza orgánico, biodegradable y sin vapores tóxicos de Vida Líquida."}
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-center gap-2">✅ Certificado COFEPRIS</li>
          <li className="flex items-center gap-2">🌿 100% biodegradable</li>
          <li className="flex items-center gap-2">🫁 Sin vapores tóxicos</li>
          <li className="flex items-center gap-2">🎓 Avalado por la BUAP</li>
        </ul>
      </TabsContent>

      <TabsContent value="uso" className="text-sm leading-relaxed space-y-3">
        <p>Instrucciones de uso:</p>
        <ol className="list-decimal list-inside space-y-2 text-[hsl(var(--foreground))]">
          <li>Agitar el envase antes de usar.</li>
          <li>Aplicar directamente sobre la superficie a limpiar.</li>
          <li>Dejar actuar por 1–2 minutos en superficies muy sucias.</li>
          <li>Frotar con esponja o paño húmedo.</li>
          <li>Enjuagar con agua limpia o limpiar con paño seco.</li>
        </ol>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4">
          Evitar el contacto con ojos. En caso de contacto, enjuagar con abundante agua. Mantener fuera del alcance de los niños.
        </p>
      </TabsContent>

      {product.technicalSheet && (
        <TabsContent value="ficha">
          <a
            href={product.technicalSheet}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[hsl(var(--primary))] hover:underline font-medium"
          >
            <FileText className="h-4 w-4" />
            Descargar Ficha Técnica (PDF)
            <ExternalLink className="h-3 w-3" />
          </a>
        </TabsContent>
      )}

      {product.safetySheet && (
        <TabsContent value="seguridad">
          <a
            href={product.safetySheet}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[hsl(var(--primary))] hover:underline font-medium"
          >
            <FileText className="h-4 w-4" />
            Descargar Hoja de Seguridad (PDF)
            <ExternalLink className="h-3 w-3" />
          </a>
        </TabsContent>
      )}
    </Tabs>
  );
}
