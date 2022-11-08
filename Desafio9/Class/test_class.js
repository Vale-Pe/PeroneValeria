/* import { faker, Faker } from "@faker-js/faker" */
const { faker } = require("@faker-js/faker");
const { options_MySQL } = require('../options/mariaDB')
const knex = require('knex')(options_MySQL)

function generarRandomProd() {
    return {
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        pictureUrl: faker.image.image()
    }
}

let productosTest = []
    
for (let i=0; i<5; i+=1) {
    productosTest.push(generarRandomProd(i + 1))
}

const productTestTable = (async () => {
    try{
        const tableExists = await knex.schema.hasTable('productosTest')
        if (tableExists) {
            await knex.schema.dropTable('productosTest')
        } else {
            await knex.schema.createTable('productosTest', table => {
                table.increments('id')
                table.string('name').notNullable()
                table.integer('price').notNullable()
                table.string('pictureUrl').notNullable()
                console.log('creo tabla de productos y agrego 4 columnas')
            })
        }
        await knex('productosTest').insert(productosTest)
        console.log('inserto productos Test')
        let prods = await knex.from('productosTest').select('*')
        console.log('leo todos los productos Test')
        for (let prod of prods) console.log(`${prod['id']} ${prod['name']} ${prod['price']} ${prod['pictureUrl']}`)
    }
    catch(err) {
        console.log(err); throw err
    }
    finally{
        knex.destroy() 
    };
})()

class ContenedorProductosTest {
    constructor(knex){
        this.db = require('knex')(options_MySQL);
        this.table = 'productosTest';
    }

    async getAll() {
        try {
            const productos = await (this.db).from(`${this.table}`).select("*")
			for (let p of productos) console.log(`${p['id']} ${p['name']} ${p['price']} ${p['pictureUrl']}`)
            return productos
        }
		catch (err) {
            if (err.code == 'ER_NO_SUCH_TABLE') {
                productTestTable()
            }else {
                console.log(
                    `Ocurrio el siguiente error al guardar el producto: ${err}`
                ); throw err
            }
        }
    }
}


module.exports = ContenedorProductosTest

/* prodRouter.post("/", async (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }
    console.log(response)
    prod.createData(response)
    res.redirect("/api/productos-test");
}); */