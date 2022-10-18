const mongoose = require("mongoose")
const connectToMongoDB = async (url) => {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false })
}

module.exports = connectToMongoDB