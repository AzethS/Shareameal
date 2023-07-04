process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../../index")
const { seed } = require("../../src/controllers/home.controller")
const seeder = require("../../src/helpers/seed")
require('dotenv').config()

chai.use(chaiHttp)

describe('UC-303 Lijst van maaltijden opvragen', function () {
    beforeEach(function () {
        seeder.wipeData()
    })

    it('TC-304-1 Maaltijd bestaat niet', function () {
        seeder.populate(5)
        chai
            .request(app)
            .get("/api/studenthome/1/meal/2")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('C-304-2 Details van maaltijd geretourneerd', function () {
        seeder.populate(5)
        chai
            .request(app)
            .get("/api/studenthome/1/meal/1")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })



})