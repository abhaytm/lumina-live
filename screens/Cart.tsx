
import React from 'react';
import { ShoppingBag, Trash2, ArrowLeft, Plus, Minus, CreditCard } from 'lucide-react';
import { CartItem, AppRoute } from '../types';
import { TopBar } from '../components/Layout';
import { GradientButton } from '../components/UI';
import { formatINR } from '../utils/currency';

/**
 * UPDATED UI USAGE CODE: Cart Screen
 */

interface CartProps {
  items: CartItem[];
  onBack: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

export const CartScreen: React.FC<CartProps> = ({ items, onBack, onRemove, onUpdateQty }) => {
  // Calculations done in minor units (paise)
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 49900 : 0; // ₹499.00 fixed shipping
  const total = subtotal + shipping;

  return (
    <div className="min-h-full bg-slate-50 flex flex-col pb-32">
      <TopBar title="Shopping Cart" onBack={onBack} />
      
      <div className="px-6 pt-24 flex-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
              <ShoppingBag size={40} className="text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty</h3>
            <p className="text-slate-400 text-sm max-w-[200px] mb-8">Looks like you haven't added anything to your cart yet.</p>
            <GradientButton onClick={onBack}>Explore Products</GradientButton>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {items.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-3xl flex gap-4 shadow-sm border border-slate-100">
                <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-brand-orange text-lg">{formatINR(item.price)}</span>
                    <div className="flex items-center gap-3 bg-slate-50 rounded-full p-1 px-2 border border-slate-100">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 text-slate-400 hover:text-slate-600">
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="text-sm font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 text-slate-400 hover:text-slate-600">
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Price Summary */}
            <div className="mt-8 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-slate-800 font-bold">{formatINR(subtotal)}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Shipping</span>
                  <span className="text-slate-800 font-bold">{formatINR(shipping)}</span>
               </div>
               <div className="h-px bg-slate-100 w-full my-2"></div>
               <div className="flex justify-between items-center">
                  <span className="text-slate-800 font-bold">Total Amount</span>
                  <span className="text-2xl font-black text-slate-900">{formatINR(total)}</span>
               </div>
            </div>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 max-w-md mx-auto z-50">
          <GradientButton fullWidth>
            <CreditCard size={18} /> Checkout Securely
          </GradientButton>
        </div>
      )}
    </div>
  );
};
