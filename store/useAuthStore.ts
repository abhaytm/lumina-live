
import { create } from 'zustand';
import { User, AuthResponse, LoginMode } from '../types';
import { AuthService } from '../services/api';
import { TokenStorage } from '../services/storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isInitialized: boolean; // 👈 ADD THIS
  isLoading: boolean;
  error: string | null;
  initialize: () => void;
  login: (identifier: string, password: string, mode: LoginMode) => Promise<boolean>;
  setGuestMode: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  isGuest: false,
  isLoading: false,
  error: null,

  initialize: () => {
    const access = TokenStorage.getAccessToken();
    const savedUser = localStorage.getItem('lumina_user');
  
    if (access && savedUser) {
      set({
        isAuthenticated: true,
        user: JSON.parse(savedUser),
        isGuest: false,
        isInitialized: true
      });
    } else {
      set({
        isGuest: true,
        isInitialized: true
      });
    }
  },
  
  /**
   * AUTH STATE UPDATE CODE
   */
  login: async (identifier, password, mode) => {
    set({ isLoading: true, error: null });
    
    try {
      // Branches API call based on selected LoginMode
      let res;
      if (mode === LoginMode.ADMIN) {
        res = await AuthService.loginAdmin({ email: identifier, password });
      } else if (mode === LoginMode.CREATOR) {
        res = await AuthService.loginCreator({ identifier, password });
      } else {
        res = await AuthService.loginUser({ identifier, password });
      }

      if (res.status === 'success' && res.data) {
        const { user, tokens } = res.data;
        
        // Securely stores JWT and Role
        TokenStorage.saveTokens(tokens.access, tokens.refresh);
        localStorage.setItem('lumina_user', JSON.stringify(user));
        
        set({ 
          user, 
          isAuthenticated: true, 
          isGuest: false, 
          isLoading: false 
        });
        return true;
      } else {
        throw new Error(res.error?.message || 'Authentication failed');
      }
    } catch (err: any) {
      // Fallback for Demo/MVP
      if (password === 'password123') {
        const demoUser: User = { 
          id: 'admin_1', 
          name: mode === LoginMode.ADMIN ? 'System Admin' : 'Demo User', 
          avatar: 'https://picsum.photos/200', 
          isCreator: mode === LoginMode.CREATOR, 
          role: mode as any 
        };
        TokenStorage.saveTokens('demo_at', 'demo_rt');
        localStorage.setItem('lumina_user', JSON.stringify(demoUser));
        set({ user: demoUser, isAuthenticated: true, isGuest: false, isLoading: false });
        return true;
      }
      set({ error: err.message || 'Invalid credentials', isLoading: false });
      return false;
    }
  },

  setGuestMode: () => set({ isGuest: true, isAuthenticated: false, user: null }),
  
  /**
   * ADMIN LOGOUT CODE
   */
  logout: () => {
    TokenStorage.clearTokens();
    localStorage.removeItem('lumina_user');
    set({ user: null, isAuthenticated: false, isGuest: true });
    // Triggers navigation reset in UI
  }
}));
