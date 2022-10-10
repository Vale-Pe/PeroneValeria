import express from "express";
import Carrito from "../clases/Carrito.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", async (req, res) => { //crea el carrito
	const carritoCreado = await carrito.addCarrito();
	res.send(carritoCreado);
});

router.delete("/:id", async (req, res) => { //borra el carrito
	const carritoBorrado = await carrito.borrar(req.params.id);
	res.send(carritoBorrado);
});

router.delete("/:id/productos/:idPrd", async (req, res) => { //borra el producto 
	const productoBorrado = await carrito.borrarProd(
		req.params.idPrd,
		req.params.id
		);
		res.send(productoBorrado);
})

router.get("/", (req, res) => { //obtiene todos los carritos creados
	carrito.listarAll().then(listaCarritos => {
		res.send(listaCarritos);
	})
});

router.get("/:id", async (req, res) => { //obtiene el carrito indicado
	const carroBuscado = Number(req.params.id);
	const cont = await carrito.listar(carroBuscado);
	res.send(cont);
});

router.get("/:id/productos", async (req, res) => { //obtiene el carrito del producto indicado
	const carroBuscado = Number(req.params.id);
	const cont = await carrito.listarProd(carroBuscado);
	res.send(cont);
	console.log(cont)
});

router.post("/:id/productos/:idPrd", async (req, res) => { //agrega un producto al carrito, id: id del carrito, idPrd: id del producto
	const respuesta = await carrito.guardarProductoEnCarrito(
		req.params.idPrd,
		req.params.id
	);
	res.send(respuesta);
});


export default router;