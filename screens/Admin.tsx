
import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { GradientButton, InputField } from '../components/UI';
import { useAuthStore } from '../store/useAuthStore';
import { AppRoute, LoginMode } from '../types';

/**
 * ADMIN LOGIN SCREEN UI CODE
 */
export const AdminLoginScreen: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();

  const handleAdminLogin = async () => {
    if (!email || !password) return;
    // Uses specific ADMIN mode for branching logic
    const success = await login(email, password, LoginMode.ADMIN);
    if (success) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-900 justify-center px-6 py-12">
      <div className="bg-white rounded-[3rem] p-10 shadow-2xl animate-slide-up">
        <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl">
          <ShieldAlert size={40} />
        </div>
        
        <h1 className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">System Admin</h1>
        <p className="text-slate-400 text-xs font-bold text-center uppercase tracking-widest mb-10">Restricted Access Only</p>

        <div className="space-y-4">
          <InputField 
            icon={Mail} 
            label="Admin Email" 
            placeholder="admin@luminalive.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <InputField 
            icon={Lock} 
            label="Security Password" 
            placeholder="••••••••" 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 flex items-center gap-2">
            <ShieldAlert size={14} /> {error}
          </div>
        )}

        <GradientButton 
          fullWidth 
          onClick={handleAdminLogin} 
          isLoading={isLoading} 
          className="mt-10 h-16 !bg-slate-900 !shadow-none"
        >
          Secure Authorization <ArrowRight size={20} />
        </GradientButton>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Demo: admin@luminalive.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC = () => (
  <div className="p-10 pt-24 bg-slate-50 min-h-full">
    <div className="flex items-center gap-4 mb-10">
      <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
        <ShieldAlert size={24} />
      </div>
      <h1 className="text-2xl font-black text-slate-900">Global Administration</h1>
    </div>
    
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Platform Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-slate-50 rounded-3xl">
            <p className="text-xs text-slate-400 font-bold uppercase">Total Users</p>
            <p className="text-2xl font-black">42,890</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-3xl">
            <p className="text-xs text-slate-400 font-bold uppercase">Active Creators</p>
            <p className="text-2xl font-black">1,204</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
