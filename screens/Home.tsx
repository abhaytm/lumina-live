
import React, { useEffect, useState } from 'react';
import { ShoppingBag, Search, Bell, ArrowRight, Loader2, Sparkles, RefreshCcw } from 'lucide-react';
import { AppRoute, Stream, Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import { ProductService, LiveService } from '../services/api';
import { CategoryIcon, ProductCard, StreamCard } from '../components/UI';
import { AIAssistant } from '../components/AIAssistant';

interface HomeProps {
  onNavigate: (r: AppRoute) => void;
  onOpenStream: (s: Stream) => void;
  onProductClick: (p: Product) => void;
  onCategoryClick: (c: Category) => void; // Added for navigation
}

export const HomeScreen: React.FC<HomeProps> = ({ onNavigate, onOpenStream, onProductClick, onCategoryClick }) => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [sRes, pRes] = await Promise.all([
        LiveService.listActive(),
        ProductService.trending()
      ]);

      if (sRes.status === 'success') setStreams(sRes.data || []);
      if (pRes.status === 'success') setProducts(pRes.data || []);
      
      if (sRes.status === 'success' && (!sRes.data || sRes.data.length === 0) && (!pRes.data || pRes.data.length === 0)) {
         setError("Syncing latest collection...");
      }
    } catch (err) {
      setError("Network connectivity issue.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full bg-white">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-100 border-t-brand-orange rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="text-brand-orange animate-pulse" size={24} />
          </div>
        </div>
        <p className="mt-6 text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] animate-pulse">Lumina Syncing...</p>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-slate-50 min-h-full animate-fade-in">
      <div className="px-6 pt-14 pb-4 flex justify-between items-center bg-white/80 backdrop-blur-xl sticky top-0 z-30 border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-black shadow-glow-sm">L</div>
          <div>
            <h1 className="text-lg font-black text-slate-800 leading-tight tracking-tight">Lumina</h1>
            <p className="text-[9px] font-black text-brand-orange uppercase tracking-widest">Live Experience</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-brand-orange transition-colors">
             <Bell size={20} />
           </button>
           <button onClick={loadData} className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-brand-orange transition-colors">
             <RefreshCcw size={20} />
           </button>
        </div>
      </div>

      {error && !products.length && (
        <div className="m-6 p-5 bg-gradient-primary rounded-[2rem] text-white flex justify-between items-center shadow-glow">
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-80">Connectivity</p>
            <p className="text-sm font-bold">{error}</p>
          </div>
          <button onClick={loadData} className="bg-white text-brand-orange px-4 py-2 rounded-full text-xs font-black shadow-lg active:scale-95">RETRY</button>
        </div>
      )}

      <div className="mt-8 px-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Live Now</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{streams.length} Active Shows</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate(AppRoute.LIVE_LIST)}
            className="text-[10px] font-black text-brand-orange uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
          >
            See All <ArrowRight size={12} />
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
          {streams.map((s, i) => (
            <div key={s.id} className="min-w-[200px]">
              <StreamCard stream={s} onClick={() => onOpenStream(s)} index={i} />
            </div>
          ))}
          {streams.length === 0 && !isLoading && (
            <div className="w-full py-12 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center">
              <Sparkles className="text-slate-200 mb-3" size={32} />
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">More shows coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* HOME / EXPLORE CATEGORY LIST CODE */}
      <div className="mt-12 px-6">
        <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Explore Categories</h3>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat, i) => (
            <CategoryIcon 
              key={cat.id} 
              icon={ShoppingBag} 
              label={cat.name} 
              index={i} 
              onClick={() => onCategoryClick(cat)} // Trigger navigation
            />
          ))}
        </div>
      </div>

      <div className="mt-12 px-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Trending Items</h3>
          <span className="px-3 py-1 bg-brand-bg text-brand-orange text-[10px] font-black rounded-full uppercase tracking-tighter">New Arrivals</span>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} index={i} />
          ))}
        </div>
      </div>

      <AIAssistant />
    </div>
  );
};
