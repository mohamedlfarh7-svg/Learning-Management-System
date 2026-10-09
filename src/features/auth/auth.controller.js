import { success } from "zod";
import { registerService, loginService, refreshTokenService, logoutService } from "./auth.service.js";
import { registerSchema, loginSchema } from "./auth.validation.js"

async function register(req, res, next) {
    try {

        const validRegisterData = registerSchema.safeParse(req.body)

        if (!validRegisterData.success) {
            return next(validRegisterData.error)
        }

        const data = await registerService(validRegisterData.data)

        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            data,
        })

    } catch (error) {
        next(error)
    }
}

async function login(req, res, next) {
    try {

        const validLoginData = loginSchema.safeParse(req.body)

        if (!validLoginData.success) {
            return next(validLoginData.error)
        }

        const data = await loginService(validLoginData.data)

        return res.status(201).json({
            success: true,
            message: 'Login successful',
            data,
        })

    } catch (error) {
        next(error)
    }
}

async function refresh(req, res, next) {
    try {
        const authorization = req.headers.authorization
        const token = authorization.split(' ')[1]

        const newToken = await refreshTokenService(token)

        return res.status(200).json({
            success: true,
            token: newToken
        })

    } catch (error) {
        next(error)
    }
}

async function logout (req, res, next) {
    try {

        await logoutService(req.user.sessionId)

        return res.status(204).send()

    } catch (error) {
        next(error)
    }
}

export { register, login, refresh, logout }