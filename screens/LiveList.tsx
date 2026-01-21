
import React from 'react';
import { Video, Search, Flame } from 'lucide-react';
import { Stream } from '../types';
import { MOCK_STREAMS } from '../constants';
import { TopBar } from '../components/Layout';
import { StreamCard } from '../components/UI';

export const LiveListScreen: React.FC<{ onOpenStream: (s: Stream) => void }> = ({ onOpenStream }) => {
  return (
    <div className="pb-24 pt-24 bg-slate-50 min-h-full">
      <TopBar title="Live Feed" rightAction={<Search size={20} className="text-slate-400" />} />
      
      <div className="px-6 mb-8">
        <div className="bg-gradient-live p-6 rounded-[2.5rem] text-white flex items-center justify-between shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={18} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-widest">Trending Live</span>
            </div>
            <h2 className="text-xl font-black">Flash Sales Today</h2>
            <p className="text-white/70 text-xs mt-1">Don't miss out on exclusive drops</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full blur-2xl absolute -right-4 -top-4"></div>
        </div>
      </div>

      <div className="px-6">
        <div className="flex items-center gap-2 mb-6">
          <Video className="text-brand-orange" size={20} />
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Showrooms</h3>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {MOCK_STREAMS.map((s, i) => (
            <StreamCard key={s.id} stream={s} index={i} onClick={() => onOpenStream(s)} />
          ))}
        </div>

        {MOCK_STREAMS.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Video className="text-slate-300" size={32} />
            </div>
            <p className="text-slate-400 font-bold">No active streams</p>
            <p className="text-slate-400 text-xs mt-1">Check back soon for new shows!</p>
          </div>
        )}
      </div>
    </div>
  );
};
