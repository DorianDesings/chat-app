import { io } from 'socket.io-client';
const socket = io.connect('https://server-chat-a9q7.onrender.com/');
export default socket;
