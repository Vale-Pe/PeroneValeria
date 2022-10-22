//importo la configuarcion para inicializar
const { optionsMySQL } = require('../options/mariaDB');
//importo el modulo knex y lo inicializo
const knex = require('knex')(optionsMySQL);

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
        let rows = await knex.from('productos').select('*')
        for (row of rows) console.log(`${row['id']} ${row['name']} ${row['price']} ${row['pictureUrl']}`)
    }
    catch(err) {
        console.log(err); throw err
    }
    finally{
        knex.destroy()
    };
})()

class ProductosClass {
    constructor() {
        /* this.config = config */
        this.table = 'productos'
    }

    // Guardar producto
    async save(producto) {
        try {
            await knex(`${this.table}`).insert(producto)
            console.log("Se ha agregado el producto correctamente")
        }
		catch (err) {
            console.log(err); throw err
        }
    }

    // Obtener todos los productos
    async getAll() {
        try {
            const productos = await knex.from(`${this.table}`).select("*")
			for (p of productos) console.log(`${p['id']} ${p['name']} ${p['price']} ${p['pictureUrl']}`)
            return productos
        }
		catch (error) {
            if (error.code == "ER_NO_SUCH_TABLE") {
                productTable()
            }else {
                console.log(
                    `Ocurrio el siguiente error al guardar el mensaje: ${error}`
                ); throw err
            }
        }
    }

    // Eliminar producto
    async delete(id) {
        try {
            await knex.from(`${this.table}`).where("id", "=", id).del()
			console.log("Producto eliminado correctamente")
        }
		catch (err) {
            console.log(err); throw err
        }
    }
}

module.exports = ProductosClass;
