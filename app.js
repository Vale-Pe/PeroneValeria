const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require("./routes");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use('/api/productos', routes);

// Public
app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// Server
app.listen(PORT, () => { console.log(`servidor iniciado en ${PORT}`);
});