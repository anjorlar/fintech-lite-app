/**
 * load environmental variables with dotenv
 * 
 */

const dotenv = require("dotenv")
dotenv.config()

const settings = {
    appName: "fintech-app",
    environment: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    jwt: {
        SECRETKEY: process.env.JWT_SECRET_KEY,
        expires: Number(process.env.JWT_EXPIRY),
        issuer: process.env.ISSUER,
        alg: process.env.JWT_ALG
    },
    salt: Number(process.env.SALT_ROUND),
}

module.exports = settings;