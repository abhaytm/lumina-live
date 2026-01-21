
import { AuthResponse, User, Product, Stream, ApiResponse } from '../types';
import { http } from './httpClient';
import { MOCK_PRODUCTS, MOCK_STREAMS } from '../constants';

/**
 * ADMIN LOGIN API CALL CODE
 */
export const AuthService = {
  loginUser: (data: any) => http.post<AuthResponse>('/auth/user/login', data),
  loginCreator: (data: any) => http.post<AuthResponse>('/auth/creator/login', data),
  // Dedicated Admin Endpoint
  loginAdmin: (data: any) => http.post<AuthResponse>('/auth/admin/login', data),
  logout: () => http.post<null>('/auth/logout', {}),
  getMe: () => http.get<User>('/users/me'),
};

export const ProductService = {
  list: async (params?: any) => {
    const res = await http.get<Product[]>('/products');
    if (res.status === 'error') return { status: 'success', data: MOCK_PRODUCTS } as ApiResponse<Product[]>;
    return res;
  },
  trending: async () => {
    const res = await http.get<Product[]>('/products/trending');
    if (res.status === 'error') return { status: 'success', data: MOCK_PRODUCTS } as ApiResponse<Product[]>;
    return res;
  },
  detail: async (id: string) => {
    const res = await http.get<Product>(`/products/${id}`);
    if (res.status === 'error') {
        const p = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
        return { status: 'success', data: p } as ApiResponse<Product>;
    }
    return res;
  },
  search: (q: string) => http.get<Product[]>(`/products/search?q=${q}`),
};

export const LiveService = {
  listActive: async () => {
    const res = await http.get<Stream[]>('/live');
    if (res.status === 'error') return { status: 'success', data: MOCK_STREAMS } as ApiResponse<Stream[]>;
    return res;
  },
  join: async (id: string) => {
    const res = await http.post<{ chatToken: string }>(`/live/${id}/join`, {});
    if (res.status === 'error') return { status: 'success', data: { chatToken: 'mock_chat_token_' + Date.now() } } as ApiResponse<{ chatToken: string }>;
    return res;
  },
  start: (title: string, products: string[]) => http.post<Stream>('/live/start', { title, products }),
  end: (id: string) => http.post<null>('/live/end', { streamId: id }),
};

export const CartService = {
  get: () => http.get<{ items: any[], total: number }>('/cart'),
  add: (productId: string, qty: number) => http.post<any>('/cart/add', { productId, quantity: qty }),
  update: (productId: string, qty: number) => http.put<any>('/cart/update', { productId, quantity: qty }),
  remove: (id: string) => http.delete<any>(`/cart/remove/${id}`),
};

export const CreatorService = {
  getStats: () => http.get<any>('/creators/me'),
  getAnalytics: () => http.get<any>('/creators/analytics'),
};

export const ApiService = { auth: AuthService, products: ProductService, streams: LiveService, cart: CartService, creator: CreatorService };
