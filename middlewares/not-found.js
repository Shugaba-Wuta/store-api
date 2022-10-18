const url = require("url")
const notFoundMiddleware = async (req, res) => {
    return res.status(500).json({ msg: `Invalid request: ${req.method}  ${url.parse(req.url).pathname} is not supported` })

}

module.exports = notFoundMiddleware