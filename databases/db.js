var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_sawbeasiswa",
  multipleStatements: true
});

module.exports = con;