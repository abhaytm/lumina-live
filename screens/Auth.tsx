
import React, { useState } from 'react';
import { Mail, ArrowRight, Lock, User as UserIcon } from 'lucide-react';
import { GradientButton, InputField } from '../components/UI';
import { AppRoute, LoginMode } from '../types';
import { useAuthStore } from '../store/useAuthStore';

interface AuthProps {
  onNavigate: (route: AppRoute) => void;
  // Callback after login success
  onLoginSuccess: (mode: LoginMode) => void;
}

/**
 * LOGIN SCREEN UI CODE
 */
export const LoginScreen: React.FC<AuthProps> = ({ onNavigate, onLoginSuccess }) => {
  // Toggle between USER and CREATOR
  const [mode, setMode] = useState<LoginMode>(LoginMode.USER);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, setGuestMode } = useAuthStore();

  const handleLogin = async () => {
    if (!identifier || !password) return;
    
    const success = await login(identifier, password, mode);
    if (success) {
      // Triggers role-based navigation logic in parent
      onLoginSuccess(mode);
    }
  };

  return (
    <div className="min-h-full flex flex-col relative bg-slate-50">
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-primary rounded-b-[4rem] z-0 shadow-glow"></div>
      
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pt-10">
        <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-100 animate-slide-up">
          <div className="w-16 h-16 bg-gradient-primary rounded-[1.5rem] flex items-center justify-center text-white text-3xl font-black mb-6 mx-auto shadow-glow">L</div>
          
          <h2 className="text-2xl font-black text-slate-900 text-center mb-6 tracking-tight">
            {mode === LoginMode.USER ? 'Welcome Back' : 'Creator Studio'}
          </h2>

          {/* Role Toggle Switch */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
            <button 
              onClick={() => setMode(LoginMode.USER)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === LoginMode.USER ? 'bg-white text-brand-orange shadow-sm' : 'text-slate-400'}`}
            >
              User Login
            </button>
            <button 
              onClick={() => setMode(LoginMode.CREATOR)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === LoginMode.CREATOR ? 'bg-white text-brand-orange shadow-sm' : 'text-slate-400'}`}
            >
              Creator Portal
            </button>
          </div>

          <div className="space-y-2">
            <InputField 
              icon={UserIcon} 
              label="Email or Phone" 
              placeholder="alex@example.com" 
              value={identifier} 
              onChange={(e) => setIdentifier(e.target.value)} 
            />
            <InputField 
              icon={Lock} 
              label="Password" 
              placeholder="••••••••" 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {/* Backend error display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-500 text-[10px] font-bold rounded-2xl text-center border border-red-100">
              {error}
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Demo: password123</p>
          </div>

          {/* Button text updates based on role */}
          <GradientButton 
            fullWidth 
            onClick={handleLogin} 
            isLoading={isLoading} 
            className="mt-6"
          >
            {mode === LoginMode.USER ? 'Login as User' : 'Login as Creator'} <ArrowRight size={18} />
          </GradientButton>

          <button 
            onClick={() => { setGuestMode(); onNavigate(AppRoute.HOME); }} 
            className="w-full mt-6 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-brand-orange transition-colors"
          >
            Browse as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
