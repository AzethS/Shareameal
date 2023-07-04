const user = require('../services/user.service')
const meal = require('../services/meal.service')
const home = require('../services/home.service')
const database = require("../services/database.service")
const faker = require('faker/locale/nl')

class Seed {

    /**
    * @description populate the database with homes and meals 
    */
    async populate(amount = 20) {
        this._addMasterUser()
        for(let i = 0; i < amount; i++) {
            let currentHome = await this._addHome()
            await this._addMeal(currentHome.ID)
        }

    }

    /**
    * @description Create the master user "Adam the Tester" 
    */
    async _addMasterUser() {
        const body = {
            firstName: "Adam",
            lastName: "the Tester",
            email: "adam@thetester.com",
            studentNumber: 10000,
            password: "password"
        }
        try {
        await user.create(body)
        } catch (e) {
            console.log("[TEST MASTER USER] Already exists!")
        }
    }

    /**
    * @description Add single home
    */
    async _addHome() {

         const body = {
            name: faker.lorem.word(),
            street: faker.address.streetName(),
            streetNumber: faker.datatype.number(),
            userId: 1,
            zipcode: faker.address.zipCode("####??"),
            phoneNumber: faker.phone.phoneNumber("06########"),
            city: faker.address.city()
        }
        return await home.create(body)

    }

    /**
    * @description Add single meal
    */
    async _addMeal(homeId) {

        const body = {
            name: faker.lorem.word(),
            description: faker.lorem.words(2),
            ingredients: [faker.lorem.word(1), faker.lorem.word(1)],
            allergy: faker.lorem.words(2),
            creationDate: "2021-05-17 20:20:20",
            serveDate: "2021-05-17 20:20:21",
            price: faker.datatype.number(),
            userId: 1,
            maxParticipants: 5
        }
        return await meal.create(homeId, body)

    }

    /**
     * @description whipeData is used for test cases only.
     */
    async wipeData() {
        await database.execute("DELETE FROM `meal`")
        await database.execute("ALTER TABLE `meal` AUTO_INCREMENT = 1")
        await database.execute("DELETE FROM `studenthome`")
        await database.execute("ALTER TABLE `studenthome` AUTO_INCREMENT = 1")
        
    }
}
module.exports = new Seed()