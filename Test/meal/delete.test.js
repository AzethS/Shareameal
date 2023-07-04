process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const { seed } = require("faker/locale/nl")
const app = require("../../index")
const seeder = require("../../src/helpers/seed")
require('dotenv').config()

chai.use(chaiHttp)

describe('UC-305 Maaltijd verwijderen', function () {
    beforeEach(async function () {
        seeder.wipeData()
    })
    /*
    * No data is sent when deleting. Therefore test case: TC-305-1 Verplicht veld ontbreekt
    * From the document will be replaced with: TC-305-1 studentenhuis bestaat niet.
    */
    it('TC-305-1 studentenhuis bestaat niet', function () {
        seeder.populate(10)
        chai
            .request(app)
            .delete("/api/studenthome/2/meal/1")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-305-4 Maaltijd bestaat niet', function () {
        seeder.populate(10)
        chai
            .request(app)
            .delete("/api/studenthome/1/meal/-1")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-305-5 Maaltijd succesvol verwijderd ', function () {
        seeder.populate(10)
        chai
            .request(app)
            .delete("/api/studenthome/1/meal/1")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })




})