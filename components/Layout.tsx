
import React from 'react';
import { Home, Grid, Video, ShoppingCart, User } from 'lucide-react';
import { AppRoute } from '../types';

interface BottomNavProps {
  currentRoute: string;
  onNavigate: (route: AppRoute) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate, cartCount }) => {
  const navItems = [
    { id: AppRoute.HOME, icon: Home, label: 'Home' },
    { id: AppRoute.CATEGORIES, icon: Grid, label: 'Catalog' },
    { id: AppRoute.LIVE_LIST, icon: Video, label: 'Live' },
    { id: AppRoute.CART, icon: ShoppingCart, label: 'Cart', badge: cartCount },
    { id: AppRoute.PROFILE, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 py-2 px-6 pb-6 z-50">
       <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = currentRoute === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center gap-1 transition-colors duration-300 ${
                isActive ? 'text-brand-orange' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-orange-50' : ''}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.badge ? (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
       </div>
    </div>
  );
};

export const MobileWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center font-sans text-slate-800"
      style={{ backgroundColor: '#f1f5f9' }}
    >
      <div 
        className="w-full max-w-md h-screen md:h-[850px] bg-white relative overflow-hidden flex flex-col"
        style={{ 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderRadius: window.innerWidth > 768 ? '3rem' : '0'
        }}
      >
        {/* Notch simulation for desktop view */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-3xl z-[60]"></div>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-20 bg-slate-50 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export const TopBar: React.FC<{ title?: string; rightAction?: React.ReactNode, transparent?: boolean, onBack?: () => void }> = ({ title, rightAction, transparent, onBack }) => (
  <div className={`absolute top-0 left-0 right-0 z-40 px-4 pt-12 pb-4 flex items-center justify-between ${transparent ? 'bg-transparent text-white' : 'bg-white/80 backdrop-blur-md text-slate-800'}`}>
    {onBack ? (
       <button onClick={onBack} className={`p-2 rounded-full ${transparent ? 'bg-black/20 hover:bg-black/30' : 'hover:bg-slate-100'}`}>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
       </button>
    ) : (
      <div className="w-10">
        {!title && <div className="w-8 h-8 rounded-full bg-brand-orange shadow-glow-sm"></div>}
      </div>
    )}
    
    {title && <h1 className="text-lg font-bold">{title}</h1>}
    
    <div className="w-10 flex justify-end">
      {rightAction}
    </div>
  </div>
);
