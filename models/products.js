const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0.0 },
    name: { type: String, required: [true, "product name must be provided"] },
    price: { type: Number, required: [true, "product price must be provided"] },
    created_at: { type: Date, default: Date.now() },
    company: {
        type: String,
        enum: {
            values:
                ["ikea", "liddy", "caressa", "marcos", "amazon"],
            message: "{VALUE} Products must be from the following values: {VALUE}"
        }
    }
}
)

module.exports = mongoose.model("Product", productSchema)
