import 'dotenv/config'

const vars = process.env

const env = {
    mongoUri : vars.MONGO_URI,
    backendPort : vars.BACK_END_PORT,
    backendHost : vars.BACK_END_HOST,
    jwtSecret: vars.JWT_SECRET,
    jwtExpiresIn: vars.JWT_EXPIRES_IN,
    refreshTokenExpiresIn: vars.REFRESH_TOKEN_EXPIRES_IN
}

export default env