const { v4 } = require('uuid');
// Array para almacenar los usuarios conectados
const connectedUsers = [];

// Función para establecer la conexión del socket y gestionar los eventos
const establishSocketConnection = (socket, io) => {
  console.log('Cliente conectado');

  // Maneja la solicitud de cambio de colección
  socket.on('client-message', data => {
    handleMessage(socket, io, data);
  });

  // Maneja la desconexión del cliente
  socket.on('disconnect', () => {
    handleDisconnect(socket, io);
  });

  // Maneja la solicitud de nombre de usuario
  socket.on('set-username', username => {
    handleSetUsername(socket, username, io);
  });
};

// Función para manejar los mensajes del cliente y emitirlos al servidor
const handleMessage = (socket, io, data) => {
  const newMessage = {
    id: v4(),
    message: data.message,
    username: getUsername(socket.id) // Obtiene el nombre de usuario asociado al socket
  };
  io.emit('server-message', newMessage);
};

// Función para manejar la desconexión del cliente
const handleDisconnect = (socket, io) => {
  console.log('Cliente desconectado');

  // Remueve al usuario del array de usuarios conectados al desconectarse
  const userIndex = connectedUsers.findIndex(
    user => user.socketId === socket.id
  );
  if (userIndex !== -1) {
    connectedUsers.splice(userIndex, 1);
    io.emit('users-in-chat', connectedUsers);
  }
};

// Función para manejar la solicitud de nombre de usuario
const handleSetUsername = (socket, username, io) => {
  console.log(username);
  // Agrega al usuario al array de usuarios conectados
  connectedUsers.push({ socketId: socket.id, username });

  io.emit('users-in-chat', connectedUsers);
  // console.log(socket, username);
};

// Función para obtener el nombre de usuario asociado a un socket
const getUsername = socketId => {
  const user = connectedUsers.find(user => user.socketId === socketId);
  return user ? user.username : null;
};
// Exporta las funciones y el array de usuarios conectados para usarlos en otros archivos
module.exports = {
  establishSocketConnection,
  connectedUsers
};
