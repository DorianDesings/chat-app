const express = require('express');
const app = express();
const cors = require('cors');

const { Server } = require('socket.io');
const {
  establishSocketConnection
} = require('../socket-controller/socket-controller');
const server = require('http').Server(app);
const io = new Server(server, {
  cors: {
    origin: '*', // O cambia '*' por la URL de tu aplicación de React
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'] // Corrige el nombre del encabezado
  }
});

// Importa el módulo socketController

// Lógica de tu servidor de sockets
io.on('connection', socket => {
  // Pasa el objeto socket y io a la función establishSocketConnection
  establishSocketConnection(socket, io);
});

// Rutas

// Middlewares para cliente
app.use(cors());
app.use(express.json());

// Uso de rutas

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));
server.listen(4000, () => {
  console.log(`Servidor Socket.io escuchando en el puerto 4000`);
});
