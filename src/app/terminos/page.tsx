import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = { title: "Términos y condiciones" };

export default function TerminosPage() {
  return (
    <Container narrow className="py-8">
      <Breadcrumb items={[{ label: "Términos y condiciones" }]} className="mb-6" />
      <article className="prose prose-lg max-w-none">
        <h1>Términos y condiciones</h1>
        <p>Última actualización: {new Date().toLocaleDateString("es-MX", { month: "long", day: "numeric", year: "numeric" })}</p>
        <h2>Uso del sitio</h2>
        <p>Al usar vidaliquida.mx, aceptas estos términos. El sitio es propiedad de Vida Líquida, empresa constituida en Puebla, México.</p>
        <h2>Pedidos y pagos</h2>
        <p>Los precios incluyen IVA. Los pedidos se confirman al recibir el pago. Nos reservamos el derecho de cancelar pedidos en caso de error de precio.</p>
        <h2>Envíos</h2>
        <p>Realizamos envíos a toda la República Mexicana. Los tiempos de entrega son estimados y pueden variar según la zona.</p>
        <h2>Devoluciones</h2>
        <p>Aceptamos devoluciones dentro de los 30 días posteriores a la entrega si el producto presenta defecto de fabricación. Contacta a <a href="mailto:hola@vidaliquida.mx">hola@vidaliquida.mx</a></p>
        <h2>Contacto</h2>
        <p>Para dudas: <a href="mailto:hola@vidaliquida.mx">hola@vidaliquida.mx</a></p>
      </article>
    </Container>
  );
}
