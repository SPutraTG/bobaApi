let config = require("../config/db");
let mysql = require("mysql");
let md5 = require("MD5");
let jwt = require("jsonwebtoken");
let secret = require("../config/secret");
let ip = require("ip");
let response = require('../../res');

exports.registrasi = function(req, res) {
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date(),
    }

    let query = "SELECT email FROM ?? WHERE ??=?";
    let table = ["user", "email", post.email]

    query = mysql.format(query, table);

    config.query(query, function(error, rows) {
        if(error){
            console.log(error);
        } else {
            if(rows.length == 0){
                let query = "INSERT INTO ?? SET ?";
                let table = ["user"];
                query = mysql.format(query, table);
                config.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    } else {
                        response.ok("Berhasil menambahkan data user baru", res);
                    }
                });
            } else {
                response.ok("Email sudah terdaftar!", res);
            }
            }
        })
    }

    exports.login = function(req, res){
        let post = {
            password: req.body.password,
            email: req.body.email
        }

        let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
        let table = ["user", "password", md5(post.password), "email", post.email];

        query = mysql.format(query, table);

        config.query(query, function(error, rows) {
            if(error){
                console.log(error);
            } else {
                if(rows.length == 1){
                   let token = jwt.sign({rows}, secret.secret, {
                    expiresIn: 1440
                   });
                   id_user = rows[0].id;

                   let data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                   }

                   let query = "INSERT INTO ?? SET ?";
                   let table = ["akses_token"];

                   query = mysql.format(query, table);
                   config.query(query, data, function(error, rows) {
                    if(error){
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate!',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            
            } else {
                res.json({"Error": true, "Message": "Email atau password Salah!"});
            }
        }           
    });
}