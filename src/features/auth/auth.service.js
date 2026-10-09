import { hashPassword, verifyPassword, removePasswordHashFromUserObj } from '../../utils/password.service.js'
import User from '../users/users.module.js'
import RefreshToken from "../refreshTokens/refreshToken.module.js"
import jwt from 'jsonwebtoken'
import generateToken from '../../utils/generateJwt.js'
import generateRefreshToken from '../../utils/generateRefreshToken.js'
import getExpirationDate from '../../utils/getExpirationDate.js'
import env from '../../config/env.js'

export async function registerService(body) {

    const { name, email, password, passwordConfirmation } = body

    if (password !== passwordConfirmation) {
        const error = new Error('Password and Password confirmation must be the same !')
        error.name = 'ValidationError'
        throw error
    }

    const isEmailExist = await User.findOne({ email })

    if (isEmailExist) {
        const error = new Error('Email is already exist !')
        error.name = 'ValidationError'
        throw error
    }

    const passwordHash = await hashPassword(password)

    let user = await User.create({
        name,
        email,
        passwordHash,
        status: "active"
    })

    user = removePasswordHashFromUserObj(user)
    const refreshTokenValue = generateRefreshToken()
    const expiresAt = getExpirationDate()

    const refreshToken = await RefreshToken.create({
        tokenHash: refreshTokenValue,
        userId: user._id,
        expiresAt,
    })

    const JwtToken = generateToken({ userId: user._id, sessionId: refreshToken._id })

    return {
        user,
        token: JwtToken
    }
}

export async function loginService(body) {
    const { email, password } = body

    let user = await User.findOne({ email }).select("+passwordHash")

    if (!user || !(await verifyPassword(user.passwordHash, password))) {
        const error = new Error('Invalid email or password. Please try again!')
        error.name = 'ValidationError'
        throw error
    }

    user = removePasswordHashFromUserObj(user)

    const refreshTokenValue = generateRefreshToken()
    const expiresAt = getExpirationDate()

    const refreshToken = await RefreshToken.create({
        tokenHash: refreshTokenValue,
        userId: user._id,
        expiresAt,
    })

    const JwtToken = generateToken({ userId: user._id, sessionId: refreshToken._id })

    return {
        user,
        token: JwtToken
    }
}

export async function refreshTokenService(token) {

    const tokenDecoded = jwt.verify(token, env.jwtSecret, {
        ignoreExpiration: true
    })

    if (!tokenDecoded?.userId || !tokenDecoded?.sessionId) {
        const error = new Error("Invalid access token");
        error.name = "AuthenticationError";
        error.status = 401;
        throw error;
    }

    const refreshToken = await RefreshToken.findOne({ _id: tokenDecoded.sessionId })

    if (!refreshToken) {
        const error = new Error("Session expired, please log again!")
        error.name = "AuthenticationError"
        error.status = 401
        throw error
    }

    const TokenExpiredDateOnMiliseconds = new Date(refreshToken.expiresAt).getTime()

    if (TokenExpiredDateOnMiliseconds < Date.now() || refreshToken.revokedAt !== null) {
        const error = new Error("Session expired, please log again!")
        error.name = "AuthenticationError"
        error.status = 401
        throw error
    }

    const newAccessToken = generateToken({ userId: tokenDecoded.userId, sessionId: tokenDecoded.sessionId })

    return newAccessToken
}

export async function logoutService(sessionId) {

    const session = await RefreshToken.findOneAndDelete({
        _id: sessionId
    })

    if (!session) {
        const error = new Error("Session not found")
        error.name = "AuthenticationError"
        error.status = 401
        throw error
    }

    return true
}