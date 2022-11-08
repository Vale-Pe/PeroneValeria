const express = require('express')
const app = express()
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const PORT = process.env.port || 8080
const { faker } = require('@faker-js/faker')
const {test} = require('./Class/test_class')
/* const { default: generarRandomProd } = require('./Class/test_class') */
const { generarRandomProd } = require('./Class/test_class')

//db
const { options_MySQL } = require('./options/mariaDB')
const knex = require('knex')(options_MySQL)

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

/* app.use("/api/productos-test", prodRouter);

router.use(express.json());
router.use(express.urlencoded({ extended: true })); */

//funcion para generar productos con faker
app.get('/api/productos-test', (req, res) => {
    let productosTest = []
    
    for (let i=0; i<5; i+=1) {
        productosTest.push(generarRandomProd(i + 1))
    }

    res.json(productosTest)
    /* res.render('test.js', { response: response }) */
})


//Server
const httpServer = new HttpServer(app)

const io = new IOServer(httpServer)
app.set("socketio", io);

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

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`)) // El servidor funcionando en el puerto 8080