
import React from 'react';
import { Settings, BarChart2, Package, MapPin, Heart, LogOut, ChevronRight, Star, Plus, Video } from 'lucide-react';
import { User, AppRoute } from '../types';
import { TopBar } from '../components/Layout';
import { GradientButton } from '../components/UI';

interface ProfileProps {
  user: User;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileProps> = ({ user, onNavigate, onLogout }) => {
  const menuItems = [
    { icon: Package, label: 'My Orders', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: MapPin, label: 'Addresses', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: Heart, label: 'Wishlist', color: 'text-red-500', bg: 'bg-red-50' },
    { icon: Star, label: 'My Reviews', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Settings, label: 'Settings', color: 'text-slate-500', bg: 'bg-slate-50' },
  ];

  return (
    <div className="pb-24 animate-fade-in bg-slate-50 min-h-full">
      <TopBar title="Profile" rightAction={<Settings size={20} className="text-slate-500" />} />
      
      <div className="px-6 pt-24">
        {/* User Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-4 mb-8">
          <div className="relative">
             <img src={user.avatar} className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover" />
             <div className="absolute bottom-0 right-0 w-6 h-6 bg-brand-orange border-2 border-white rounded-full flex items-center justify-center text-white">
                <Settings size={12} fill="currentColor" />
             </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Premium Member</p>
          </div>
        </div>

        {/* Creator Portal Section */}
        {user.isCreator && (
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">Creator Hub</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button 
                onClick={() => onNavigate(AppRoute.CREATOR_DASHBOARD)}
                className="bg-slate-900 text-white p-5 rounded-3xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
              >
                <BarChart2 size={24} className="text-orange-400" />
                <span className="text-xs font-bold">Studio</span>
              </button>
              <button 
                onClick={() => onNavigate(AppRoute.START_LIVE)}
                className="bg-gradient-primary text-white p-5 rounded-3xl flex flex-col items-center justify-center gap-2 shadow-glow-sm active:scale-95 transition-all"
              >
                <Video size={24} />
                <span className="text-xs font-bold">Go Live</span>
              </button>
            </div>
            <button 
              onClick={() => onNavigate(AppRoute.ADD_PRODUCT)}
              className="w-full bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-center gap-2 text-slate-600 font-bold active:scale-[0.98] transition-all"
            >
              <Plus size={20} className="text-brand-orange" /> Add New Product
            </button>
          </div>
        )}

        {/* Account Menu */}
        <div className="mb-8">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">Account</h3>
           <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm">
              {menuItems.map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between p-5 active:bg-slate-50 transition-colors cursor-pointer ${i !== menuItems.length - 1 ? 'border-b border-slate-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-bold text-slate-700">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </div>
              ))}
           </div>
        </div>

        {/* Logout */}
        <button 
          onClick={onLogout}
          className="w-full p-5 bg-red-50 text-red-500 rounded-[2.5rem] flex items-center justify-center gap-2 font-black active:bg-red-100 transition-colors mb-8"
        >
          <LogOut size={20} /> Sign Out
        </button>
      </div>
    </div>
  );
};
