const logger = require("../helpers/log")
const BodyValidator = require("../helpers/body.validator")
const meal = require("../services/meal.service")
const home = require("../services/home.service")

const types = {
    name: "string",
    description: "string",
    creationDate: "date",
    serveDate: "date",
    price: "number",
    allergy: "string",
    ingredients: "Array",
    maxParticipants: "number"
}
class MealController {
    /**
     *  @description creates a meal for a home
     */
    async create({ params, body, user }, res, next) {
        body.userId = user
        logger.info('[MealsController]: create')
        const bodyValidator = new BodyValidator(types)

        if (!bodyValidator.validate(body)) {
            logger.info('[MealsController]: create failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }
        const mealHome = await home.findOne(params.homeId)
        if (!mealHome.length) {
            logger.info('[MealsController]: update failed')
            return next({ error: "Not Found", message: "home does not exit", code: 404 })
        }

        let existingMeal = await meal.findOneByMealIdAndHomeId(body.id, params.homeId)
        if (existingMeal.length) {
            logger.info('[MealsController]: create failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: `meal with id: ${body.id} already exists`
            })
        }
        res.send(await meal.create(params.homeId, body))
        logger.info('[MealsController]: create successful')
    }
    /**
     *  @description displays all meals inside a student home
     */
    async findAll({ params }, res, next) {
        logger.info('[MealsController]: findAll')
        const mealHome = await home.findOne(params.homeId)
        if (!mealHome.length) {
            logger.info('[MealsController]: findAll failed')
            return next({ error: "Not Found", message: "home does not exit", code: 404 })
        }

        logger.info('[MealsController]: findAll successful')
        res.send(await meal.findByHomeId(params.homeId))

    }
    /**
     *  @description finds a specific meal inside a home
     */

    async findOne({ params }, res, next) {
        logger.info('[MealsController]: findOne')
        const mealHome = await home.findOne(params.homeId)
        if (!mealHome.length) {
            logger.info('[MealsController]: findOne failed')
            return next({ error: "Not Found", message: "home does not exit", code: 404 })
        }

        const detailMeal = await meal.findOneByMealIdAndHomeId(params.mealId, params.homeId)
        if (!detailMeal.length) {
            logger.info('[MealsController]: findOne failed')
            return next({ error: "Not Found", message: "meal does not exit", code: 404 })
        }

        logger.info('[MealsController]: findOne successful')
        res.send(...detailMeal)
    }
    /**
     * @description updates the meal from a home by replacing its own content with the requested information.
     */
    async update({ params, body, user }, res, next) {
        body.userId = user
        logger.info('[MealsController]: update')

        const bodyValidator = new BodyValidator(types)
        if (!bodyValidator.validate(body)) {
            logger.info('[MealsController]: update failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        const mealHome = await home.findOne(params.homeId)
        if (!mealHome.length) {
            logger.info('[MealsController]: update failed')
            return next({ error: "Not Found", message: "home does not exit", code: 404 })
        }

        const currentMeal = await meal.findOneByMealIdAndHomeId(params.mealId, params.homeId)
        if (!currentMeal.length) {
            logger.info('[MealsController]: update failed')
            return next({ error: "Not Found", message: "meal does not exist", code: 404 })
        }

        if (currentMeal.id === params.mealId) {
            logger.info('[MealsController]: update failed')
            return next({ error: "Not Found", message: `meal with id: ${params.mealId} already exists`, code: 404 })
        }

        if (body.userId != currentMeal[0].UserID) {
            return next({
                code: 401,
                message: "Unauthorized",
                error: "You do not have permission over this meal"
            })
        }

        res.send(await meal.update(params.homeId, params.mealId, body))
        logger.info('[MealsController]: update successful')
    }
    /**
     *  @description removes a meal form the home
     */
    async remove({ params, user }, res, next) {
        const userId = user
        logger.info('[MealsController]: remove')

        const mealHome = await home.findOne(params.homeId)
        if (!mealHome.length) {
            logger.info('[MealsController]: remove failed')
            return next({ error: "Not Found", message: "home does not exit", code: 404 })
        }

        const currentMeal = await meal.findOneByMealIdAndHomeId(params.mealId, params.homeId)
        if (!currentMeal.length) {
            logger.info('[MealsController]: remove failed')
            return next({ error: "Not Found", message: "meal does not exist", code: 404 })
        }

        if (userId != currentMeal[0].UserID) {
            return next({
                code: 401,
                message: "Unauthorized",
                error: "You do not have permission over this meal"
            })
        }

        res.send(await meal.femoveFromMealIdAndHomeId(params.mealId, params.homeId))
        logger.info('[MealsController]: remove successful')

    }
}

module.exports = new MealController()