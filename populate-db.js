require("dotenv").config()

const connectToMongoDB = require("./db/connect")
const Product = require("./models/products")
const jsonProducts = require("./products.json")
const fs = require("fs")


const start = async () => {
    try {
        await connectToMongoDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log("All Done!!!")
        process.exit(0)

    } catch (error) {
        console.log(error)
        console.log("Failed!!!!!")
        process.exit(1)
    }
}
start()


