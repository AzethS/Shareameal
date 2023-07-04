const express = require('express')
const mealRoutes = express.Router({ mergeParams: true })
const mealController = require('../controllers/meal.controller')
const jwtMiddleware = require('../helpers/jwt.verify.js')

// all routes for meal

mealRoutes.put('/:mealId', jwtMiddleware, mealController.update)
mealRoutes.post('/', jwtMiddleware, mealController.create)
mealRoutes.get('/', mealController.findAll)
mealRoutes.get('/:mealId', mealController.findOne)
mealRoutes.delete('/:mealId', jwtMiddleware, mealController.remove)

module.exports = mealRoutes