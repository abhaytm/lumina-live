
import { Product, Stream, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Design',
  avatar: 'https://picsum.photos/seed/user1/100/100',
  isCreator: true,
  role: 'CREATOR',
};

// PRICES UPDATED TO PAISE (INR)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Lumina Glow Serum',
    price: 349900, // ₹3,499.00
    originalPrice: 450000,
    image: 'https://picsum.photos/seed/cosmetic1/400/400',
    rating: 4.8,
    description: 'Radiate confidence with our signature Vitamin C serum. Lightweight, hydrating, and perfect for all skin types.',
    inStock: true,
    stockCount: 50,
    creatorId: 'c1',
    categoryId: 'cat2',
  },
  {
    id: 'p2',
    name: 'Urban Street Hoodie',
    price: 699900, // ₹6,999.00
    image: 'https://picsum.photos/seed/fashion1/400/400',
    rating: 4.5,
    description: 'Premium cotton blend hoodie with an oversized fit. Defines modern streetwear aesthetics.',
    inStock: true,
    stockCount: 120,
    creatorId: 'c1',
    categoryId: 'cat1',
  },
  {
    id: 'p3',
    name: 'Minimalist Watch Gold',
    price: 999900, // ₹9,999.00
    originalPrice: 1250000,
    image: 'https://picsum.photos/seed/watch1/400/400',
    rating: 4.9,
    description: 'Timeless elegance. Gold-plated stainless steel with a genuine leather strap.',
    inStock: true,
    stockCount: 15,
    creatorId: 'c2',
    categoryId: 'cat1',
  },
  {
    id: 'p4',
    name: 'Sonic Wireless Buds',
    price: 1499900, // ₹14,999.00
    image: 'https://picsum.photos/seed/tech1/400/400',
    rating: 4.7,
    description: 'Active noise cancellation and 30-hour battery life. Immerse yourself in pure sound.',
    inStock: true,
    stockCount: 200,
    creatorId: 'c2',
    categoryId: 'cat3',
  },
];

export const MOCK_STREAMS: Stream[] = [
  {
    id: 's1',
    creator: { id: 'c1', name: 'Sarah Styles', avatar: 'https://picsum.photos/seed/creator1/100/100', isCreator: true, role: 'CREATOR' },
    title: 'Flash Sale: Summer Collection ☀️',
    thumbnail: 'https://picsum.photos/seed/stream1/600/800',
    viewerCount: 1240,
    isLive: true,
    productIds: ['p1', 'p2'],
    tags: ['Fashion', 'Sale'],
  },
  {
    id: 's2',
    creator: { id: 'c2', name: 'Tech Insider', avatar: 'https://picsum.photos/seed/creator2/100/100', isCreator: true, role: 'CREATOR' },
    title: 'Reviewing the New Sonic Buds',
    thumbnail: 'https://picsum.photos/seed/stream2/600/800',
    viewerCount: 856,
    isLive: true,
    productIds: ['p4'],
    tags: ['Tech', 'Gadgets'],
  },
];

export const CATEGORIES = [
  { id: 'cat1', name: 'Fashion', iconName: 'Shirt' },
  { id: 'cat2', name: 'Beauty', iconName: 'Sparkles' },
  { id: 'cat3', name: 'Tech', iconName: 'Smartphone' },
  { id: 'cat4', name: 'Home', iconName: 'Home' },
  { id: 'cat5', name: 'Sports', iconName: 'Activity' },
];
