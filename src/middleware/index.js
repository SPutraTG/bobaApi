let express = require("express");
let auth = require("./auth");
let router = express.Router();

router.post('/bobaApi/register', auth.registrasi);

module.exports = router;