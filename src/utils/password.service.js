import argon2 from "argon2"

async function hashPassword(password) {

    const passwordHash = await argon2.hash(password, {
        type: argon2.argon2id
    })

    return passwordHash
}

async function verifyPassword(passwordHash, password) {

    const result = await argon2.verify(passwordHash, password)

    return result
}

function removePasswordHashFromUserObj(user) {

    user = [user].map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }))

    user = user[0]

    return user
}

export { hashPassword, verifyPassword, removePasswordHashFromUserObj }