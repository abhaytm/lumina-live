
import { useEffect, useState, useRef } from 'react';
import { streamSocket } from '../services/socketService';
import { ChatMessage, Product } from '../types';

export const useLiveStream = (streamId: string, token: string) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [viewerCount, setViewerCount] = useState<number>(0);
  const [highlightedProduct, setHighlightedProduct] = useState<Product | null>(null);
  const simulationTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!streamId || !token) return;

    // Only try real socket if it's not a mock token
    if (!token.startsWith('mock_chat_token')) {
      streamSocket.connect(streamId, token);

      const unsubChat = streamSocket.on('chat_message', (msg: ChatMessage) => {
        setChatMessages(prev => [...prev.slice(-50), msg]);
      });

      const unsubViewers = streamSocket.on('viewer_count', (count: number) => {
        setViewerCount(count);
      });

      const unsubProduct = streamSocket.on('product_highlight', (product: Product) => {
        setHighlightedProduct(product);
      });

      return () => {
        unsubChat();
        unsubViewers();
        unsubProduct();
        streamSocket.disconnect();
      };
    } else {
      // SIMULATION MODE for Demo
      setViewerCount(Math.floor(Math.random() * 500) + 800);
      
      const names = ['Emily', 'Marcus', 'Sophia', 'James', 'Mia', 'Jackson', 'Olivia', 'Lucas'];
      const texts = [
        'Love this product!',
        'Is there a discount code?',
        'Just ordered one!',
        'The quality looks amazing.',
        'Shipping to UK?',
        'When is the next drop?',
        'Wow, looks great on stream.',
        'Can we see the details closer?'
      ];

      const simulateChat = () => {
        const randomDelay = Math.random() * 3000 + 2000;
        simulationTimerRef.current = window.setTimeout(() => {
          const newMsg: ChatMessage = {
            id: Date.now().toString(),
            user: names[Math.floor(Math.random() * names.length)],
            text: texts[Math.floor(Math.random() * texts.length)]
          };
          setChatMessages(prev => [...prev.slice(-50), newMsg]);
          setViewerCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
          simulateChat();
        }, randomDelay);
      };

      simulateChat();

      return () => {
        if (simulationTimerRef.current) clearTimeout(simulationTimerRef.current);
      };
    }
  }, [streamId, token]);

  return { 
    chatMessages, 
    viewerCount, 
    highlightedProduct, 
    sendMessage: (txt: string) => {
      if (token.startsWith('mock_chat_token')) {
        const myMsg: ChatMessage = {
          id: Date.now().toString(),
          user: 'You',
          text: txt
        };
        setChatMessages(prev => [...prev.slice(-50), myMsg]);
      } else {
        streamSocket.sendMessage(txt);
      }
    }
  };
};
