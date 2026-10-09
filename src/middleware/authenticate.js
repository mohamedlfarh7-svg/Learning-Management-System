import jwt from "jsonwebtoken"
import env from "../config/env.js"

async function authenticate(req, res, next) {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error("Authentication required")
        error.name = "AuthenticationError"
        error.status = 401
        return next(error)
    }

    const token = authHeader.split(' ')[1]

    const payload = jwt.verify(token, env.jwtSecret)

    req.user = payload

    next()
}

export default authenticate