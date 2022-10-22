const knex = require('knex')

const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
    },
    pool: { min: 0, max: 7 },
}

const options_MySQL = knex(options)

module.exports = { options_MySQL }