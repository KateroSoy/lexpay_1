import type { CheckoutItem, HomePayload, Product, Service } from './types';
import { useCmsStore } from './cmsStore';

// Simulate network delay for realistic UI loading states
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// The storefront reads the same records the demo CMS edits. The store is seeded
// from src/data/mockData.ts, so with an untouched CMS this returns exactly what
// the mock data always returned.
const catalog = () => useCmsStore.getState();

export const lexpayApi = {
  home: async () => {
    await delay(600);
    const { products, services, digital } = catalog();
    return {
      products: products as unknown as Product[],
      services: services as unknown as Service[],
      digitalItems: digital as any[],
      banners: [],
      settings: {}
    } as HomePayload;
  },

  products: async () => {
    await delay(400);
    return { data: catalog().products as unknown as Product[] };
  },
  product: async (slug: string) => {
    await delay(400);
    const p = catalog().products.find(x => x.slug === slug);
    if (!p) throw new Error("Not found");
    return { data: p as unknown as Product };
  },

  services: async () => {
    await delay(400);
    return { data: catalog().services as unknown as Service[] };
  },
  service: async (slug: string) => {
    await delay(400);
    const s = catalog().services.find(x => x.slug === slug);
    if (!s) throw new Error("Not found");
    return { data: s as unknown as Service };
  },

  digitalItems: async () => {
    await delay(400);
    return { data: catalog().digital };
  },

  trackOrder: async () => {
    await delay(500);
    return { status: 'pending' };
  },

  checkout: async (payload: any) => {
    await delay(800);
    return { payment: { redirect_url: '/explore' } };
  },

  login: async () => {
    await delay(500);
    return { token: 'mock-token' };
  }
};
