const database = require("../config/db.js");
const mysql = require("mysql");
const pool = mysql.createPool(database);

pool.on("error", (err) => {
    console.log("err");
});

let listData = {
    ambilData(req, res){
        pool.getConnection((err, connection) => {
            if(err){
                console.log("ERROR");
            }
        const query = "SELECT * FROM peserta";
        connection.query(query, (err, result) => {
            if(err){
                console.log("ERROR");
            }

        res.send({ data: result });

        });
        connection.release();
        })
    },
    createData(req, res){
        pool.getConnection((err, connection) => {
            if(err){
                console.log("ERROR");
            }
        let inputName = req.body.name;
        let inputGender = req.body.gender;
        const query = "INSERT INTO peserta (name, gender) VALUES ('"+ inputName +"', '"+ inputGender +"')"; //insert harus ambil data dari frontend
        connection.query(query, (err, result) => {
            if(err){
                console.log("ERROR");
            }

        res.send({ data: result });

        });
        connection.release();
        })
    },
    dellData(req, res){
        pool.getConnection((err, connection) => {
            if(err){
                console.log("ERROR");
            }
        let dellId = req.params.id; //cari input data dari frontend dengan id
       
        const query = "DELETE FROM peserta WHERE id = '"+ dellId +"'";
        connection.query(query, (err, result) => {
            if(err){
                console.log("ERROR");
            }

        res.send({ data: result }); //ini adalah text yg akan ditampilkan pada user

        });
        connection.release();
        })
    },
    updateData(req, res){
        pool.getConnection((err, connection) => {
            if(err){
                console.log("ERROR");
            }
        
            let inputName = req.body.name;
            let inputGender = req.body.gender;
            let inputId = req.params.id; //cari input data dari frontend dengan id
       
        const query = "UPDATE peserta SET name = '"+ inputName +"', gender = '"+ inputGender +"' WHERE id = '"+ inputId +"'";
        connection.query(query, (err, result) => {
            if(err){
                console.log("ERROR");
            }

        res.send({ data: result }); //ini adalah text yg akan ditampilkan pada user

        });
        connection.release();
        })
    },
}


module.exports = listData;