
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { GeminiService } from '../services/geminiService';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hi! I'm Lumina. Looking for something specific today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const botResponse = await GeminiService.getShoppingAssistantResponse(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse || "I couldn't find an answer for that." }]);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-primary rounded-full shadow-glow flex items-center justify-center text-white z-40 active:scale-90 transition-transform"
      >
        <Sparkles size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-end justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl flex flex-col h-[70vh] animate-slide-up">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-orange">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800">Lumina AI</h3>
                  <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Always Active</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400"><X size={24} /></button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium ${
                    m.role === 'user' 
                    ? 'bg-brand-orange text-white rounded-tr-none shadow-glow-sm' 
                    : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 p-4 rounded-3xl rounded-tl-none border border-slate-100 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100">
              <div className="bg-slate-50 rounded-full px-5 py-3 flex items-center gap-3 border border-slate-200">
                <input 
                  placeholder="Ask Lumina anything..." 
                  className="flex-1 bg-transparent outline-none text-sm font-medium"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="text-brand-orange"><Send size={20} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
