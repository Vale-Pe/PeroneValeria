const ejs = require("ejs");
const express = require("express");
const Productos = require("./api/productos.js");

let productos = new Productos();

const app = express();


