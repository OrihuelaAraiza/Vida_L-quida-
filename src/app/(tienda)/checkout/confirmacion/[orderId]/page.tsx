import { Container } from "@/components/layout/Container";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import type { Order } from "@/types";

interface Props {
  params: Promise<{ orderId: string }>;
}

// In a real app, fetch the order from DB
async function getOrder(orderId: string): Promise<Order | null> {
  return {
    _id: orderId,
    orderNumber: orderId.slice(-8).toUpperCase(),
    status: "pending",
    items: [],
    subtotal: 0,
    iva: 0,
    shipping: 149,
    total: 149,
    address: { name: "", street: "", colonia: "", cp: "", municipio: "", estado: "", phone: "" },
    paymentMethod: "oxxo",
    oxxoReference: "3300000000000000",
    customerEmail: "cliente@ejemplo.com",
    customerName: "Cliente",
    customerPhone: "2221234567",
    _createdAt: new Date().toISOString(),
  };
}

export default async function ConfirmacionPage({ params }: Props) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-2xl font-bold">Pedido no encontrado</h1>
      </Container>
    );
  }

  return (
    <Container narrow className="py-8">
      <OrderConfirmation order={order} />
    </Container>
  );
}
