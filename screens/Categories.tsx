
import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Loader2, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import { TopBar } from '../components/Layout';
import { ProductCard } from '../components/UI';
import { ProductService } from '../services/api';

/**
 * CATEGORY PRODUCTS SCREEN CODE
 */
interface CategoriesScreenProps {
  initialCategoryId?: string | null;
  onProductClick: (p: Product) => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ initialCategoryId, onProductClick }) => {
  const [activeTab, setActiveTab] = useState(initialCategoryId || 'all');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Re-sync activeTab if initialCategoryId changes (e.g. from Home deep link)
  useEffect(() => {
    if (initialCategoryId) setActiveTab(initialCategoryId);
  }, [initialCategoryId]);

  /**
   * CATEGORY API INTEGRATION CODE
   */
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      // Fetch products by category or all trending if 'all' selected
      const response = activeTab === 'all' 
        ? await ProductService.trending() 
        : await ProductService.list({ categoryId: activeTab });

      if (response.status === 'success') {
        // Filter result to ensure we match the activeTab locally for consistency
        const items = response.data || [];
        setProducts(activeTab === 'all' ? items : items.filter(p => p.categoryId === activeTab));
      }
      setIsLoading(false);
    };

    fetchCategoryProducts();
  }, [activeTab]);

  return (
    <div className="pb-24 pt-24 bg-slate-50 min-h-full">
      <TopBar title="Catalog" rightAction={<Search size={20} className="text-slate-400" />} />
      
      <div className="sticky top-20 z-30 bg-slate-50/80 backdrop-blur-md px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'all' ? 'bg-brand-orange text-white shadow-glow-sm' : 'bg-white text-slate-500 border border-slate-200'}`}
        >
          All Items
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeTab === cat.id ? 'bg-brand-orange text-white shadow-glow-sm' : 'bg-white text-slate-500 border border-slate-200'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="px-6 mt-4">
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {isLoading ? 'Fetching items...' : `${products.length} Results Found`}
          </p>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs">
            <SlidersHorizontal size={14} /> Filter
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-orange mb-4" size={32} />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Updating Catalog</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-5">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onClick={() => onProductClick(p)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
             <Sparkles className="text-slate-200 mb-4" size={40} />
             <h4 className="text-sm font-black text-slate-800 uppercase">Coming Soon</h4>
             <p className="text-xs font-bold text-slate-400 mt-2 px-8">We are curating more premium items for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
