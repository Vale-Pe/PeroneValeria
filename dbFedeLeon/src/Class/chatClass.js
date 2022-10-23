const chatDB = require('../databasesqlite')

const chatTable = async () => {
    try {
        await chatDB.schema.createTable('messages', messagesTable => {
            messagesTable.increments('id').primary()
            messagesTable.string('username', 50).notNullable()
            messagesTable.string('time', 50).notNullable()
            messagesTable.string('message', 500).notNullable()
        })
        console.log('Tabla de mensajes creada correctamente')
        chatDB.destroy()
    } catch(err) {
        console.log(err)
        chatDB.destroy()
    }
}

class ChatClass {
    constructor(config, table) {
        this.config = config
        this.table = table
    }

    // Guardar mensaje

    async save(mensaje) {
        try {
            await chatDB(`${this.table}`).insert(mensaje)
            console.log("Se ha agregado el mensaje")

        } catch (err) {
            console.log(err)
        }
    }

    // Obtener todos los mensajes

    async getAll() {

        try {
            const contenido = await chatDB.from(`${this.table}`).select("*")
            return contenido

        } catch (error) {
            console.log(error)
    }
}

}

module.exports = ChatClass