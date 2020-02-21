const mysql = require('mysql')

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gatauu123',
    database: 'ecommerce',
    port: 3306
})

module.exports = db;