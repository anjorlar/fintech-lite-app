const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require('http-status-codes');
const httpResponse = require('../utils/response');
const indexService = require('../services/indexService')
const settings = require('../config/settings')


class IndexController {
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
            // hashes the password
            const salt = await bcrypt.genSalt(10)
            const userHashedPassword = await bcrypt.hash(password, salt)
            const data = {
                email: email.toLowerCase(),
                name: name.toLowerCase(),
                password: userHashedPassword
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
                    algorithm: settings.jwt.alg,
                    issuer: settings.jwt.issuer
                })
                // creates wallet
                const createUserWallet = await indexService.createUserWallet(user.id);
                if (createUserWallet) {
                    return httpResponse.successResponse(res, { user, token }, `User created successfully`, StatusCodes.OK)
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

    /**
  * @description A user logs in when the required data is passed in the body
  * @param {Object} req  req - Http Request object
  * @param {Object} res  res - Http Response object
  * @returns {Object} returns object of the required response
  */
    async login(req, res) {
        try {
            let { email, password } = req.body
            if (!email || !password) {
                return httpResponse.errorResponse(res, 'Please enter an email and password', StatusCodes.BAD_REQUEST)
            }
            const user = await indexService.getUser(email)
            console.log("user user", user)
            if (!user) {
                return httpResponse.errorResponse(res, 'Invalid Credentials', StatusCodes.BAD_REQUEST)
            }
            if (user.isDeleted === true) {
                return httpResponse.errorResponse(res, 'user is inactive please contact admin to activate user', StatusCodes.NO_CONTENT)
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return httpResponse.errorResponse(res, 'email or password is incorrect', StatusCodes.FORBIDDEN)
            }
            const payload = {
                id: user.dataValues.id,
                email: email.toLowerCase(),
                name: user.dataValues.name
            }
            const token = await jwt.sign(payload, settings.jwt.SECRETKEY, {
                expiresIn: settings.jwt.expires,
                subject: settings.appName,
                algorithm: settings.jwt.alg,
                issuer: settings.jwt.issuer
            })
            return httpResponse.successResponse(
                res, { user, token }, `User Signed in Successfully`, StatusCodes.OK
            )
        }
        catch (err) {
            console.error('internal server error', err)
            return httpResponse.errorResponse(
                res, 'Internal Server Error', StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

module.exports = new IndexController()