
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    role: 'USER' | 'CREATOR' | 'ADMIN';
    avatar: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
