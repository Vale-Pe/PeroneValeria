const express = require('express')
const PORT = process.env.port || 8080
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.use(express.static('./public'))

// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

//variable donde voy a guardar los mensajes

const date = new Date()
const formatDate = date.toLocaleString();

const messages = [
    { author: "Juan", date: formatDate, text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", date: formatDate, text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", date: formatDate, text: "¡Genial!" }
];

const products = [
	{ nombre: "Escuadra", precio: 200, foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png" },
	{ nombre: "calculadora", precio: 459, foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png" },
	{ nombre: "agenda", precio: 150, foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-128.png" }
];

io.on('connection', (socket) => { // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Nuevo cliente conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    

    socket.emit('products', products);
	
	socket.on('new-product', data => {
        products.push(data);
        io.sockets.emit('products', products); //envia todos los mensajes a todos los usuarios
    });

	//cuando alguien se conecta le llegan todos los mensjaes
    socket.emit('messages', messages);

//evento que va a estar escuchando cuando manden un mensaje
    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages); //envia todos los mensajes a todos los usuarios
    });
})


// El servidor funcionando en el puerto 8080
httpServer.listen(PORT, () => console.log('Servidor corriendo en http://localhost:8080'))
