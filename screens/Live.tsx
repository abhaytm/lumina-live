
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Heart, ShoppingBag, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { Stream, Product, User } from '../types';
import { useLiveStream } from '../hooks/useLiveStream';
import { LiveService } from '../services/api';
import { MOCK_PRODUCTS } from '../constants';
import { formatINR } from '../utils/currency';

/**
 * UPDATED UI USAGE CODE: Live Offer Price
 */

interface LiveScreenProps {
  stream: Stream;
  currentUser: User;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const LiveScreen: React.FC<LiveScreenProps> = ({ stream, currentUser, onClose, onAddToCart }) => {
  const [inputText, setInputText] = useState('');
  const [hearts, setHearts] = useState<{id: number, left: number}[]>([]);
  const [streamData, setStreamData] = useState<{ chatToken: string } | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const joinStream = async () => {
      const res = await LiveService.join(stream.id);
      if (res.status === 'success') setStreamData(res.data || null);
    };
    joinStream();
  }, [stream.id]);

  const { chatMessages, viewerCount, highlightedProduct, sendMessage } = useLiveStream(
    stream.id, 
    streamData?.chatToken || ''
  );

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMessages]);

  const addHeart = () => {
    const id = Date.now();
    setHearts(prev => [...prev, { id, left: Math.random() * 60 + 20 }]);
    setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 2000);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const activeProduct = highlightedProduct || MOCK_PRODUCTS.find(p => stream.productIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden">
      {/* Background/Video Layer */}
      {!streamData ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-slate-900 text-white z-50">
          <Loader2 className="animate-spin text-brand-orange" size={48} />
          <p className="font-bold tracking-widest text-xs uppercase">Establishing Connection...</p>
        </div>
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <img src={stream.thumbnail} className="w-full h-full object-cover opacity-70 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        </div>
      )}

      {/* Top Controls */}
      <div className="relative z-10 p-6 pt-14 flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl p-1.5 pr-4 rounded-full border border-white/10 w-fit">
            <img src={stream.creator.avatar} className="w-9 h-9 rounded-full border-2 border-brand-orange object-cover" />
            <div className="text-white">
              <p className="text-[10px] font-black uppercase tracking-wider">{stream.creator.name}</p>
              <div className="flex items-center gap-1.5 opacity-80">
                <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                <p className="text-[9px] font-bold">{viewerCount || stream.viewerCount} Viewing</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {stream.tags.map(t => (
              <span key={t} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-black text-white/80 uppercase border border-white/5">#{t}</span>
            ))}
          </div>
        </div>
        <button onClick={onClose} className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white border border-white/20 active:scale-90 transition-transform">
          <X size={24} />
        </button>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-end p-6 pb-12">
        {/* Hearts Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {hearts.map(h => (
            <div key={h.id} className="absolute bottom-40 text-brand-orange animate-float-heart" style={{ left: `${h.left}%` }}>
              <Heart fill="currentColor" size={28} />
            </div>
          ))}
        </div>

        {/* Floating Chat */}
        <div ref={chatRef} className="h-48 overflow-y-auto no-scrollbar space-y-3 w-4/5 mb-8 [mask-image:linear-gradient(to_top,black_85%,transparent)]">
          {chatMessages.length === 0 ? (
            <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-2">Chat started...</div>
          ) : chatMessages.map(m => (
            <div key={m.id} className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl inline-block mr-auto border border-white/10 animate-fade-in shadow-lg">
              <span className="text-brand-amber font-black text-[10px] mr-2 uppercase tracking-tight">{m.user}</span>
              <span className="text-white/90 text-[13px] font-medium leading-relaxed">{m.text}</span>
            </div>
          ))}
        </div>

        {/* Featured Product Toast */}
        {activeProduct && (
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-4 flex items-center gap-4 mb-8 shadow-2xl animate-slide-up border border-white/20">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden shadow-sm shrink-0">
              <img src={activeProduct.image} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest mb-0.5 flex items-center gap-1">
                <Sparkles size={10} /> Live Offer
              </p>
              <p className="text-sm font-black text-slate-800 line-clamp-1">{activeProduct.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-black text-slate-900">{formatINR(activeProduct.price)}</span>
                {activeProduct.originalPrice && (
                   <span className="text-[10px] text-slate-400 line-through font-bold">{formatINR(activeProduct.originalPrice)}</span>
                )}
              </div>
            </div>
            <button 
              onClick={() => onAddToCart(activeProduct)}
              className="bg-brand-orange text-white h-12 px-6 rounded-full text-xs font-black shadow-glow active:scale-95 transition-transform flex items-center gap-2"
            >
              <ShoppingBag size={16} /> BUY
            </button>
          </div>
        )}

        {/* Footer Controls */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 px-5 py-4 flex items-center shadow-lg">
            <MessageCircle size={18} className="text-white/40 mr-3" />
            <input 
              placeholder="Join the conversation..." 
              className="bg-transparent text-white text-sm outline-none w-full placeholder:text-white/40 font-medium"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="text-brand-orange hover:text-brand-amber transition-colors">
              <Send size={20} />
            </button>
          </div>
          <button onClick={addHeart} className="w-14 h-14 bg-gradient-live rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
            <Heart fill="white" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
