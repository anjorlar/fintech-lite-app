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
    payStack: {
        TOKEN: process.env.PAYSTACK_TOKEN,
        BALANCE: process.env.PAYSTACK_BALANCE,
        RESOLVE: process.env.PAYSTACK_RESOLVE,
        CUSTOMER: process.env.PAYSTACK_CUSTOMER,
        TRANSFER: process.env.PAYSTACK_TRANSFER,
        CHARGE: process.env.PAYSTACK_URL_CHARGE,
        SUBMIT_OTP: process.env.PAYSTACK_URL_SUBMIT_OTP,
        SUBMIT_PIN: process.env.PAYSTACK_URL_SUBMIT_PIN,
        SUBMIT_PHONE: process.env.PAYSTACK_URL_SUBMIT_PHONE,
        SUBMIT_BIRTHDAY: process.env.PAYSTACK_URL_SUBMIT_BIRTHDAY,
        TRANSFER_RECIPIENT: process.env.PAYSTACK_TRANSFER_RECIPIENT
    }
}

module.exports = settings;