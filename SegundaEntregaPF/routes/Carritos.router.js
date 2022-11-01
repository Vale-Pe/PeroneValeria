import express from "express";
import Carrito from "../DAOs/Carrito.dao.class.js";

const router = express.Router();

const carrito = new Carrito();

function validarAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("usted no tiene acceso");
	}
}

//Crea un carrito
router.post("/", validarAdmin, async (req, res) => {
	console.log(req.body);
	const carritoCreado = await carrito.crearCarrito(req.body);
	res.send(carritoCreado);
});

//Elimina el carrito
router.delete("/:id", validarAdmin, async (req, res) => {
	const carritoBorrado = await carrito.borrar(req.params.id);
	res.send(carritoBorrado);
});

//Elimina un producto determinado de un carrito determinado
router.delete("/:id/productos/:idPrd", async (req, res) => {
	const productoBorrado = await carrito.borrarProd(req.params.idPrd, req.params.id);
	res.send(productoBorrado);
})

//Lista todos los carritos
router.get("/", async (req, res) => {
	const response = await carrito.listarAll();
	res.send(response);
});

//Trae un carrito determinado
router.get("/:id", async (req, res) => {
	const cont = await carrito.listar(req.params.id);
	res.send(cont);
});

//Lista los productos de un carrito determinado
router.get("/:id/productos", async (req, res) => {
	const carroBuscado = Number(req.params.id);
	const cont = await carrito.listarProd(carroBuscado);
	res.send(cont);
	console.log(cont)
});

//Agrega un producto a un carrito determinado
router.post("/:id/productos/:idPrd", async (req, res) => {
	const respuesta = await carrito.guardarProductoEnCarrito(req.params.idPrd, req.params.id);
	res.send(respuesta);
});

//Actualiza el carrito
router.put('/:id', validarAdmin, async (req, res) => {
	const id = await carrito.actualizar(req.params.id, req.body);
	res.json(id);
})

export default router;