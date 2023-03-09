const { Router } = require("express");
const producto = require("./Controllers/productoController.js");
const remito = require("./Controllers/remitoController.js");
const login = require("./Controllers/login.js");
const userExtractor = require("./middleware/userExtractor.js");

const router = Router();

router.use("/producto",userExtractor,producto);
router.use("/remito",userExtractor,remito);
router.use("/login",userExtractor,login);

module.exports = router;
