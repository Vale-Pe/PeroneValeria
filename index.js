let titulo
let autor
let title

class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = [libros]
        this.mascotas = [mascotas]
    }

    getFullName() {
        return (`Mi nombre es ${this.nombre} ${this.apellido}`)
    }

    addMascota (nombreMascota) {
        this.mascotas.push(nombreMascota)
        return (this.mascotas)
    }

    countMascotas() {
        let cantidadMascotas = this.mascotas.length
        return (`Tengo ${cantidadMascotas} mascotas`)
    }


    addBook() {
        this.libros.push({nombre: titulo, autor: autor})
        return (this.libros)
    }

    getBookNames() {
        this.libros.map(libro => console.log(libro.nombre))
    }
}

const usuario = new Usuario ("Valeria", "Perone", {nombre: "Rayuela", autor: "Julio Cortazar"}, "perro")

console.log(usuario);
console.log(usuario.getFullName());
usuario.addMascota("gato");
console.log(usuario.countMascotas());
console.log(usuario.mascotas)
console.log(usuario.libros);
usuario.addBook(titulo = "Cien años de soledad", autor = "Gabriel García Marquez");
usuario.addBook(titulo = "Las venas abiertas de América Latina", autor = "Eduardo Galeano");
console.log(usuario.libros);
console.log ("Mis libros son:") + usuario.getBookNames()

