
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Tag, DollarSign, Upload, Video, Check, Info } from 'lucide-react';
import { TopBar } from '../components/Layout';
import { GradientButton, InputField } from '../components/UI';
import { AppRoute, Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { ApiService } from '../services/api';

interface CreatorScreenProps {
  onNavigate: (route: AppRoute) => void;
  onBack?: () => void;
}

export const AddProductScreen: React.FC<CreatorScreenProps> = ({ onNavigate, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    onNavigate(AppRoute.CREATOR_DASHBOARD);
  };

  return (
    <div className="pb-20 bg-white min-h-full">
      <TopBar title="Add Product" onBack={onBack} />
      
      <div className="px-6 mt-24 animate-slide-up">
        <div className="w-full aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center mb-6 cursor-pointer hover:border-orange-300 transition-colors group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="text-slate-400 group-hover:text-brand-orange" size={24} />
            </div>
            <p className="mt-4 text-sm font-bold text-slate-400 group-hover:text-brand-orange">Upload Product Image</p>
        </div>

        <div className="space-y-2">
            <InputField icon={Tag} label="Product Name" placeholder="e.g. Summer Hoodie" />
            <InputField icon={DollarSign} label="Price" placeholder="0.00" type="number" />
            
            <div className="mb-4">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Description</label>
                <textarea 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all text-slate-800 placeholder:text-slate-400 font-medium min-h-[100px]"
                    placeholder="Describe your product..."
                ></textarea>
            </div>
        </div>

        <div className="mt-8">
            <GradientButton fullWidth onClick={handleSave} isLoading={isLoading}>
                Save Product
            </GradientButton>
        </div>
      </div>
    </div>
  );
};

export const StartLiveScreen: React.FC<CreatorScreenProps> = ({ onNavigate, onBack }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    setupCamera();
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const handleStart = async () => {
    setIsStarting(true);
    // Fix: Corrected ApiService call to streams.start (LiveService)
    const response = await ApiService.streams.start("My Awesome Stream", selectedProducts);
    if (response.status === 'success') {
      onNavigate(AppRoute.CREATOR_DASHBOARD);
    }
    setIsStarting(false);
  };

  return (
    <div className="pb-20 h-full flex flex-col bg-slate-900 overflow-hidden">
      <TopBar title="Go Live" onBack={onBack} transparent />
      
      <div className="flex-1 relative">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 mb-4">
                <InputField 
                    icon={Info} 
                    label="Stream Title" 
                    placeholder="Summer Fashion Drop" 
                />

                <div className="mt-4">
                    <label className="block text-xs font-bold text-white/50 uppercase mb-3 ml-1">Featured Products ({selectedProducts.length})</label>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {MOCK_PRODUCTS.map(p => {
                            const isSelected = selectedProducts.includes(p.id);
                            return (
                                <div 
                                    key={p.id} 
                                    onClick={() => toggleProduct(p.id)}
                                    className={`relative min-w-[80px] aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${isSelected ? 'border-brand-orange scale-95' : 'border-transparent opacity-60'}`}
                                >
                                    <img src={p.image} className="w-full h-full object-cover" />
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-brand-orange/20 flex items-center justify-center">
                                            <Check size={24} className="text-white" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <GradientButton fullWidth onClick={handleStart} isLoading={isStarting} className="h-16 text-lg">
                <Video size={24} /> GO LIVE NOW
            </GradientButton>
        </div>
      </div>
    </div>
  );
};
