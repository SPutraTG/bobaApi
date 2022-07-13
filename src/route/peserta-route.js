const router = require("express").Router();
const cPeserta = require("../controller/peserta.js");

router.get("/bobaApi", cPeserta.ambilData);
router.post("/bobaApi", cPeserta.createData);
router.delete("/bobaApi/:id", cPeserta.dellData); //apabila memakai params tambah (/ dblkgnya)
router.put("/bobaApi/:id", cPeserta.updateData);

module.exports = router;