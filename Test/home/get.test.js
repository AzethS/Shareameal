
process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../../index")
const seeder = require("../../src/helpers/seed")
const home = require("../../src/services/home.service")

const homeBody = {
    name: "same-name",
    street: "same-street",
    streetNumber: 5,
    userId: 1,
    zipcode: "1234TT",
    phoneNumber: "0612345678",
    city: "same-city"
}
require('dotenv').config()
chai.use(chaiHttp)

describe('UC-202 Overzicht van studentenhuizen', function () {
    beforeEach( function () {
        seeder.wipeData()
        home.create(homeBody)
        home.create({ ...homeBody, streetNumber: 7, zipcode: "4321BA"})

    })

    it('TC-202-1 Toon nul studentenhuizen',  function () {
         seeder.wipeData()
        chai
            .request(app)
            .get("/api/studenthome")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response.body.length).to.be.equal(undefined)
                chai.expect(response).status(404)
            })
    })

    it('TC-202-2 Toon twee studentenhuizen ', function () {
        seeder.wipeData()
        home.create(homeBody)
        home.create({ ...homeBody, streetNumber: 7, zipcode: "4321BA" })
        chai
            .request(app)
            .get("/api/studenthome")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                // chai.expect(response.body.length).to.be.equal(2)
                chai.expect(response).status(200)
            })
    })

    it('TC-202-3 Toon studentenhuizen met zoekterm op niet-bestaande stad', function () {
        chai
            .request(app)
            .get("/api/studenthome?city=non-existing-city-frefsdfdsfsf")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-202-4 Toon studentenhuizen met zoekterm op niet - bestaande naam', function () {
        chai
            .request(app)
            .get("/api/studenthome?name=non-existing-name")
            .end(function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-202-5 Toon studentenhuizen met zoekterm op bestaande stad', function () {

        chai
            .request(app)
            .get("/api/studenthome?city=same-city")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
                chai.expect(response.body.length).greaterThan(0)
            })
    })

    it('TC-202-6 Toon studentenhuizen met zoekterm op bestaande naam', function () {
        chai
            .request(app)
            .get("/api/studenthome?name=same-name")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
                chai.expect(response.body.length).greaterThan(0)
            })
    })
})