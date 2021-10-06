
const { StatusCodes } = require("http-status-codes");

const httpResponse = {
    errorResponse(res, message = '', statusCodes = StatusCodes.INTERNAL_SERVER_ERROR) {
        return res.status(statusCodes).send({
            error: true,
            code: statusCodes,
            message
        });
    },
    successResponse(res, data = {}, message = '', statusCodes = StatusCodes.OK) {
        return res.status(statusCodes).send({
            error: false,
            code: statusCodes,
            message,
            data
        });
    }
}

module.exports = httpResponse