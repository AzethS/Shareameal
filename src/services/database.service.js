const logger = require("../helpers/log")
const mysql = require('mysql2/promise')
require('dotenv').config()

class Database {
    constructor() {
        this._connection
    }
    /**
     * @description connects to the DB.
     */
    connect() {
        logger.info(`connecting to: ${process.env.DB_DATABASE}`)
        this._connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD
        })
    }
    /**
     * @description Used to execute queries
     */
    async execute(query, stmts) {
        const [rows, fields] = await this._connection.query(query, stmts)
        return rows
    }
    /**
     * @description disconne.cts application from DB
     */
    disconnect() {
        this._connection.end()
    }


}

module.exports = new Database()