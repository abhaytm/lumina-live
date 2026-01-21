
import React from 'react';
import { X, Lock, LogOut, ShoppingBag, Video } from 'lucide-react';
import { GradientButton } from './UI';

export const AuthRequiredModal: React.FC<{ 
  onLogin: () => void, 
  onClose: () => void,
  context?: 'SHOP' | 'LIVE' 
}> = ({ onLogin, onClose, context = 'SHOP' }) => (
  <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center">
    <div className="bg-white w-full max-w-md rounded-t-[3rem] p-8 animate-slide-up shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-brand-orange">
          {context === 'SHOP' ? <ShoppingBag size={28} /> : <Video size={28} />}
        </div>
        <button onClick={onClose} className="p-2 text-slate-300 active:scale-90 transition-transform"><X size={28} /></button>
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-2">Join Lumina Live</h3>
      <p className="text-slate-400 font-medium mb-8 leading-relaxed">
        {context === 'SHOP' 
          ? "Sign in to add items to your cart and enjoy seamless 1-tap checkout." 
          : "Sign in to chat with creators, send reactions, and get exclusive drops during the live show."}
      </p>
      
      <GradientButton fullWidth onClick={onLogin}>Sign In to Continue</GradientButton>
      <button onClick={onClose} className="w-full py-4 mt-3 text-slate-400 font-bold text-sm tracking-widest uppercase">Maybe Later</button>
    </div>
  </div>
);

export const LogoutModal: React.FC<{ onConfirm: () => void, onCancel: () => void }> = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
    <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 text-center animate-fade-in shadow-2xl border border-slate-100">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
        <LogOut size={32} />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-2">Sign Out?</h3>
      <p className="text-slate-400 font-medium mb-8 leading-relaxed">Are you sure you want to end your current session?</p>
      
      <div className="flex gap-4">
        <button onClick={onCancel} className="flex-1 py-4 bg-slate-100 rounded-full font-bold text-slate-600 active:scale-95 transition-all">Cancel</button>
        <button onClick={onConfirm} className="flex-1 py-4 bg-red-500 rounded-full font-bold text-white shadow-xl shadow-red-500/30 active:scale-95 transition-all">Logout</button>
      </div>
    </div>
  </div>
);
