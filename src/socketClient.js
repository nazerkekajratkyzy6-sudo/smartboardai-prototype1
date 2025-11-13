import { io } from 'socket.io-client';
const SOCKET_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://your-socket-server.example.com';
const socket = io(SOCKET_URL, { autoConnect: true });
export default socket;
