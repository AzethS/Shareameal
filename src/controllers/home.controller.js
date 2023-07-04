const logger = require("../helpers/log")
const BodyValidator = require("../helpers/body.validator")
const home = require("../services/home.service")

const types = {
    name: "string",
    city: "string",
    phoneNumber: "string",
    zipcode: "string",
    street: "string",
    streetNumber: "number",
}
class HomeController {
    /**
     * @description creates a home and assigns the logged in created as its home admin.
     */
    async create({ body, user  }, res, next) {
        body.userId = user
        logger.info('[HomesController]: create')

        const bodyValidator = new BodyValidator(types)

        if (!bodyValidator.validate(body)) {
            logger.info('[HomesController]: create failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }

        logger.info('[HomesController]: create found all arguments for new home')
        const homeWithZipcode = await home.findByPostalCodeAndStreetNumber(body.zipcode, body.streetNumber)
        if (homeWithZipcode.length) {
            logger.info('[HomesController]: create failed')
            return next({
                code: 400,
                message: "Postalcode with street number already exists",
                error: "Bad Request"
            })
        }

        logger.info('[HomesController]: create successful')
        return res.send(await home.create(body))
    }
    /**
     * @description removes a home from the database with all its meals
     */
    async remove({ params, user }, res, next) {
        const userId = user
        logger.info('[HomesController]: remove')
        const deletedHome = await home.findOne(params.homeId)
        if (!deletedHome.length) {
            logger.info('[HomesController]: remove failed')
            return next({
                code: 404,
                message: "Home doesn't exist",
                error: "Not Found"
            })
        }
        
        if(userId != deletedHome[0].UserID) {
            return next({
                code: 401,
                message: "Unauthorized",
                error: "You do not have permission over this home"
            })
        }
        await home.removeFromId(params.homeId)
        logger.info('[HomesController]: remove successful')
        logger.debug('[HomesController]: removed home with ID:', params.homeId)
        res.send({ message: "removal successful" })
    }

    /**
     * @description updates the current data of a home
     */
    async update({ params, body, user  }, res, next) {
        body.userId = user
        const bodyValidator = new BodyValidator(types)
        logger.info('[HomesController]: update')

        if (!bodyValidator.validate(body)) {
            logger.info('[HomesController]: update failed')
            return next({
                code: 400,
                error: "Bad Request",
                message: bodyValidator.errors
            })
        }


        const updatedHome = await home.findOne(params.homeId)
        const homeWithZipcode = await home.findByPostalCodeAndStreetNumber(body.zipcode, body.streetNumber)
        if (!updatedHome.length) {
            logger.info('[HomesController]: update failed')
            return next({
                code: 404,
                error: "Home doesn't exist",
                message: "Not Found"
            })
        }

        if (body.userId != updatedHome[0].UserID) {
            return next({
                code: 401,
                message: "Unauthorized",
                error: "You do not have permission over this home"
            })
        }

        if (homeWithZipcode.length) {
            if (params.homeId !== homeWithZipcode.id) {
                logger.info('[HomesController]: update failed')
                logger.debug('[HomesController]: update body:', body.name, body.city, body.phoneNumber, body.zipcode)
                return next({
                    code: 400,
                    message: "Postalcode with street number already exists",
                    error: "Bad Request"
                })
            }
        }

        logger.info('[HomesController]: update successful')
        res.send(await home.update(params.homeId, body))
    }
    /**
     * @description finds a home based on the query data name and city
     */
    async findByQuery({ query }, res, next) {
        logger.info('[HomesController]: findByQuery')
        let returnValue
        if (query.name === undefined && query.city === undefined) {
            returnValue = await home.findAll()
            logger.info('[HomesController]: findByQuery showing all, no query')
        } else if (query.name === undefined) {
            logger.info('[HomesController]: findByQuery no name only city')
            returnValue = await home.findByCity(query.city)
        } else if (query.city === undefined) {
            returnValue = await home.findByName(query.name)
            logger.info('[HomesController]: findByQuery no city only name')
        } else {
            logger.info('[HomesController]: findByQuery find name and city')
            returnValue = await home.findByNameAndCity(query)
        }

        if (!returnValue.length) {
            logger.info('[HomesController]: findByQuery failed')
            return next({
                code: 404,
                message: "No homes found",
                error: "Not Found"
            })
        }
        logger.info('[HomesController]: findByQuery successful')
        res.send(returnValue)
    }
    /**
     * @description finds a specific home via the home's ID
     */
    async findOneById({ params }, res, next) {
        logger.info('[HomesController]: findOneById')
        const newHome = await home.findOne(params.homeId)
        if (!newHome.length) {
            logger.info('[HomesController]: findOneById failed')
            return next({
                code: 404,
                message: `Home with id ${params.homeId} doesn't exist`,
                error: "Not Found"
            })
        }
        logger.info('[HomesController]: successful')
        return res.send(newHome)
    }
    /**
     * @description produceert zaad
     */
    seed({ params }, res) {
        const totalRows = params.count ? params.count : 10000
        database.seed(totalRows)
        res.send({
            message: "M'n zaad is gestrooid",
            results: database.db
        })
    }
}
module.exports = new HomeController()