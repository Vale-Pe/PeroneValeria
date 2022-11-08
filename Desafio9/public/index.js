const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente

//funcion que recibe los productos
socket.on('server:productos', (data) => { renderProduct(data); });

//funcion que recibe los mensajes
socket.on('server:mensajes', (data2) => { renderMessage(data2); });

//funcion que recibe los productos Test
socket.on('server:productosTest', (data3) => { renderProductTest(data3) })

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

//funcion para agregar mensaje
function renderMessage(data2) {
    console.log(data2)
    const html = data2.map((mensaje) => {
        let msj = `<div class="mensajeChat">
            <strong class="autorChat">${mensaje.author}</strong>
            <p class="fechaChat">(${mensaje.date}):</p>
            <p class="textoChat">${mensaje.text}</p> </div>`
        return msj
    }).join(" ");
    document.getElementById('messages').innerHTML = html;

}

//funcion para enviar mensaje
function addMessage() {
    const date = new Date()
    const formatDate = date.toLocaleString();

    const mensaje = {
        author: document.getElementById('email').value,
        date: formatDate,
        text: document.getElementById('text').value
    };
    socket.emit('cliente:mensaje', mensaje);
}

function renderProductTest(data3) {
    console.log(data3)
    
	const html = data3.map((productoTest) => {
            let str = `<tr class="table-light text-center">
                        <td>${productoTest.name}</td>
                        <td>${productoTest.price}</td>
                        <td><img width=50 src='${productoTest.pictureUrl}' alt="imgProducto"></td>
                        </tr>`
			return str
    }).join("\n")
	document.getElementById("idTbodyTest").innerHTML = html
}


function addProductTest() {
	const productoTest = {
		name: faker.commerce.productName(),
        price: faker.commerce.price(),
        pictureUrl: faker.image.image()
	}

	socket.emit('cliente:productoTest', productoTest)
}