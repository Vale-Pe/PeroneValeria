const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente 

//funcion que recibe los productos
socket.on('server:productos', (data) => { renderProduct(data); });

function renderProduct(data) {
    console.log(data)
	const html = data.map((producto) => {
            let str = `<tr class="table-light text-center">
                        <td>${producto.name}</td>
                        <td>${producto.price}</td>
                        <td><img width=50 src='${producto.pictureUrl}' alt="imgProducto"></td>
                        </tr>`
			return str
    }).join("\n")
	document.getElementById("idTbody").innerHTML = html
}

function addProduct() {
	const producto = {
		name: document.getElementById("name").value,
		price: document.getElementById("price").value,
        pictureUrl: document.getElementById("pictureUrl").value
	}

	socket.emit('cliente:producto', producto)
}