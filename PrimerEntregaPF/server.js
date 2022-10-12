
const express = require ("express");
const routerCarritos = require ("./routes/carritos.router.js");
const routerProductos = require ("./routes/productos.router.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProductos);
app.use("/api/carritos", routerCarritos);

const PORT = process.env.PORT || 8080; 

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));