const socket = io()

//FORMULARIO PRODUCTOS

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

    const contenido = await fetch('./productos.hbs')
    const plantilla = await contenido.text()
    
    productos.forEach(product => {
        const template = Handlebars.compile(plantilla)
        const html = template(product)
        productPool.innerHTML += html
    })
}

socket.on('server:productos', productos => {
    renderProducts(productos)
})

//FORMULARIO CHAT

const chatForm = document.querySelector('#chatForm')
const userNameInput = document.querySelector('#usernameInput')
const mensajeInput = document.querySelector('#mensajeInput')
const mensajesPool = document.querySelector('#mensajesPool')

//CHAT

function sendMensaje(mensaje) {
    socket.emit('cliente:mensaje', mensaje)
}

chatForm.addEventListener('submit', event => {
    event.preventDefault()
    const mensajeInfo = { username: userNameInput.value, time: new Date(Date.now()) , message: mensajeInput.value }
    sendMensaje(mensajeInfo)
})

function renderMessages(chatArray) {
    const html = chatArray.map(msgInfo => {
        return(`<div>
            <strong>${msgInfo.username}</strong>:
            <em>${msgInfo.message}</em> </div>`)
    }).join(" ");
    mensajesPool.innerHTML = html

}

socket.on('server:mensajes', renderMessages)