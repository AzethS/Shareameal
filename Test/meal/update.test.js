process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../../index")
const seeder = require("../../src/helpers/seed")
require('dotenv').config()

chai.use(chaiHttp)
const fakeData = {
    "name": "frkandels",
    "description": "snack",
    "creationDate": "20-11-2020",
    "serveDate": "21-11-2020",
    "price": "€29,-",
    "allergy": "contains curry",
    "ingredients": ["meat", "curry"]
}

describe('UC-302 Maaltijd wijzigen', function () {
    beforeEach(function () {
        seeder.wipeData()
    })

    it('TC-302-1 Verplicht veld ontbreekt', function () {
        seeder.populate(5)
        chai
            .request(app)
            .put("/api/studenthome/1/meal/1")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .send({
                "name": "frkandels",
                "description": "snack",
                "creationDate": "20-11-2020",
                "serveDate": "21-11-2020",
                // "price": "€29,-",
                "allergy": "contains curry",
                "ingredients": ["meat", "curry"]
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-302-4 Maaltijd bestaat niet', function () {
        seeder.populate(5)
        chai
            .request(app)
            .put("/api/studenthome/1/meal/10")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .send(fakeData)
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-302-5 Maaltijd succesvol gewijzigd ', function () {
        seeder.populate(5)
        chai
            .request(app)
            .put("/api/studenthome/1/meal/1")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .send(fakeData)
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
                chai.expect(response.body.id).equal(1)
            })
    })

})