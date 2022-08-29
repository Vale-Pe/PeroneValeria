const fs = require('fs');

/* const productos = [
    {
        title:'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        id: 1
    },{
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        id: 2
    },
    {
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        id: 3
    }
]  */

class Contenedor {
    async save(producto) {
        try {
            await fs.promises.writeFile(
                './productos.txt',
                JSON.stringify(producto, null, 2),
                'utf-8'
            );
        } catch(e) {
            console.log(e);
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');
            //console.log(contenido);
            return JSON.parse(contenido);
        } catch(error) {
            console.log(error);
        }
    }
    async saveNew(productoNuevo) {
        const contenido = await this.getAll();
        const indice = contenido.sort((a,b) => b.id - a.id)[0].id;
        productoNuevo.id = indice + 1;
        contenido.push(productoNuevo);
        this.save(contenido);
    }
    async getById(id) {
        const contenido = await this.getAll();
        const productoBuscado = contenido.filter(producto => producto.id === id)
        console.log(productoBuscado)
    }
    async deleteById(id) {
        const contenido = await this.getAll();
        const productoEliminado = contenido.filter(producto => producto.id !== id)
        this.save(productoEliminado)
        console.log(productoEliminado)
    }
    async deleteAll() {
        const contenido = await this.getAll();
        const productosEliminados = contenido.splice(0, contenido.length)
        //console.log(productosEliminados)
        console.log(contenido)
        this.save(contenido);
    } 
}

const contenedor = new Contenedor();

contenedor.save(productos);

//contenedor.getAll(); --> Trae todos los productos guardados
const productoN =     {
    title:'Mochila',
    price: 300.5,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/school-supplies-7/64/164_school-study-education-bag-backpack-128.png',
}

//contenedor.saveNew(productoN) --> Guarda producto nuevo
//contenedor.getById(1); --> Trae el producto compatible con el indice indicado
//contenedor.deleteById(2);--> Elimina el producto que tiene el indice indicado
//contenedor.deleteAll(); --> vacia el array, eliminando todos los productos