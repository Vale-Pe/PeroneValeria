//importo la configuarcion para inicializar
const { optionsMySQL } = require('./options/mariaDB');
//importo el modulo knex y lo inicializo
const knex = require('knex')(optionsMySQL);

const productsIniciales = [
	{ name: "Escuadra", price: 200, pictureUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png" },
	{ name: "calculadora", price: 459, pictureUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png" },
	{ name: "agenda", price: 150, pictureUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-128.png" }
];

(async function script () {
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

module.exports = script