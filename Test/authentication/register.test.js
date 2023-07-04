process.env.PORT = 3001
process.env.NODE_ENV = "testing"

const chai = require("chai")
const chaiHttp = require('chai-http')
const app = require("../../index")
require('dotenv').config()

describe('UC-101 Registreren', function () {

    it('TC-101-1 Verplicht veld ontbreekt', function () {
        chai
            .request(app)
            .post("/api/auth/register")
            .send({
                // "firstName": "Adam",
                "lastName": "the Tester",
                "email": "adam@thetester.com",
                "studentNumber": 10000,
                "password": "password"
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-101-2 Invalide email adres', function () {
        chai
            .request(app)
            .post("/api/auth/register")
            .send({
                // "firstName": "Adam",
                "lastName": "the Tester",
                "email": "nope.com",
                "studentNumber": 10000,
                "password": "password"
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

        it('TC-101-3 Invalide wachtwoord', function () {
        chai
            .request(app)
            .post("/api/auth/register")
            .send({
                // "firstName": "Adam",
                "lastName": "the Tester",
                "email": "nope.com",
                "studentNumber": 10000,
                "password": 000
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

    it('TC-101-4 Gebruiker bestaat al', function () {
        chai
            .request(app)
            .post("/api/auth/register")
            .send({
                "firstName": "Adam",
                "lastName": "the Tester",
                "email": "adam@thetester.com",
                "studentNumber": 10000,
                "password": "password"
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(400)
            })
    })

        it('TC-101-5 Gebruiker succesvol geregistreerd', function () {
        chai
            .request(app)
            .post("/api/auth/register")
            .send({
                "firstName": "Adam2",
                "lastName": "the Tester",
                "email": "adam2@thetester.com",
                "studentNumber": 10001,
                "password": "password2"
            })
            .end(async function (err, response) {
                chai.expect(response).to.have.header('content-type', /json/)
                chai.expect(response).status(200)
            })
    })

})