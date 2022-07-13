const mysql = require("mysql");
const bodyParser = require("body-parser");
const framework = require("express");

const app = framework();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./src/route/peserta-route.js");
app.use("/", router);

app.listen(8081, () => {
    console.log("SERVER JALAN");
})