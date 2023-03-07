const { Router } = require("express");
const producto = require("./Controllers/productoController.js");
const remito = require("./Controllers/remitoController.js");

const router = Router();

router.use("/producto",producto);
router.use("/remito",remito);

module.exports = router;
