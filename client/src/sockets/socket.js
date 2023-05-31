import { io } from 'socket.io-client';
const socket = io.connect(process.env.VITE_SOCKET_URL);
export default socket;
