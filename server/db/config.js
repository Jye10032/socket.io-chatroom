const mysql = require('mysql')

const connectdb = () => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456abc',
        port: '3306',
        database: 'websocket'
    })
    return connection;
}

module.exports = connectdb;