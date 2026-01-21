
import { create } from 'zustand';
import { CartItem, Product } from '../types';
import { CartService } from '../services/api';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  total: number;
  
  fetchCart: () => Promise<void>;
  addItem: (product: Product) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQty: (id: string, delta: number) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  total: 0,

  fetchCart: async () => {
    set({ isLoading: true });
    const res = await CartService.get();
    if (res.status === 'success' && res.data) {
      set({ items: res.data.items, total: res.data.total, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  addItem: async (product) => {
    // Optimistic Update
    const current = get().items;
    const existing = current.find(i => i.id === product.id);
    if (existing) {
      get().updateQty(product.id, 1);
      return;
    }
    
    set({ items: [...current, { ...product, quantity: 1 }] });
    const res = await CartService.add(product.id, 1);
    if (res.status !== 'success') get().fetchCart(); // Rollback on fail
  },

  removeItem: async (id) => {
    set({ items: get().items.filter(i => i.id !== id) });
    const res = await CartService.remove(id);
    if (res.status !== 'success') get().fetchCart();
  },

  updateQty: async (id, delta) => {
    const items = get().items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    
    set({ items });
    const updated = items.find(i => i.id === id);
    if (updated) {
      const res = await CartService.update(id, updated.quantity);
      if (res.status !== 'success') get().fetchCart();
    }
  },

  clearCart: () => set({ items: [], total: 0 })
}));
