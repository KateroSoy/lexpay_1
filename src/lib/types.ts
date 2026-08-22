export interface Product {
  id: string;
  name: string;
  price: number;
  image: string | null;
  category: string | null;
  brand: string | null;
  slug: string;
  description: string;
  variants: string[];
  gallery: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  fulfillment: string;
}

export interface ServiceOption {
  name: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  provider: string;
  category: string | null;
  startingPrice: number;
  options: ServiceOption[];
  duration: string | null;
  availability: string[];
  coverageArea: string[];
  image: string | null;
  description: string;
  rating: number;
  slug: string;
}

export interface DigitalDenomination {
  id: string;
  name: string;
  price: number;
}

export interface DigitalItem {
  id: string;
  name: string;
  provider: string;
  category: string | null;
  instantDelivery: boolean;
  image: string | null;
  description: string;
  slug: string;
  denominations: DigitalDenomination[];
}

export interface HomePayload {
  products: Product[];
  services: Service[];
  digitalItems: DigitalItem[];
  banners: unknown[];
  settings: Record<string, unknown>;
}

export type CheckoutItem = {
  type: 'product' | 'service' | 'digital';
  id: string;
  quantity?: number;
  variant?: string;
  option?: string;
  appointment_at?: string;
  metadata?: Record<string, unknown>;
};
