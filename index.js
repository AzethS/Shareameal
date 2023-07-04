
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const logger = require("./src/helpers/log")
const database = require('./src/services/database.service')
const controller = require('./src/controllers/default.controller')
const apiRoutes = require('./src/routes/api.routes')
database.connect();

app.use(express.json())

app.use(controller.getAll)

app.use('/api', apiRoutes)

app.use('/*', controller.endpointNotFound)

app.use(controller.showError)

app.listen(port, () => {
    // database.seed(100)
    logger.info('Server is running')
})

module.exports = app
