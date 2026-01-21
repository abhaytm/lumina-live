
import { ApiResponse } from '../types';
import { TokenStorage } from './storage';

const BASE_URL = 'https://api.luminalive.com/v1';

class HttpClient {
  private static instance: HttpClient;
  
  private constructor() {}

  static getInstance(): HttpClient {
    if (!HttpClient.instance) HttpClient.instance = new HttpClient();
    return HttpClient.instance;
  }

  private getHeaders(): HeadersInit {
    const token = TokenStorage.getAccessToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000); // 8s timeout for faster feedback

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: { ...this.getHeaders(), ...options.headers },
        signal: controller.signal
      });

      clearTimeout(id);

      if (response.status === 401) {
        TokenStorage.clearTokens();
        window.dispatchEvent(new CustomEvent('auth:expired'));
      }

      if (!response.ok) throw new Error('API_FAIL');

      const result = await response.json();
      
      return {
        status: 'success',
        data: result.data,
      };
    } catch (err: any) {
      // SILENT FALLBACK: Always log but return error so service can handle it with mock data
      console.warn(`HTTP fail for ${endpoint}, falling back to mock.`);
      return {
        status: 'error',
        error: {
          code: 'NETWORK_ERROR',
          message: 'Falling back to local data'
        }
      };
    }
  }

  get<T>(path: string) { return this.request<T>(path, { method: 'GET' }); }
  post<T>(path: string, body: any) { return this.request<T>(path, { method: 'POST', body: JSON.stringify(body) }); }
  put<T>(path: string, body: any) { return this.request<T>(path, { method: 'PUT', body: JSON.stringify(body) }); }
  delete<T>(path: string) { return this.request<T>(path, { method: 'DELETE' }); }
}

export const http = HttpClient.getInstance();
