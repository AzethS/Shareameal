const database = require("./database.service")
const home = require("../services/home.service")
const logger = require("../helpers/log")

class Meal {
    /**
     * @param {number} homeId - the id of the home the meal belongs to
     * @param {string} meal.mealId - The ID of the new meal
     * @param {Object} meal - The new meal details
     * @param {string} meal.name - The name of the new meal
     * @param {string} meal.description - The description of the new meal
     * @param {string} meal.ingredients - The ingredients of the new meal
     * @param {Array} meal.allergy - The allergies of the new meal
     * @param {Date} meal.creationDate - The creation date of the new meal
     * @param {Date} meal.serveDate - The serve date of the new meal
     * @param {number} meal.price - The price of the new meal
     * @param {number} meal.userId - The UserID the id of the home owner 
     * @param {number} meal.maxParticipants - The maximum amount of participants for the new meal
     */
    async create(homeId, meal) {
        const result =  await database.execute(
            "INSERT INTO `meal` (`Name`, `Description`, `Ingredients`, `Allergies`, `CreatedOn`, `OfferedOn`, `Price`, `UserID`, `StudenthomeID`, `MaxParticipants`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                meal.name,
                meal.description,
                meal.ingredients.join(', '),
                meal.allergy,
                meal.creationDate,
                meal.serveDate,
                meal.price,
                meal.userId,
                homeId,
                meal.maxParticipants
            ])
            logger.info(`[DB Meal] create`)
        return await this.findOneByMealIdAndHomeId(result.insertId, homeId);
    }

    /**
     * @param {number} mealId- The ID of the meal
     * @param {number} homeId - the id of the home the meal belongs to
     */
    async findOneByMealIdAndHomeId(mealId, homeId) {
        logger.info(`[DB Meal] findOneByMealIdAndHomeId`)
        return await database.execute("SELECT * FROM `meal` WHERE ID = ? AND StudentHomeID = ?", [mealId, homeId])
    }

    /**
     * @param {number} homeId - the id of the home the meal belongs to
     */
    async findByHomeId(homeId) {
        logger.info(`[DB Meal] findByHomeId`)
        return await database.execute("SELECT * FROM `meal` WHERE StudentHomeID = ?", [homeId])
    }

    /**
 * @param {number} homeId - the id of the home the meal belongs to
 * @param {string} meal.mealId - The ID of the new meal
 * @param {Object} meal - The new meal details
 * @param {string} meal.name - The name of the new meal
 * @param {string} meal.description - The description of the new meal
 * @param {string} meal.ingredients - The ingredients of the new meal
 * @param {Array} meal.allergy - The allergies of the new meal
 * @param {Date} meal.creationDate - The creation date of the new meal
 * @param {Date} meal.serveDate - The serve date of the new meal
 * @param {number} meal.price - The price of the new meal
 * @param {number} meal.userId - The UserID the id of the home owner 
 * @param {number} meal.maxParticipants - The maximum amount of participants for the new meal
 */
    async update(homeId, mealId, meal) {
        await database.execute(
            "UPDATE `meal` SET `Name` = ?, `Description` = ?, `Ingredients` = ?, `Allergies` = ?, `CreatedOn` = ?, `OfferedOn` = ?, `Price` = ?, `MaxParticipants` = ? WHERE StudentHomeID = ? AND ID = ?",
            [
                meal.name,
                meal.description,
                meal.ingredients.join(', '),
                meal.allergy,
                new Date(meal.creationDate),
                new Date(meal.serveDate),
                meal.price,
                meal.maxParticipants,
                homeId,
                mealId
                
            ])
            logger.info(`[DB Meal] update`)
        return await this.findOneByMealIdAndHomeId(mealId, homeId)
    }

    /**
     * @param {number} mealId- The ID of the meal
     * @param {number} homeId - the id of the home the meal belongs to
     */
    async femoveFromMealIdAndHomeId(mealId, homeId) {
        await database.execute("DELETE FROM `meal` WHERE id = ? AND StudentHomeID = ?", [mealId, homeId])
        logger.info(`[DB Meal] femoveFromMealIdAndHomeId`)
        return home.findOne(homeId)
    }
}
module.exports = new Meal()

