import { io } from 'socket.io-client';
const socket = io.connect(process.env.SOCKET_URL);
export default socket;
