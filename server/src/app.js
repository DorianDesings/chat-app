const express = require('express');
const app = express();
const cors = require('cors');
const { v4 } = require('uuid');
const { Server } = require('socket.io');
const server = require('http').Server(app);
const io = new Server(server, {
  cors: {
    origin: '*', // O cambia '*' por la URL de tu aplicación de React
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'] // Corrige el nombre del encabezado
  }
});

io.on('connection', socket => {
  console.log('Cliente conectado');

  // Maneja la solicitud de cambio de colección
  socket.on('client-message', data => {
    const newMessage = {
      id: v4(),
      message: data.message
    };
    io.emit('server-message', newMessage);
  });

  // Maneja la desconexión del cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
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
