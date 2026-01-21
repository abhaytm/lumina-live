
import React from 'react';
import { Heart, ShoppingBag, Eye, Loader2, Star, Check } from 'lucide-react';
import { Product, Stream } from '../types';
import { formatINR } from '../utils/currency';

export const GradientButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}> = ({ children, onClick, className = '', variant = 'primary', fullWidth = false, disabled = false, isLoading = false }) => {
  const variants = {
    primary: "bg-gradient-primary text-white shadow-glow",
    secondary: "bg-white text-slate-800 shadow-card border border-slate-100",
    outline: "bg-transparent border-2 border-brand-orange text-brand-orange",
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative rounded-full font-bold transition-all active:scale-95 flex items-center justify-center gap-2 px-6 py-4 disabled:opacity-50 select-none ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {isLoading ? <Loader2 className="animate-spin" size={20} /> : children}
    </button>
  );
};

export const InputField: React.FC<{
  icon: any;
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ icon: Icon, label, placeholder, type = 'text', value, onChange }) => (
  <div className="mb-4">
    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">{label}</label>
    <div className="relative flex items-center">
      <div className="absolute left-4 text-slate-400">
        <Icon size={18} />
      </div>
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all text-slate-800 placeholder:text-slate-400 font-medium"
      />
    </div>
  </div>
);

export const ProductCard: React.FC<{ product: Product; onClick?: () => void; index?: number }> = ({ product, onClick, index = 0 }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-[2rem] overflow-hidden shadow-card hover:shadow-xl transition-all active:scale-95 cursor-pointer border border-slate-100 animate-slide-up"
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <div className="relative aspect-square overflow-hidden bg-slate-50">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400">
        <Heart size={16} />
      </button>
    </div>
    <div className="p-4">
      <h3 className="text-sm font-bold text-slate-800 truncate">{product.name}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-lg font-black text-slate-900">{formatINR(product.price)}</span>
        <div className="p-2 bg-brand-bg rounded-full text-brand-orange">
          <ShoppingBag size={18} />
        </div>
      </div>
    </div>
  </div>
);

export const LiveBadge: React.FC = () => (
  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
    </span>
    <span className="text-[10px] font-black tracking-widest text-red-500">LIVE</span>
  </div>
);

export const StreamCard: React.FC<{ stream: Stream; onClick: () => void; index?: number }> = ({ stream, onClick, index = 0 }) => (
  <div 
    onClick={onClick}
    className="relative rounded-[2.5rem] overflow-hidden aspect-[3/4] cursor-pointer shadow-lg group animate-slide-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <img src={stream.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    <div className="absolute top-4 left-4"><LiveBadge /></div>
    <div className="absolute bottom-4 left-4 right-4 text-white">
      <div className="flex items-center gap-2 mb-2">
        <img src={stream.creator.avatar} className="w-6 h-6 rounded-full border border-white" />
        <span className="text-xs font-bold">{stream.creator.name}</span>
      </div>
      <h3 className="font-bold text-sm line-clamp-2">{stream.title}</h3>
    </div>
  </div>
);

/**
 * CATEGORY CARD CODE
 */
export const CategoryIcon: React.FC<{ 
  icon: any; 
  label: string; 
  index?: number;
  onClick?: () => void; // Added click support
}> = ({ icon: Icon, label, index = 0, onClick }) => (
  <div 
    onClick={onClick}
    className="flex flex-col items-center gap-2 cursor-pointer group animate-slide-up"
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-orange group-hover:text-white transition-all group-hover:scale-110 group-hover:shadow-glow-sm">
      <Icon size={24} />
    </div>
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight group-hover:text-brand-orange">{label}</span>
  </div>
);
