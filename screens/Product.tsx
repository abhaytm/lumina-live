
import React from 'react';
import { Share2, Heart, ArrowLeft, Star, ShoppingBag } from 'lucide-react';
import { Product, AppRoute } from '../types';
import { TopBar } from '../components/Layout';
import { GradientButton } from '../components/UI';
import { formatINR } from '../utils/currency';

/**
 * UPDATED UI USAGE CODE: ProductDetail
 */

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => (
  <div className="bg-white min-h-full pb-32 animate-slide-up">
    {/* Immersive Header */}
    <div className="relative h-[50vh] overflow-hidden">
      <img src={product.image} className="w-full h-full object-cover animate-scale-in" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
      
      <div className="absolute top-12 left-0 right-0 px-4 flex justify-between z-10">
        <button onClick={onBack} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
          <ArrowLeft size={20} strokeWidth={3} />
        </button>
        <div className="flex gap-2">
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
            <Share2 size={20} />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
            <Heart size={20} />
          </button>
        </div>
      </div>
      
      {/* Curved Edge Decor */}
      <div className="absolute -bottom-1 left-0 right-0 h-10 bg-white rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]"></div>
    </div>

    <div className="px-6 -mt-4 relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight mb-1">{product.name}</h1>
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-500">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="none" />
            </div>
            <span className="text-xs font-bold text-slate-400">4.8 (124 reviews)</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black text-brand-orange">{formatINR(product.price)}</span>
          {product.originalPrice && (
            <div className="text-sm text-slate-300 line-through font-bold">{formatINR(product.originalPrice)}</div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <div className="px-4 py-2 bg-orange-50 rounded-2xl border border-orange-100">
          <p className="text-[10px] font-bold text-orange-500 uppercase">FREE DELIVERY</p>
        </div>
        <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase">7 DAYS RETURN</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-slate-900 text-lg mb-2">About Product</h3>
        <p className="text-slate-500 leading-relaxed text-sm">
          {product.description || "Elevate your style with this premium piece. Crafted with high-quality materials to ensure durability and comfort. Perfect for everyday wear or special occasions."}
        </p>
      </div>

      {/* Related Products Section */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-900 text-lg mb-4">You might also like</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
           {[1,2,3].map(i => (
             <div key={i} className="min-w-[140px] bg-slate-50 rounded-2xl p-3">
                <img src={`https://picsum.photos/seed/rel${i}/200/200`} className="w-full aspect-square rounded-xl object-cover mb-2" />
                <p className="text-xs font-bold text-slate-800 line-clamp-1">Urban Gear {i}</p>
                <p className="text-xs font-bold text-brand-orange mt-1">{formatINR(249900)}</p>
             </div>
           ))}
        </div>
      </div>
    </div>

    {/* Bottom Sticky Action */}
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-50">
      <div className="flex gap-4">
        <button className="p-4 bg-slate-100 rounded-2xl text-slate-500 hover:bg-slate-200 transition-colors">
          <Heart size={24} />
        </button>
        <GradientButton fullWidth onClick={() => onAddToCart(product)}>
          <ShoppingBag size={20} /> Add to Cart
        </GradientButton>
      </div>
    </div>
  </div>
);
