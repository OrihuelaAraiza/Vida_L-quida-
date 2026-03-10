import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const eventType: string = body.type;
  const orderId: string = body.data?.object?.id;

  console.log(`Conekta webhook: ${eventType} for order ${orderId}`);

  switch (eventType) {
    case "order.paid":
    case "charge.paid":
      // Update order status to "paid" in your DB
      // await updateOrderStatus(orderId, "paid");
      // Send confirmation email
      break;
    case "order.expired":
      // Mark order as expired
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
