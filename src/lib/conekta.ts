import type { OrderItem, Address } from "@/types";

const CONEKTA_API_KEY = process.env.CONEKTA_API_KEY!;
const CONEKTA_BASE_URL = "https://api.conekta.io";

const headers = {
  "Accept": "application/vnd.conekta-v2.1.0+json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${CONEKTA_API_KEY}`,
};

export async function createConektaOrder(params: {
  items: OrderItem[];
  total: number;
  customer: { name: string; email: string; phone: string };
  address: Address;
  paymentMethod: "card" | "oxxo" | "spei";
  tokenId?: string;
  msiMonths?: number;
}) {
  const { items, total, customer, address, paymentMethod, tokenId, msiMonths } = params;

  const lineItems = items.map((item) => ({
    name: `${item.name} (${item.presentation})`,
    quantity: item.quantity,
    unit_price: Math.round(item.price * 100),
  }));

  const shippingLines = [{
    amount: Math.round((total - items.reduce((s, i) => s + i.price * i.quantity, 0)) * 100),
    carrier: "Vida Líquida Shipping",
    tracking_number: "",
  }];

  let chargeSource: Record<string, unknown>;

  if (paymentMethod === "card" && tokenId) {
    chargeSource = {
      type: "card",
      token_id: tokenId,
      ...(msiMonths && { monthly_installments: msiMonths }),
    };
  } else if (paymentMethod === "oxxo") {
    chargeSource = {
      type: "cash",
      expires_at: Math.floor(Date.now() / 1000) + 48 * 60 * 60,
    };
  } else if (paymentMethod === "spei") {
    chargeSource = { type: "spei" };
  } else {
    chargeSource = { type: "cash" };
  }

  const body = {
    line_items: lineItems,
    shipping_lines: shippingLines,
    customer_info: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    },
    shipping_contact: {
      receiver: address.name,
      phone: address.phone,
      address: {
        street1: address.street,
        city: address.municipio,
        state: address.estado,
        country: "MX",
        postal_code: address.cp,
      },
    },
    charges: [{ payment_method: chargeSource }],
    currency: "MXN",
  };

  const response = await fetch(`${CONEKTA_BASE_URL}/orders`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details?.[0]?.message ?? "Error al crear orden en Conekta");
  }

  return response.json();
}
