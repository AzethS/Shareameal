const logger = require("../helpers/log")
const BodyValidator = require("../helpers/body.validator")
const user = require("../services/user.service")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const types = {
    firstName: "string",
    lastName: "string",
    email: "email",
    studentNumber: "Number",
    password: "string"
}

class UserController {
    /**
     * @description creates a user and gives it an authentication token when successfully registered
     */
    async create({body}, res, next) {
        logger.info('[UserController]: create')
        const bodyValidator = new BodyValidator(types)

        if (!bodyValidator.validate(body)) {
            logger.info('[UserController]: create failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        const existingUser = await user.findByEmail(body.email) 
        
        if(existingUser.length) {
            return next({
                code: 400,
                error: "Bad Request",
                message: "Email already in use"
            })
        }

        const newUser = await user.create(body)
        const secret = process.env.JWT_SECRET
        const token = jwt.sign(newUser[0].ID, secret)

        logger.info('[UserController]: create successful')
         return res.send({...newUser[0], token})
    }
}
 module.exports = new UserController()