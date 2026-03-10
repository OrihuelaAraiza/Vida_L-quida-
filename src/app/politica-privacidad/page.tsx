import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PoliticaPrivacidadPage() {
  return (
    <Container narrow className="py-8">
      <Breadcrumb items={[{ label: "Política de privacidad" }]} className="mb-6" />
      <article className="prose prose-lg max-w-none">
        <h1>Política de privacidad</h1>
        <p>Última actualización: {new Date().toLocaleDateString("es-MX", { month: "long", day: "numeric", year: "numeric" })}</p>
        <p>En Vida Líquida, ubicada en Puebla, México, estamos comprometidos con la protección de tu información personal conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).</p>
        <h2>Datos que recopilamos</h2>
        <p>Recopilamos nombre, correo electrónico, teléfono y dirección de entrega para procesar tus pedidos. No compartimos ni vendemos tu información a terceros.</p>
        <h2>Uso de datos</h2>
        <p>Usamos tu información exclusivamente para procesar pedidos, enviarte confirmaciones y mejorar tu experiencia de compra.</p>
        <h2>Derechos ARCO</h2>
        <p>Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al uso de tus datos. Envía tu solicitud a <a href="mailto:privacidad@vidaliquida.mx">privacidad@vidaliquida.mx</a></p>
        <h2>Contacto</h2>
        <p>Para cualquier consulta sobre privacidad, contáctanos en <a href="mailto:privacidad@vidaliquida.mx">privacidad@vidaliquida.mx</a></p>
      </article>
    </Container>
  );
}
