const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))

//variable donde voy a guardar los mensajes
const mensajes = [];

// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

// El servidor funcionando en el puerto 8080
httpServer.listen(8080, () => console.log('SERVER ON'))

io.on('connection', (socket) => { // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Nuevo cliente conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    

    //cuando alguien se conecta le llegan todos los mensjaes
    socket.emit('mensajes', mensajes);

    //evento que va a estar escuchando cuando manden un mensaje
    socket.on('mensaje', (data) => {
        mensajes.push({ socketId: socket.id, mensaje: data });
        console.log(mensajes)
        io.sockets.emit('mensajes', mensajes)
    })
})

