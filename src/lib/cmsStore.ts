import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  mockProducts,
  mockServices,
  mockDigital,
  type Product,
  type Service,
  type DigitalProduct,
} from '../data/mockData';

/**
 * Demo CMS store.
 *
 * Seeded from mockData.ts and persisted to localStorage, so edits made in
 * /admin survive a reload and show up in the storefront (src/lib/api.ts reads
 * from here). Nothing talks to a server — this is a UI demo.
 */

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled';

export interface OrderLine {
  name: string;
  type: 'product' | 'service' | 'digital';
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  channel: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items: OrderLine[];
}

export type CollectionMap = {
  products: Product;
  services: Service;
  digital: DigitalProduct;
  orders: Order;
};

export type Collection = keyof CollectionMap;

export interface CmsRecord {
  id: string;
  [key: string]: unknown;
}

/** Demo orders, derived from the catalog so totals always look plausible. */
function seedOrders(): Order[] {
  const buyers = [
    ['Rizky Ananda', '6281234567801', 'GoPay'],
    ['Siti Nurhaliza', '6281234567802', 'BCA Virtual Account'],
    ['Bagus Prakoso', '6281234567803', 'QRIS'],
    ['Dewi Lestari', '6281234567804', 'ShopeePay'],
    ['Andi Wijaya', '6281234567805', 'BNI Virtual Account'],
    ['Maya Kusuma', '6281234567806', 'QRIS'],
    ['Fajar Ramadhan', '6281234567807', 'GoPay'],
    ['Putri Amelia', '6281234567808', 'Mandiri Bill Payment'],
    ['Hendra Gunawan', '6281234567809', 'BRI Virtual Account'],
    ['Nadia Safira', '6281234567810', 'QRIS'],
  ] as const;

  const statuses: OrderStatus[] = [
    'completed', 'paid', 'processing', 'pending', 'completed',
    'cancelled', 'paid', 'completed', 'processing', 'paid',
  ];

  const now = Date.now();
  const day = 86_400_000;

  return buyers.map(([customerName, customerPhone, channel], i) => {
    const items: OrderLine[] = [];

    const product = mockProducts[i % mockProducts.length];
    items.push({
      name: product.name,
      type: 'product',
      quantity: (i % 3) + 1,
      price: product.price,
    });

    if (i % 2 === 0) {
      const service = mockServices[i % mockServices.length];
      items.push({
        name: service.name,
        type: 'service',
        quantity: 1,
        price: service.startingPrice,
      });
    }

    if (i % 3 === 0) {
      const digital = mockDigital[i % mockDigital.length];
      const denom = digital.denominations[0];
      items.push({
        name: `${digital.name} — ${denom.name}`,
        type: 'digital',
        quantity: 1,
        price: denom.price,
      });
    }

    return {
      id: `o${i + 1}`,
      code: `LEX-${String(24_001 + i)}`,
      customerName,
      customerPhone,
      channel,
      status: statuses[i],
      total: items.reduce((sum, it) => sum + it.price * it.quantity, 0),
      createdAt: new Date(now - (i * 1.7 + 0.4) * day).toISOString(),
      items,
    };
  });
}

function seed() {
  return {
    products: mockProducts.map((p) => ({ ...p })),
    services: mockServices.map((s) => ({ ...s })),
    digital: mockDigital.map((d) => ({ ...d })),
    orders: seedOrders(),
  };
}

interface CmsState {
  products: Product[];
  services: Service[];
  digital: DigitalProduct[];
  orders: Order[];
  authed: boolean;

  login: (email: string, password: string) => boolean;
  logout: () => void;

  createRecord: <K extends Collection>(collection: K, record: CollectionMap[K]) => void;
  updateRecord: <K extends Collection>(
    collection: K,
    id: string,
    patch: Partial<CollectionMap[K]>,
  ) => void;
  removeRecord: (collection: Collection, id: string) => void;
  resetDemo: () => void;
}

export const DEMO_EMAIL = 'demo@lexpay.id';
export const DEMO_PASSWORD = 'demo';

export const useCmsStore = create<CmsState>()(
  persist(
    (set) => ({
      ...seed(),
      authed: false,

      login: (email, password) => {
        const ok =
          email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
        if (ok) set({ authed: true });
        return ok;
      },
      logout: () => set({ authed: false }),

      createRecord: (collection, record) =>
        set((state) => ({
          [collection]: [record, ...(state[collection] as unknown as CmsRecord[])],
        }) as unknown as Partial<CmsState>),

      updateRecord: (collection, id, patch) =>
        set((state) => ({
          [collection]: (state[collection] as unknown as CmsRecord[]).map((row) =>
            row.id === id ? { ...row, ...patch } : row,
          ),
        }) as unknown as Partial<CmsState>),

      removeRecord: (collection, id) =>
        set((state) => ({
          [collection]: (state[collection] as unknown as CmsRecord[]).filter((row) => row.id !== id),
        }) as unknown as Partial<CmsState>),

      resetDemo: () => set({ ...seed() }),
    }),
    {
      name: 'lex-cms-storage',
      version: 1,
      // Only data is persisted; actions are re-attached from the initializer.
      partialize: (state) => ({
        products: state.products,
        services: state.services,
        digital: state.digital,
        orders: state.orders,
        authed: state.authed,
      }),
      // A corrupt or half-written payload falls back to the seed rather than
      // rendering an empty CMS.
      merge: (persisted, current) => {
        const saved = persisted as Partial<CmsState> | undefined;
        if (!saved || !Array.isArray(saved.products) || !Array.isArray(saved.orders)) {
          return current;
        }
        return { ...current, ...saved };
      },
    },
  ),
);

/** Next free id for a collection, e.g. "p4" / "s7" / "o12". */
export function nextId(prefix: string, rows: { id: string }[]): string {
  const max = rows.reduce((acc, row) => {
    const n = Number(String(row.id).replace(/^\D+/, ''));
    return Number.isFinite(n) && n > acc ? n : acc;
  }, 0);
  return `${prefix}${max + 1}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
