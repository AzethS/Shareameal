const express = require('express')
const authRouter = express.Router()
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')

// all routes for homes
authRouter.post('/register', userController.create)
authRouter.post('/login', authController.login)

module.exports = authRouter