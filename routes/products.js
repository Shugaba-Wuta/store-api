const express = require("express")
const { getAllProducts, getAllProductsStatic } = require("../controllers/products.js")



const products = express.Router()

products.get("/", getAllProducts)
products.route("/static").get(getAllProductsStatic)







module.exports = products