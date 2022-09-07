const express = require(`express`)
const app = express()
const rutas = require('./routes/index')

const PORT = process.env.PORT || 8080
console.log(PORT)

//Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Public
app.get('/api', (req , res ) => {
    res.sendFile(__dirname + `/public/index.html`)
})

//Rutas
app.use('/api', rutas)


//Server
app.listen(PORT, ()=> {
    console.log(`Escuchando el puerto ${PORT}`)
})