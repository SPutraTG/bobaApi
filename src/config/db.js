let mysql = require("mysql");

let config = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",
    database: "boba",
    multiStatements: true,
});

module.exports = config;