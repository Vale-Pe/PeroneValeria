import Producto from "./Producto.class.js";

export default class Carrito {
	constructor() {
		this.producto = new Producto(); //se hace la instancia de la clase para poder tener acceso al inventario de productos
		this.carritos = [];
		this.id = 1;
	}

	listar(id) {
		let prod = this.carritos.find((carr) => carr.id == id);
		return prod || { error: "carrito no encontrado" };
	}

	listarAll() {
		return this.carritos.length
			? this.carritos
			: { error: "no hay carritos cargados" };
	}

	crearCarrito() {
		const carr = { id: this.id+=1, timeStamp: Date.now(), productos: [] }; //estos productos son los que vamos agregando al carrito
		this.carritos.push(carr);
		return carr;
	}

	guardarProductoEnCarrito(idProd, idCarrito) {
		console.log(idProd);
		const producto = this.producto.listar(idProd);
		this.carritos.forEach((carro) => {
			carro.id == idCarrito ? carro.productos.push(producto) : null;
		});
		return this.carritos;
	}

	actualizar(carr, id) {
		carr.id = Number(id);
		let index = this.carritos.findIndex((carr) => carr.id == id);
		this.productos.splice(index, 1, carr);
	}

	borrar(id) {
		let index = this.carritos.findIndex((carr) => carr.id == id);
		return this.carritos.splice(index, 1);
	}
}