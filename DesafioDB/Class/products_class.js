//importo la configuarcion para inicializar
const { options_MySQL } = require('../options/mariaDB')
const knex = require('knex')(options_MySQL)

const productsIniciales = [
	{ name: "Escuadra", price: 200, pictureUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png" },
	{ name: "calculadora", price: 459, pictureUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png" },
	{ name: "agenda", price: 150, pictureUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-128.png" }
];

const productTable = (async () => {
	try{
        console.log('creo tabla de productos y agrego 4 columnas')
        const tableExists = await knex.schema.hasTable('productos')
        if (tableExists) {
            await knex.schema.dropTable('productos')
        } else {
            await knex.schema.createTable('productos', table => {
                table.increments('id')
                table.string('name')
                table.integer('price')
                table.string('pictureUrl')
            })
        }
        console.log('inserto productos iniciales')
        await knex('productos').insert(productsIniciales)
        console.log('leo todos los productos')
        let prods = await knex.from('productos').select('*')
        for (let prod of prods) console.log(`${prod['id']} ${prod['name']} ${prod['price']} ${prod['pictureUrl']}`)
    }
    catch(err) {
        console.log(err); throw err
    }
    finally{
        knex.destroy()
    };
})()

class ContenedorProductos {
    constructor(knex){
        this.db = require('knex')(options_MySQL);
        this.table = 'productos';
        /* console.log(this.db) */
    }

    // Guardar producto
    async save(producto) {
        try {
            await (this.db)(`${this.table}`).insert(producto)
            console.log("Se ha agregado el producto correctamente")
        }
		catch(err) {
            console.log(err); throw err
        }
    }

    // Obtener todos los productos
    async getAll() {
        try {
            const productos = await (this.db).from(`${this.table}`).select("*")
			for (let p of productos) console.log(`${p['id']} ${p['name']} ${p['price']} ${p['pictureUrl']}`)
            return productos
        }
		catch (err) {
            if (err.code == "ER_NO_SUCH_TABLE") {
                productTable()
            }else {
                console.log(
                    `Ocurrio el siguiente error al guardar el producto: ${err}`
                ); throw err
            }
        }
    }

    // Eliminar producto
    async delete(id) {
        try {
            await (this.db).from(`${this.table}`).where("id", "=", id).del()
			console.log("Producto eliminado correctamente")
        }
		catch (err) {
            console.log(err); throw err
        }
    }
}

module.exports = ContenedorProductos;
