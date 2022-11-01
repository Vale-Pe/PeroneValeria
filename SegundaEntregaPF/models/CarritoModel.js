import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
    nombre: String,
    productos: []
})

const CarritoModel = mongoose.model('carrito', carritoSchema) //'producto' nombre de la conexion a la cual va a estar asociada

export default CarritoModel