


/**
 * authToken
 * @desc A middleware to authenticate users token on login 
 * @param {Object} req request any
 * @param {Object} res response any
 * @param {Function} next nextfunction middleware
 * @returns {void|Object} object
 */
const authToken = async (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) {
        const errMessage = "Access denied. No token provided."
        return httpResponse.errorResponse(res, errMessage, StatusCodes.UNAUTHORIZED)
    }
    const token = bearerToken.split(' ')[0];
    //verify token
    try {
        const decoded = utils.verifyToken(token)

        req.id = decoded.id;

        next()
    } catch (err) {
        console.log('>>>>>>> err', err)
        // const errMessage = "Invalid token. Please login"
        return httpResponse.errorResponse(res, err.message, StatusCodes.UNAUTHORIZED)
    }
};

module.exports = authToken;
