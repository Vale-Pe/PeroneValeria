import express from "express";
import Producto from "../clases/Producto.class.js";// importo porque necesito tener acceso a los metodos de productos

const router = express.Router();

const producto = new Producto();

function validarAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("usted no tiene acceso");
	}
}

router.post("/", validarAdmin, (req, res) => {
	console.log(req.body);
	const productoCreado = producto.guardar(req.body);
	res.send(productoCreado);
});

router.delete("/:id", validarAdmin, (req, res) => {
	const productoBorrado = producto.borrar(req.params.id);
	res.send(productoBorrado);
});

router.get("/", (req, res) => {
	const listaProductos = producto.listarAll();
	res.send(listaProductos);
});

router.get("/:id", (req, res) => {
	const productoBuscado = producto.listar(req.params.id);
	res.send(productoBuscado);
});

export default router;