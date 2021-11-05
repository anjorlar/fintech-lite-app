const jwt = require('jsonwebtoken');
const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require('http-status-codes');
const httpResponse = require('../utils/response');
const settings = require('../config/settings');

/**
 * authToken
 * @desc A middleware to authenticate users token on login 
 * @param {Object} req request any
 * @param {Object} res response any
 * @param {Function} next nextfunction middleware
 * @returns {void|Object} object
 */
const authToken = async (req, res, next) => {
    try {
        let token =
            req.headers.authorization === undefined ? "" : req.headers.authorization;

        if (token.includes("Bearer")) {
            const checkBearer = req.headers.authorization.split(" ");
            token = checkBearer[1];
        } else {
            token = req.headers.authorization;
        }
        if (!token)
            return httpResponse.errorResponse(
                res,
                "Unauthorised access",
                StatusCodes.UNAUTHORIZED
            );
        const authVerify = await jwt.verify(token, settings.jwt.SECRETKEY);
        if (!authVerify)
            return httpResponse.errorResponse(
                res,
                "Invalid request or token expire",
                StatusCodes.UNAUTHORIZED
            );
        req.decodedUserData = authVerify
        next();
    } catch (error) {
        if (error.message === "jwt expired")
            return httpResponse.errorResponse(
                res, "token expired", StatusCodes.UNAUTHORIZED
            );
        if (error.message)
            return httpResponse.errorResponse(
                res, error.message, StatusCodes.UNAUTHORIZED
            );
        if (error)
            return httpResponse.errorResponse(
                res, "Something went wrong with user login token", StatusCodes.BAD_REQUEST
            );
    }
};

module.exports = authToken;
