const knex = require('knex')
const config = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "431128",
        database: "ecommerce",
    },
    pool: { min: 0, max: 7 },
}

const databaseConnectionMysql = knex(config)

module.exports = databaseConnectionMysql