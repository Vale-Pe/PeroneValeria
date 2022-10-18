const express = require(`express`)
const app = express()
const { Server: IOServer } = require('socket.io')
const PORT = process.env.port || 8080
const database = require("./databasemysql")
const database2 = require("./databasesqlite")

//const io = new IOServer(expressServer)

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))

// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

//CLASES
const ContenedorProductos = require('./Class/productosClass')
const contenedorProductos = new ContenedorProductos(database.databaseConnectionMysql, 'products')

console.log(contenedorProductos)

const ContenedorChat = require('./Class/chatClass')
const contenedorChat = new ContenedorChat(database2.databaseConnectionSqlite, 'messages')

console.log(contenedorChat)

//RUTA ESTATICA
app.use(express.static(__dirname + `/../public`))

//SERVER
const expressServer = app.listen(PORT, (error) => {
    if (error) {
        console.log(`Hubo un error al iniciar el servidor: ${error}`)
    } else {
        console.log(`Servidor escuchando puerto ${PORT}`)
    }
})

const date = new Date()
const formatDate = date.toLocaleString();

const product = [
    { username: "Juan", date: formatDate, message: "¡Hola! ¿Que tal?" },
    { username: "Pedro", date: formatDate, message: "¡Muy bien! ¿Y vos?" },
    { username: "Ana", date: formatDate, message: "¡Genial!" }
];

const messages = [
	{ productName: "Escuadra", productPrice: 200, productUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png" },
	{ productName: "calculadora", productPrice: 459, productUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png" },
	{ productName: "agenda", productPrice: 150, productUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-128.png" }
];

const io = new IOServer(expressServer)

//SOCKETS
io.on('connection', (socket) => {
    console.log('Se conectó el cliente con id: ', socket.id)

    //PRODUCTOS
    socket.emit('server:productos', contenedorProductos.getAll())
    //socket.emit('server:productos', products)
    socket.on('cliente:producto', productoInfo => {
        contenedorProductos.save(productoInfo)
        io.sockets.emit('server:productos', contenedorProductos.getAll())
    })

    //CHAT
    socket.emit('server:mensajes', contenedorChat.getAll())
    //socket.emit('server:mensajes', messages)
    socket.on('cliente:mensaje', mensaje => {
        contenedorChat.save(mensaje)
        io.sockets.emit('server:mensajes', contenedorChat.getAll())
    })
})