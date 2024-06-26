// import dotenv and jwt 
import 'dotenv/config'
import jwt from 'jsonwebtoken'
const { sign,verify} = jwt

function generateToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userPass: user.userPass
    }, process.env.secret_key, {
        expiresIn: '1h'
    })
}

function verifyToken(req, res, next) {
    const token = req?.headers['Authorization']
    if (token) {
        if (verify(token, process.env.secret_key)) {
            next()
        } else {
            res?.json({
                status: res.errorCode,
                message: "Email or password combination are incorrect. Retry."
            })
        }
    } else {
        res?.json({
            status: res.errorCode,
            msg: "Proceed to login."
        })
    }
}

export {
    generateToken,
    verifyToken
}