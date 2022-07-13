const mysql = require("mysql");
const bodyParser = require("body-parser");
const framework = require("express");

let morgan = require("morgan");
const app = framework();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const router = require("./src/route/peserta-route.js");
app.use("/", router);

app.use('/auth', require('./src/middleware'));

app.listen(8081, () => {
    console.log("SERVER JALAN");
})