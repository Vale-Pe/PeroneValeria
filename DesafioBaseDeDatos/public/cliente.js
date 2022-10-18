const socket = io.connect();

//FORMULARIO PRODUCTOS

socket.on('server:productos', productos => {
    renderProducts(productos)
})

const productForm = document.querySelector('#productForm');
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productUrl = document.querySelector('#productUrl');
const productPool = document.querySelector('#productPool');

//PRODUCTOS
productForm.addEventListener('submit', event => {
    event.preventDefault()
    const title = productName.value
    const price = productPrice.value
    const thumbnail = productUrl.value
    
    socket.emit('cliente:producto', { title, price, thumbnail })
})


async function renderProducts(productos) {
    const contenido = await ('./productos.hbs')
    const plantilla = await contenido.text()
    
    productos.forEach(product => {
        const template = Handlebars.compile(plantilla)
        const html = template(product)
        productPool.innerHTML += html
    })
}

//FORMULARIO CHAT

socket.on('server:mensajes', mensaje => {
    renderMessages(mensaje)
})

const chatForm = document.querySelector('#chatForm')
const userNameInput = document.querySelector('#usernameInput')
const mensajeInput = document.querySelector('#mensajeInput')
const mensajesPool = document.querySelector('#mensajesPool')

//CHAT

function sendMensaje(mensaje) { //funcion para enviar los mensajes
    socket.emit('cliente:mensaje', mensaje)
    console.log(mensaje)
}

const date = new Date()
const formatDate = date.toLocaleString();

chatForm.addEventListener('submit', event => { //funcion que toma los valores de los imput para enviar los mensajes
    event.preventDefault()
    const mensajeInfo = { username: userNameInput.value, date: formatDate , message: mensajeInput.value }
    sendMensaje(mensajeInfo)
})

//funcion que toma los mensajes y los muestra.

/* function renderMessage(mensaje) {
    console.log(mensaje)
    const html = data.map((elem, index) => {
        return(`<div class="mensajeChat">
            <strong class="autorChat">${elem.author}</strong>
            <p class="fechaChat">(${elem.date}):</p>
            <p class="textoChat">${elem.text}</p> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;

} */

function renderMessages(mensaje) {
    console.log(mensaje)
    const html = mensaje.map(msgInfo => {
        return(`<div>
            <strong>${msgInfo.username}</strong>:
            <em>${msgInfo.message}</em> </div>`)
    }).join(" ");
    mensajesPool.innerHTML = html

}