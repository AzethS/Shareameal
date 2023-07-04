process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../../index")
const seeder = require("../../src/helpers/seed")
require('dotenv').config()
chai.use(chaiHttp)

describe('UC-203 Details van studentenhuis', function () {
    beforeEach( function () {
         seeder.wipeData()
    })

    it('TC-203-1 Studentenhuis-ID bestaat niet',  function () {
         seeder.populate(8)
        chai
            .request(app)
            .get("/api/studenthome/11")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(404)
            })
    })

    it('TC-203-2 Studentenhuis-ID bestaat',  function () {
         seeder.populate(3)
        chai
            .request(app)
            .get("/api/studenthome/1")
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response.body).length(1)
                chai.expect(response).status(200)
            })
    })

})