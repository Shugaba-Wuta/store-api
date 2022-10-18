const { query } = require("express")
const products = require("../models/products")
const Product = require("../models/products")


const getAllProducts = async (req, res) => {
    const { featured, name, company, sort, fields, minPrice, maxPrice, minRating, maxRating } = req.query
    const queryObject = {}
    const RESULT_LIMIT = 10
    if (featured) {
        queryObject.featured = featured.toLowerCase() === "true" ? true : false
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" }
    }
    if (company) {
        queryObject.company = { $regex: company, $options: "i" }
    }

    if (minPrice && Number(minPrice) > 0) {
        queryObject.price = {}
        queryObject.price["$gte"] = Number(minPrice)
    }
    if (maxPrice && Number(maxPrice) > 0) {
        if (!queryObject.price) {
            queryObject.price = {}
        }
        queryObject.price["$lte"] = Number(maxPrice)
    }

    if (minRating && Number(minRating) > 0) {
        queryObject.rating = {}
        queryObject.rating["$gte"] = Number(minRating)
    }
    if (maxRating && Number(maxRating) > 0) {
        if (!queryObject.rating) {
            queryObject.rating = {}
        }
        queryObject.rating["$lte"] = Number(maxRating)
    }

    let query = Product.find(queryObject)

    if (sort) {
        DEFAULT_SORT = "created_at"
        const finalSortList = (sort) => {
            const SORT_OPTIONS = ["name", "price", "company", "created_at"].flatMap((item) => { return [item, `-${item}`] })
            sortList = sort.replace(/\s/g, "").split(",")
            const newSortList = sortList.filter((sort) => {
                return SORT_OPTIONS.includes(sort)
            })
            return newSortList.join(" ")
        }
        const finalSort = finalSortList(sort)
        query = query.sort(finalSort || DEFAULT_SORT)
    }
    if (fields) {
        query = query.select(fields.replace(/\s/g, "").split(",").join(" "))
    }

    const userLimit = Number(req.query.limit)
    const page = Number(req.query.page) || 1
    const limit = (userLimit <= RESULT_LIMIT && userLimit > 0) ? userLimit : RESULT_LIMIT
    const skip = (page - 1) * limit

    query = query.limit(limit).skip(skip)



    const products = await query

    return res.status(200).json({ success: true, message: "", itemCount: products.length, page, items: products })
}


const getAllProductsStatic = async (req, res) => {
    const { search } = req.query
    const queryObject = {}
    if (search) {
        queryObject.search = search
    }
    const products = await Product.find({
        // name: { $regex: queryObject.search, $options: "i" }
    }).sort("price name").select("name price")
    return res.status(200).json({ success: true, message: "get all products testing ", itemCount: products.length, items: products })
}










module.exports = { getAllProducts, getAllProductsStatic }