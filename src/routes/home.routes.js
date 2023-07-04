const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/home.controller')
const mealRoutes = require('./meals.routes')
const jwtMiddleware = require('../helpers/jwt.verify.js')


// all routes for homes
homeRouter.put('/:homeId', jwtMiddleware, homeController.update)
homeRouter.post('/', jwtMiddleware, homeController.create)
homeRouter.delete('/:homeId', jwtMiddleware, homeController.remove)
homeRouter.get('/:homeId', homeController.findOneById)
homeRouter.get('/', homeController.findByQuery)

/*
*  The reason Meal routes are here is because the all meal routes 
*  use the same base url as the ones from the home routes.
*  This is because meals are always inside a studenthome.
*/ 

homeRouter.use('/:homeId/meal', mealRoutes)


module.exports = homeRouter