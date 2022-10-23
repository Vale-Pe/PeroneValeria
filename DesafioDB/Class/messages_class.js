//importo la configuarcion para inicializar
const { options_SQLite } = require('../options/SQLite3')
const knex = require('knex')(options_SQLite)

const date = new Date()
const formatDate = date.toLocaleString();

const messagesIniciales = [
    { author: "Juan", date: formatDate, text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", date: formatDate, text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", date: formatDate, text: "¡Genial!" }
];

const messageTable = (async () => {
	try{
        console.log('creo tabla de mensajes y agrego 4 columnas')
        const tableExists = await knex.schema.hasTable('mensajes')
        if (tableExists) {
            await knex.schema.dropTable('mensajes')
        } else {
            await knex.schema.createTable('mensajes', table => {
                table.increments('id')
                table.string('author')
                table.integer('text') 
                table.string('date')
            })
        }
        console.log('inserto mensajes iniciales')
        await knex('mensajes').insert(messagesIniciales)
        console.log('leo todos los mensajes')
        let msjs = await knex.from('mensajes').select('*')
        for (let msj of msjs) console.log(`${msj['id']} ${msj['author']} ${msj['date']} ${msj['text']}`)
    }
    catch(err) {
        console.log(err); throw err
    }
    finally{
        knex.destroy()
    };
})()

class ContenedorMensajes {
    constructor(knex){
        this.db = require('knex')(options_SQLite);
        this.table = 'mensajes';
        /* console.log(this.db) */
    }

    // Guardar mensaje
    async save(mensaje) {
        try {
            console.log("Se ha agregado el mensaje correctamente")
            return await (this.db)(`${this.table}`).insert(mensaje)
        }
		catch(err) {
            console.log(err); throw err
        }
    }

    // Obtener todos los mensajes
    async getAll() {
        try {
            const mensajes = await (this.db).from(`${this.table}`).select("*")
			for (let m of mensajes) console.log(`${m['id']} ${m['author']} ${m['date']} ${m['text']}`)
            return mensajes
        }
		catch (err) {
            if (err.code == 'SQLITE_ERROR') {
                messageTable()
            }else {
                console.log(
                    `Ocurrio el siguiente error al guardar el mensaje: ${err}`
                ); throw err
            }
        }
    }

    // Eliminar mensaje
    async delete(id) {
        try {
            console.log("Mensaje eliminado correctamente")
            return await (this.db).from(`${this.table}`).where("id", "=", id).del()
        }
		catch (err) {
            console.log(err); throw err
        }
    }
}

module.exports = ContenedorMensajes;