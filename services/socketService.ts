
import { ChatMessage, Product } from '../types';

type EventType = 'chat_message' | 'viewer_count' | 'product_highlight';
type Callback = (data: any) => void;

class SocketService {
  private ws: WebSocket | null = null;
  private listeners: Map<EventType, Set<Callback>> = new Map();

  connect(streamId: string, token: string) {
    if (this.ws) this.disconnect();
    
    const url = `wss://ws.luminalive.com/v1/live/${streamId}?token=${token}`;
    this.ws = new WebSocket(url);

    this.ws.onmessage = (event) => {
      try {
        const { type, data } = JSON.parse(event.data);
        this.notify(type as EventType, data);
      } catch (e) { console.error('Socket Parse Error', e); }
    };

    this.ws.onclose = () => {
      console.log('Socket Closed');
    };
  }

  on(type: EventType, callback: Callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)?.add(callback);
    return () => this.listeners.get(type)?.delete(callback);
  }

  private notify(type: EventType, data: any) {
    this.listeners.get(type)?.forEach(cb => cb(data));
  }

  sendMessage(text: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'chat_message', text }));
    }
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
  }
}

export const streamSocket = new SocketService();
