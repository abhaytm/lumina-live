
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { User } from '../types';
import { TopBar } from '../components/Layout';
import { GradientButton } from '../components/UI';
import { Play, TrendingUp, Users, DollarSign } from 'lucide-react';
import { formatINR } from '../utils/currency';

/**
 * UPDATED UI USAGE CODE: Creator Dashboard Revenue
 */

const data = [
  { name: 'Mon', sales: 240000 },
  { name: 'Tue', sales: 139800 },
  { name: 'Wed', sales: 980000 },
  { name: 'Thu', sales: 390800 },
  { name: 'Fri', sales: 480000 },
  { name: 'Sat', sales: 380000 },
  { name: 'Sun', sales: 430000 },
];

export const CreatorDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="pb-24 pt-24 bg-slate-50 min-h-full">
      <TopBar title="Creator Studio" />
      <div className="px-6">
        <div className="bg-slate-900 rounded-[3rem] p-8 text-white mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange rounded-full blur-[60px] opacity-20" />
          <div className="relative z-10">
            <p className="text-white/50 text-[10px] uppercase font-black tracking-widest mb-1">Live Status</p>
            <h2 className="text-2xl font-black mb-6">Ready to Stream?</h2>
            <div className="flex gap-3">
              <GradientButton className="flex-1 !py-3">
                <Play fill="currentColor" size={16} /> Go Live
              </GradientButton>
              <button className="flex-1 bg-white/10 backdrop-blur rounded-full border border-white/10 font-bold text-sm">Schedule</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: 'Revenue', value: formatINR(12450000), icon: DollarSign, color: 'text-orange-500' },
            { label: 'Followers', value: '4.2k', icon: Users, color: 'text-blue-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <stat.icon className={`${stat.color} mb-3`} size={20} />
              <p className="text-[10px] font-black text-slate-400 uppercase">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-slate-800 text-sm uppercase">Weekly Sales</h3>
            <TrendingUp className="text-green-500" size={18} />
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  formatter={(value: number) => [formatINR(value), 'Sales']}
                />
                <Area type="monotone" dataKey="sales" stroke="#FF6B00" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
