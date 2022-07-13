let express = require("express");
let auth = require("./auth");
let router = express.Router();

router.post('/bobaApi/register', auth.registrasi);
router.post('/bobaApi/login', auth.login);

module.exports = router;