const socket = io.connect(); // Ya podemos empezar a usar los sockets desde el cliente :

//evento para enviar mensaje
const input = document.querySelector('input');

const button = document.querySelector('button').addEventListener('click', () => {
    socket.emit('mensaje', input.value)
});

socket.on('mensajes', (data) => {
    const mensajes = data.map( (msj) =>  `SocketId: ${msj.socketId} -> Mensaje: ${msj.mensaje}`).join('<br>');
    document.querySelector('p').innerHTML = mensajes;
})