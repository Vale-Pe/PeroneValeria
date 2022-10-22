const express = require('express')
const app = express()
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const PORT = process.env.port || 8080

//db
const { options_MySQL } = require('./options/mariaDB')
/* console.log(options_MySQL) */
/* console.log(mariaDB.options_MySQL) */
/* const SQLite3 = require('./options/SQLite3') */

//Clases
const ContenedorProductos = require('./Class/products_class')
const contenedorProductos = new ContenedorProductos( options_MySQL , 'productos')

//Ruta estatica
app.use(express.static('./public')) // Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta

app.set("socketio", io);

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
}) // Esta ruta carga nuestro archivo index.html en la raíz de la misma

//Server
const httpServer = new HttpServer(app)

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`)) // El servidor funcionando en el puerto 8080

const io = new IOServer(httpServer)

//Sockets
io.on('connection', (socket) => { // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Nuevo cliente conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    

    //PRODUCTOS
    socket.emit('server:productos', contenedorProductos.getAll()); //cuando alguien se conecta le llegan todos los productos
	
	/* socket.on('new-product', data */ 
    socket.on('cliente:producto', productoInfo => { //evento que va a estar escuchando cuando carguen un producto
        contenedorProductos.save(productoInfo)
        io.socket.emit('server:productos', contenedorProductos.getAll()) //envia todos los productos a todos los usuarios
    });
})





/* const Productos = require('./Class/products_class')
const script = require('./script')

//importo la configuarcion para inicializar
const { optionsMySQL } = require('./options/mariaDB');
//importo el modulo knex y lo inicializo
const knex = require('knex')(optionsMySQL);

let productos = knex.from('productos').select('*')
console.log(productos)

let products = new Productos('productos', optionsMySQL) */
