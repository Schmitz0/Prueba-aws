const { Router } = require("express");
const producto = require("./Controllers/productoController.js");
const proveedor = require("./Controllers/proveedorController.js");
const movimiento = require("./Controllers/movimientoController.js");
const remito = require("./Controllers/remitoController.js");
const login = require("./Controllers/login.js");
const userExtractor = require("./middleware/userExtractor.js");

const router = Router();

router.use("/producto", producto);
router.use("/proveedor", proveedor);
router.use("/remito",  remito);
router.use("/login",login);
router.use("/movimiento",  movimiento);

module.exports = router;
