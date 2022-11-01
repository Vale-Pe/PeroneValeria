import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: String,
    stock: Number
})

const ProductoModel = mongoose.model('producto', productoSchema) //'producto' nombre de la conexion a la cual va a estar asociada

export default ProductoModel