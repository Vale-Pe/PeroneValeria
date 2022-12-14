const express = require('express')
const app = express()
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const PORT = process.env.port || 8080

//db
const { options_MySQL } = require('./options/mariaDB')
const knex = require('knex')(options_MySQL)
/* console.log(options_MySQL) */
/* console.log(mariaDB.options_MySQL) */
/* const SQLite3 = require('./options/SQLite3') */

//Clases
const ContenedorProductos = require('./Class/products_class')
const contenedorProductos = new ContenedorProductos( options_MySQL , 'productos')

const ContenedorMensajes = require('./Class/messages_class')
const contenedorMensajes = new ContenedorMensajes ()

//Ruta estatica
app.use(express.static('./public')) // Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
}) // Esta ruta carga nuestro archivo index.html en la raíz de la misma

//Server
const httpServer = new HttpServer(app)

const io = new IOServer(httpServer)
app.set("socketio", io);

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`)) // El servidor funcionando en el puerto 8080

//Sockets
io.on('connection', async (socket) => { // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Nuevo cliente conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    

    //PRODUCTOS
    socket.emit('server:productos', await contenedorProductos.getAll()); //cuando alguien se conecta le llegan todos los productos
	
	/* socket.on('new-product', data */ 
    socket.on('cliente:producto', producto => { //evento que va a estar escuchando cuando carguen un producto
        console.log(producto)
        contenedorProductos.save(producto)
        io.emit('server:productos', contenedorProductos.getAll()) //envia todos los productos a todos los usuarios
    });

    //MENSAJES
    socket.emit('server:mensajes', await contenedorMensajes.getAll()); //cuando alguien se conecta le llegan todos los mensajes

    socket.on('cliente:mensaje', mensaje => { //evento que va a estar escuchando cuando carguen un mensaje
        console.log(mensaje)
        contenedorMensajes.save(mensaje)
        io.emit('server:mensajes', contenedorMensajes.getAll()) //envia todos los mensajes a todos los usuarios
    });
})