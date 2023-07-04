process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../../index")
const seeder = require("../../src/helpers/seed")
require('dotenv').config()

chai.use(chaiHttp)

describe('UC-304 Details van een maaltijd opvragen', function () {
    beforeEach(function () {
        seeder.wipeData()
    })

    it('TC-303-1 Lijst van maaltijden geretourneerd', function () {
        seeder.populate(10)
        chai
            .request(app)
            .get("/api/studenthome/1/meal")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })



})