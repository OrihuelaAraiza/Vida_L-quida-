import {
  Html, Head, Body, Container, Section, Text, Heading,
  Hr, Button, Row, Column, Img,
} from "@react-email/components";
import type { Order } from "@/types";

interface OrderConfirmationEmailProps {
  order: Order;
}

export function OrderConfirmationEmail({ order }: OrderConfirmationEmailProps) {
  return (
    <Html lang="es">
      <Head />
      <Body style={{ backgroundColor: "#F5F1EB", fontFamily: "'Alegreya Sans', Arial, sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px" }}>
          {/* Header */}
          <Section style={{ textAlign: "center", marginBottom: "32px" }}>
            <Heading style={{ color: "#2D6A4F", fontFamily: "Georgia, serif", fontSize: "32px" }}>
              Vida Líquida
            </Heading>
            <Text style={{ color: "#666", fontSize: "16px" }}>Productos de limpieza orgánicos</Text>
          </Section>

          {/* Title */}
          <Heading style={{ color: "#2D2D2D", textAlign: "center" }}>
            ¡Tu pedido está confirmado!
          </Heading>

          <Text style={{ textAlign: "center", color: "#666" }}>
            Hola {order.customerName}, hemos recibido tu pedido #{order.orderNumber}.
          </Text>

          <Hr style={{ borderColor: "#C8C0B8", margin: "24px 0" }} />

          {/* Items */}
          <Section>
            <Heading as="h2" style={{ color: "#2D2D2D", fontSize: "18px" }}>Productos</Heading>
            {order.items.map((item, i) => (
              <Row key={i} style={{ marginBottom: "12px" }}>
                <Column>
                  <Text style={{ margin: 0, fontWeight: "500" }}>{item.name} ({item.presentation})</Text>
                  <Text style={{ margin: 0, color: "#666", fontSize: "14px" }}>Cantidad: {item.quantity}</Text>
                </Column>
                <Column style={{ textAlign: "right" }}>
                  <Text style={{ margin: 0, fontWeight: "600", color: "#2D6A4F" }}>
                    ${(item.price * item.quantity * 1.16).toFixed(2)} MXN
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={{ borderColor: "#C8C0B8", margin: "24px 0" }} />

          {/* Total */}
          <Row>
            <Column><Text style={{ fontWeight: "700", fontSize: "16px" }}>Total</Text></Column>
            <Column style={{ textAlign: "right" }}>
              <Text style={{ fontWeight: "700", fontSize: "16px", color: "#2D6A4F" }}>
                ${order.total.toFixed(2)} MXN
              </Text>
            </Column>
          </Row>

          {/* Address */}
          <Section style={{ backgroundColor: "white", borderRadius: "12px", padding: "20px", marginTop: "24px" }}>
            <Text style={{ fontWeight: "600", marginBottom: "8px" }}>Dirección de envío</Text>
            <Text style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              {order.address.street}, {order.address.colonia}<br />
              CP {order.address.cp}, {order.address.municipio}, {order.address.estado}
            </Text>
          </Section>

          <Hr style={{ borderColor: "#C8C0B8", margin: "24px 0" }} />

          <Section style={{ textAlign: "center" }}>
            <Button
              href="https://vidaliquida.mx/cuenta/pedidos"
              style={{ backgroundColor: "#2D6A4F", color: "white", padding: "12px 24px", borderRadius: "8px", fontWeight: "600" }}
            >
              Ver mis pedidos
            </Button>
          </Section>

          <Text style={{ textAlign: "center", color: "#999", fontSize: "12px", marginTop: "32px" }}>
            © Vida Líquida · Puebla, México · hola@vidaliquida.mx
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
