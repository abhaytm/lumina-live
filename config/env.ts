
const isProd = typeof window !== 'undefined' && 
  window.location.hostname !== 'localhost' && 
  window.location.hostname !== '127.0.0.1';

export const ENV = {
  // Replace with your actual public backend URL after deployment
  API_URL: isProd 
    ? 'https://lumina-backend-production.up.railway.app/v1' 
    : 'http://localhost:3000/v1',
  WS_URL: isProd 
    ? 'wss://lumina-backend-production.up.railway.app' 
    : 'ws://localhost:3000',
  IVS_PLAYER_URL: 'https://player.live-video.net/1.24.0/amazon-ivs-player.min.js',
  RETRY_ATTEMPTS: 3,
  TIMEOUT: 15000,
};
