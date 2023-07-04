const logger = require("../helpers/log")

let controller = {
    getAll(req, res, next) {
        const requestMethod = req.method
        const reqUrl = req.url
        logger.info('[DefaultController] all:', requestMethod, reqUrl)
        next()
    },

    endpointNotFound(req, res, next) {
        next({
            error: "Endpoint " + req.baseUrl + " does not exist ",
            code: 404
        })
        logger.info('[DefaultController] endpointNotFound')
    },

    showError(error, req, res, next) {
        const errorCode = error.code || 500
        res.status(errorCode).json({
            ...error
        })
        logger.info('Errorhandler called!')
        logger.info(error)

    }
}

module.exports = controller