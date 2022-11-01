import mongoose from 'mongoose';
import ProductoModel from '../models/ProductoModel.js';
import fs from "fs";

export default class Producto {
	constructor() {
		this.url = 'mongodb+srv://VPerone:coderhouse@cluster0.8m20wmv.mongodb.net/ecommerce?retryWrites=true&w=majority' 
		this.mongodb = mongoose.connect
	}

	// Crear Archivo en la base de datos con el producto
	async createData(prod) {
		try {
			await this.mongodb(this.url)
			const newProduct = new ProductoModel(prod)
			return await newProduct.save()
		}catch(error) {
			console.log(error)
		}
	}

	// Obtener producto por Id
	async getById(id) {
		try{
			await this.mongodb(this.url)
			return await ProductoModel.findById(id)
		}catch(error){
			console.log(error)
			return { error: 'Producto no existe' }
		}
	}

	// Obtener todos los productos
	async getAll() {
		try {
			await this.mongodb(this.url)
			return await ProductoModel.find()
		}catch(error) {
			return { error: 'No hay productos agregados' }
		}
	}

	// Agregar producto(a un carrito)
/* 	async save(prod) {
		try {
			
		}catch(error) {
			console.log(error)
		}
	} */

	// Actualizar un producto
	async put(id, prod) {
		try {
			await this.mongodb(this.url)
			return await ProductoModel.findByIdAndUpdate(id, prod)
		}catch(error) {
			console.log(error)
		}
	}
	
	// Borrar un producto
	async borrar(id) {
		try {
			await this.mongodb(this.url)
			return await ProductoModel.findByIdAndDelete(id)
		}catch(error) {
			console.log(error)
		}
	}
}
