const express = require("express")
const morgan = require("morgan")
require("dotenv").config()
require("express-async-errors")


const errorHandlerMiddleware = require("./middlewares/error-handler")
const notFoundMiddleware = require("./middlewares/not-found")
const connectToMongoDB = require("./db/connect")
const productRouter = require("./routes/products")


const app = express()

//HLL Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("tiny"))

//Routes
app.use("/api/v1/products", productRouter)

app.get("/", (req, res) => {
    res.send("<h1>Root Directory</h1><a href='/api/v1/products' target='_blank' >View Products</a>")
})

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)









const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const start = async (url) => {
    try {
        await connectToMongoDB(url)
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT: ${PORT}.............................................`)
        })
    } catch (err) {
        console.log(err)

    }
}

start(MONGO_URI)




