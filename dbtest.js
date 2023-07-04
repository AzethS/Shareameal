const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
    
        host: process.env.DB_HOST,
        user: process.env.DB_USER ,
        database: process.env.DB_DATABASE ,
        password: process.env.DB_PASSWORD ,
        connectionLimit: 10,
    
})

connection.connect();

connection.query(
    'SELECT Name, Id FROM meal;',
    function (error, results, fields){
        if(error) throw error
        console.log('The solution is: ', results)
    }
)

connection.end()