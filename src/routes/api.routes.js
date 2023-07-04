// this file is referenced inside server.js
const express = require('express')
const apiRouter = express.Router()
const homeRoutes = require('./home.routes')
const authRoutes = require('./auth.routes')

function getInfo(req, res) {
    const student = {
        naam: "Fairys Ardhana",
        studentnummer: "2175412",
        opleiding: "IT",
        bescrhijving: "Een project van shareameal",
        SonarQube: "https://sonarqube.avans-informatica-breda.nl/dashboard?id=NodeJs-Server",
    }
    res.send(student)
}


apiRouter.get('/info', getInfo)
apiRouter.use('/studenthome', homeRoutes)
apiRouter.use('/auth', authRoutes)

module.exports = apiRouter