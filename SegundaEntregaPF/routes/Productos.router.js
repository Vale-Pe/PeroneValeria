import express from "express";
import Producto from "../DAOs/Producto.dao.class.js";

const router = express.Router();

const producto = new Producto();

function validarAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("usted no tiene acceso");
	}
}

//Crea un producto
router.post("/", validarAdmin, async (req, res) => {
	console.log(req.body);
	const response = await producto.createData(req.body)
	res.send(response)
});

//Borra el producto que coincide con el id
router.delete("/:id", validarAdmin, async (req, res) => {
	const productoBorrado = await producto.borrar(req.params.id);
	res.send(productoBorrado);
});

//Trae todos los productos
router.get("/", async (req, res) => {
	const response = await producto.getAll()
	res.send(response);
	});

//Trae el producto del id determinado
router.get("/:id", async (req, res) => {
	const cont = await producto.getById(req.params.id);
	res.send(cont);
});

//actualiza un producto determinado
router.put('/:id', validarAdmin, async (req, res) => {
	const id = await producto.put(req.params.id, req.body);
	res.json(id);
})

export default router;