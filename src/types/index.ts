export interface Presentation {
  size: string;
  price: number;
  sku?: string;
  stock?: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  presentations: Presentation[];
  images: SanityImage[];
  category: Category;
  technicalSheet?: string;
  safetySheet?: string;
  videoUrl?: string;
  isFeatured: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  useCase?: string[];
  _createdAt: string;
  _updatedAt: string;
}

export interface SanityImage {
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

export interface Review {
  _id: string;
  product: { _ref: string };
  author: string;
  rating: number;
  body: string;
  photo?: SanityImage;
  verified: boolean;
  _createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPresentation: string;
}

export interface Address {
  id?: string;
  name: string;
  street: string;
  colonia: string;
  cp: string;
  municipio: string;
  estado: string;
  referencias?: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  presentation: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  iva: number;
  shipping: number;
  total: number;
  address: Address;
  paymentMethod: "stripe" | "oxxo" | "spei" | "msi";
  stripePaymentIntentId?: string;
  conektaOrderId?: string;
  oxxoReference?: string;
  speiClabe?: string;
  trackingNumber?: string;
  carrier?: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  _createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  addresses?: Address[];
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: any;
  coverImage: SanityImage;
  author: string;
  _createdAt: string;
  _updatedAt: string;
}
