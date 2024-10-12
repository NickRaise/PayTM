const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(403).json({})
    
    const userToken = authHeader.split(' ')[1]
    
    try {
        decode = jwt.verify(userToken, JWT_SECRET)
        console.log("Auth success")
        if (decode.userID) {
            req.userID = decode.userID
            return next()
        }
    } catch (err) {
        return res.status(403).json({})
    }   
}

module.exports = {
    authMiddleware
}