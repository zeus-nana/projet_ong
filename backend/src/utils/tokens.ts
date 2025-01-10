import jwt, { verify } from 'jsonwebtoken'
import appConfig from '../config'

const signToken = (id: number, email: string) => {
    return jwt.sign({ id, email }, appConfig.auth.jwt.secret as string, {
        expiresIn: appConfig.auth.jwt.expiresIn,
    })
}

const jwtVerify = async function (token: string, secret: string): Promise<any> {
    return new Promise((resolve, reject) => {
        verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err)
            }
            resolve(decoded)
        })
    })
}

export { signToken, jwtVerify }
