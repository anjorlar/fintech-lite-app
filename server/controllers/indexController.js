const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require('http-status-codes');
const httpResponse = require('../utils/response');
const indexService = require('../services/indexService')
const settings = require('../config/settings')

class indexController {
    /**
     * @description A user signs up when the required data is passed in the body
     * @param {Object} req  req - Http Request object
     * @param {Object} res  res - Http Response object
     * @returns {Object} returns object of the required response
     */
    async userSignUp(req, res) {
        try {
            let { name, email, password } = req.body
            //check if all data is passed
            if (!name || !email || !password) {
                return httpResponse.errorResponse(res, 'all field (name, email, password) is required', StatusCodes.BAD_REQUEST)
            }

            //checks if user exist
            const userExist = await indexService.getUser(email)
            if (userExist) {
                return httpResponse.errorResponse(res, `User already exist`, StatusCodes.BAD_REQUEST)
            }
            const data = {
                email: email.toLowerCase(),
                name: name.toLowerCase(),
                password
            }

            // creates user
            const user = await indexService.createUser(data)

            // const token = user.
            if (user) {
                const payload = {
                    id: user.id,
                    email: email.toLowerCase(),
                    name: name.toLowerCase(),
                }
                // creates token
                const token = await jwt.sign(payload, settings.jwt.SECRETKEY, {
                    expiresIn: settings.jwt.expires,
                    subject: settings.appName,
                    algorithms: [settings.jwt.alg],
                    issuer: settings.jwt.issuer
                })
                // creates wallet
                const createUserWallet = await indexService.createUserWallet();
                if (createUserWallet) {
                    return httpResponse.successResponse(res, { payload, token }, `User created successfully`, StatusCodes.OK)
                } else {
                    return httpResponse.errorResponse(res, `User Wallet could not be created`, StatusCodes.BAD_REQUEST)
                }
            } else {
                return httpResponse.errorResponse(res, `User could not be created`, StatusCodes.BAD_REQUEST,)
            }
        } catch (error) {
            console.error('internal server error', error)
            return httpResponse.errorResponse(res, `Internal server error`, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

module.exports = new indexController()