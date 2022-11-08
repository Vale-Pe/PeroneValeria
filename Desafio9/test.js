const { options_MySQL } = require('../options/mariaDB')
const knex = require('knex')(options_MySQL)

const productTableTest = (async () => {
	try{
        console.log('creo tabla de productos y agrego 4 columnas')
        await knex.schema.createTable('productos', table => {
                table.increments('id')
                table.string('name').notNullable()
                table.integer('price').notNullable()
                table.string('pictureUrl').notNullable()
            })
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

productTableTest()