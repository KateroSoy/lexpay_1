import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItemType = 'product' | 'service' | 'digital';

export interface CartItem {
  id: string; // The unique ID of the cart item (usually combination of id + variants to allow multiple of same product with different variants)
  productId: string;
  type: CartItemType;
  name: string;
  price: number;
  quantity: number;
  image: string;
  metadata?: {
    variant?: string;
    date?: string;
    time?: string;
    digitalInfo?: string;
    provider?: string;
  };
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === newItem.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
              ),
            };
          }
          return { items: [...state.items, newItem] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'lex-cart-storage',
    }
  )
);

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  items: CartItem[];
  address: string;
  paymentMethod: string;
}

interface UserState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: 'lex-user-storage',
    }
  )
);

export type ThemeType = 'light' | 'dark';

interface ThemeState {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark', // Default to dark as requested previously
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'lex-theme-storage',
    }
  )
);

