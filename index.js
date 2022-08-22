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
        this.libros.push({nombre: tituloLibro, autor: autorLibro})
        return (this.libros)
    }

    getBookNames() {
        this.libros.map(libro => nombreLibro.push(libro.nombre))
        return console.log(`Los libros son: ${nombreLibro}`)
    }
}

const usuario = new Usuario ("Valeria", "Perone", [{nombre: "Rayuela", autor: "Julio Cortazar"}], "perro")

console.log(usuario);
console.log(usuario.getFullName());
console.log(usuario.addMascota("gato"));
console.log(usuario.countMascotas());
console.log(usuario.libros);
console.log(usuario.addBook("Cien años de soledad", "Gabriel García Marquez"));
console.log(usuario.addBook("Las venas abiertas de América Latina", "Eduardo Galeano"));
console.log(usuario.libros);
console.log(usuario.getBookNames);
