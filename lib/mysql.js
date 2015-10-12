var mysql  = require('mysql');
var config = require('../config'); 
console.log(config.db); 
var connection = mysql.createConnection({
    host     : config.db.host, 
    port     : config.db.port, 
    user     : config.db.user, 
    password : config.db.password, 
    database : config.db.database
});

connection.connect(); 

module.exports = connection; 