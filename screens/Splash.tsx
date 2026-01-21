
import React, { useEffect } from 'react';
import { AppRoute } from '../types';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-brand-orange to-brand-amber flex items-center justify-center overflow-hidden">
      {/* Animated Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-[2rem] shadow-glow flex items-center justify-center text-brand-orange text-5xl font-black animate-slide-up">
          L
        </div>
        <h1 className="mt-6 text-white text-3xl font-black tracking-tight animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Lumina Live
        </h1>
        <p className="mt-2 text-white/70 text-sm font-bold tracking-widest uppercase animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Shop in Real Time
        </p>
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/20 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};
