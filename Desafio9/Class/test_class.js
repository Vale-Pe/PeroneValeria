/* import { faker, Faker } from "@faker-js/faker" */
const { faker } = require("@faker-js/faker");
const express = require("express");
const prodRouter = express.Router();
const productosTest = require("./products_class");
const prod = new productosTest();

function generarRandomProd() {
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        pictureUrl: faker.image.image()
    }
}

prodRouter.post("/", async (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }
    console.log(response)
    prod.createData(response)
    res.redirect("/api/productos-test");
});

module.exports ={ generarRandomProd }