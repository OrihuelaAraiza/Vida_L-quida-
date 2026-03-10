import {
  Html, Head, Body, Container, Section, Text, Heading, Button, Hr,
} from "@react-email/components";

interface ShippingUpdateEmailProps {
  orderNumber: string;
  customerName: string;
  trackingNumber: string;
  carrier: string;
  trackingUrl?: string;
}

export function ShippingUpdateEmail({
  orderNumber,
  customerName,
  trackingNumber,
  carrier,
  trackingUrl,
}: ShippingUpdateEmailProps) {
  return (
    <Html lang="es">
      <Head />
      <Body style={{ backgroundColor: "#F5F1EB", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px" }}>
          <Heading style={{ color: "#2D6A4F", textAlign: "center", fontFamily: "Georgia, serif" }}>
            Vida Líquida
          </Heading>
          <Text style={{ fontSize: "28px", fontWeight: "700", textAlign: "center" }}>🚚 ¡Tu pedido va en camino!</Text>
          <Text style={{ textAlign: "center", color: "#666" }}>
            Hola {customerName}, tu pedido #{orderNumber} ha sido enviado.
          </Text>
          <Section style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <Text style={{ color: "#666", fontSize: "14px" }}>Número de rastreo</Text>
            <Text style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "0.1em", color: "#2D2D2D" }}>
              {trackingNumber}
            </Text>
            <Text style={{ color: "#666", fontSize: "14px" }}>Paquetería: {carrier}</Text>
            {trackingUrl && (
              <Button
                href={trackingUrl}
                style={{ backgroundColor: "#2D6A4F", color: "white", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", marginTop: "16px" }}
              >
                Rastrear mi paquete
              </Button>
            )}
          </Section>
          <Hr style={{ borderColor: "#C8C0B8", margin: "24px 0" }} />
          <Text style={{ textAlign: "center", color: "#999", fontSize: "12px" }}>
            © Vida Líquida · Puebla, México
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
