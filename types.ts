
export interface User {
  id: string;
  name: string;
  avatar: string;
  isCreator: boolean;
  role: 'USER' | 'CREATOR' | 'ADMIN' | 'SUPER_ADMIN';
  email?: string;
  phone?: string;
}

export enum LoginMode {
  USER = 'USER',
  CREATOR = 'CREATOR',
  ADMIN = 'ADMIN'
}

export interface Price {
  amount: number;
  currency: 'INR';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  description: string;
  inStock: boolean;
  stockCount: number;
  creatorId: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
}

export interface Stream {
  id: string;
  creator: User;
  title: string;
  thumbnail: string;
  viewerCount: number;
  isLive: boolean;
  productIds: string[];
  tags: string[];
  ingestUrl?: string;
  streamKey?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum AppRoute {
  SPLASH = 'splash',
  LOGIN = 'login',
  SIGNUP = 'signup',
  HOME = 'home',
  CATEGORIES = 'categories',
  LIVE_LIST = 'live_list',
  PRODUCT = 'product',
  CART = 'cart',
  PROFILE = 'profile',
  CREATOR_DASHBOARD = 'creator_dashboard',
  ADD_PRODUCT = 'add_product',
  START_LIVE = 'start_live',
  ADMIN_LOGIN = 'admin_login',
  ADMIN_DASHBOARD = 'admin_dashboard'
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  isSystem?: boolean;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    total?: number;
  };
}

export interface AuthResponse {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
}
