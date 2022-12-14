const socket = io.connect(); // Ya podemos empezar a usar los sockets desde el cliente 

//funcion que recibe los productos
socket.on("products", (data) => { renderProduct(data); });

//funcion que recibe los mensajes
socket.on('messages', (data) => { renderMessage(data); });

function renderProduct(data) {
	const html = data
		.map((producto) => {
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

	socket.emit("new-product", producto)
}

//funcion para agregar mensaje
function renderMessage(data) {
    const html = data.map((elem, index) => {
        return(`<div class="mensajeChat">
            <strong class="autorChat">${elem.author}</strong>
            <p class="fechaChat">(${elem.date}):</p>
            <p class="textoChat">${elem.text}</p> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;

}

//funcion para enviar mensaje
function addMessage(e) {
    const date = new Date()
    const formatDate = date.toLocaleString();

    const mensaje = {
        author: document.getElementById('username').value,
        date: formatDate,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}
