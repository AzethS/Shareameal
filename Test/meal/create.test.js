process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const seeder = require("../../src/helpers/seed")
const app = require("../../index")
require('dotenv').config()

chai.use(chaiHttp)

describe('UC-301 Maaltijd aanmaken', function () {
  beforeEach(async function () {
    seeder.wipeData()
  })

  it('TC-301-1 Verplicht veld ontbreekt', function () {
    seeder.populate(10)
    chai
      .request(app)
      .post("/api/studenthome/1/meal")
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

  it('TC-301-3 Maaltijd succesvol toegevoegd ', function () {
    seeder.populate(10)
    chai
      .request(app)
      .post("/api/studenthome/1/meal")
      .send({
        "name": "frkandels",
        "description": "snack",
        "creationDate": "20-11-2020",
        "serveDate": "21-11-2020",
        "price": "€29,-",
        "allergy": "contains curry",
        "ingredients": ["meat", "curry"]
      })
      .end(async function (err, response) {
        chai.expect(response).to.have.header('content-type', /json/)
        chai.expect(response).status(200)
      })
  })



})