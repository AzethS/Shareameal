const jwt = require('jsonwebtoken')
const logger = require("../helpers/log")
const user = require("../services/user.service")
const BodyValidator = require("../helpers/body.validator")
const bcrypt = require('bcrypt')
require('dotenv').config()
const loginTypes = {
    email: "email",
    password: "string"
}

class AuthController {

    async login({ body }, res, next) {
        const bodyValidator = new BodyValidator(loginTypes)
        if (!bodyValidator.validate(body)) {
            logger.info('[AuthController]: login failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        const loginUser = await user.findByEmail(body.email)
        if (!loginUser.length) {
            logger.info('[AuthController]: login failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: "User wit this email doesn't exist."
            })
        }

    
        const match = await bcrypt.compare(body.password, loginUser[0].Password)
        if (match === false) {
            logger.info('[AuthController]: login failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: "Incorrect password"
            })
        }

        logger.info('[AuthController]: login successful')
        try {
        const token = jwt.sign(loginUser[0].ID, process.env.JWT_SECRET)
        res.send({token})
        } catch(e) {
            console.log(e)
            res.send({error: "Database didn't respond"})
        }
    }
}

module.exports = new AuthController()
