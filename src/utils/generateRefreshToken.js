import {randomBytes} from "crypto"

function generateRefreshToken(){
    return randomBytes(64).toString('hex')
}

export default generateRefreshToken