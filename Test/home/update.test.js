process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const faker = require('faker/locale/nl')
require('dotenv').config()
const seeder = require("../../src/helpers/seed")

const app = require("../../index")

chai.use(chaiHttp)

const fakeData = {
    "name": faker.lorem.word(),
    "city": faker.address.city(),
    "phoneNumber": faker.phone.phoneNumber("06########"),
    "zipcode": faker.address.zipCode("####??"),
    "street": faker.address.streetName(),
    "streetNumber": faker.datatype.number()
}

describe('UC-204 Studentenhuis wijzigen', function () {
    beforeEach( function () {
        seeder.wipeData()
    })

    it('TC-204-1 Verplicht veld ontbreekt', function () {
         seeder.populate(5)
        chai
            .request(app)
            .put("/api/studenthome/2")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .send({
                "name": faker.lorem.word(),
                "city": faker.address.city(),
                "zipcode": faker.address.zipCode("####??"),
                "street": faker.address.streetName(),
                "streetNumber": faker.datatype.number()
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-204-2 Invalide postcode', function () {
        seeder.populate(5)
        chai
            .request(app)
            .put("/api/studenthome/1")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .send({
                "name": faker.lorem.word(),
                "city": faker.address.city(),
                "phoneNumber": faker.phone.phoneNumber("06########"),
                "zipcode": "666",
                "street": faker.address.streetName(),
                "streetNumber": faker.datatype.number()
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-204-3 Invalide telefoonnummer', function () {
        seeder.populate(5)
        chai
            .request(app)
            .put("/api/studenthome/1")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .send({
                "name": faker.lorem.word(),
                "city": faker.address.city(),
                "phoneNumber": "123456",
                "zipcode": faker.address.zipCode("####??"),
                "street": faker.address.streetName(),
                "streetNumber": faker.datatype.number()
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-204-4 Studentenhuis bestaat niet', function () {
        seeder.wipeData()
        chai
            .request(app)
            .put("/api/studenthome/2")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .send(fakeData)
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-204-5 Niet ingelogd', function () {
        seeder.populate(5)
        chai
            .request(app)
            .put("/api/studenthome/1")
            .send(fakeData)
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(401)
            })
    })

    it('TC-204-6 Studentenhuis succesvol gewijzigd', function () {
        seeder.populate(5)
        chai
            .request(app)
            .put("/api/studenthome/1")
            .set("Authentication", `Bearer ${process.env.JWT_TOKEN}`)
            .send(fakeData)
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })

})