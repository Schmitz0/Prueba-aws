const { Router } = require("express");
const insumo = require("./Controllers/insumoController.js");
const proveedor = require("./Controllers/proveedorController.js");
const movimiento = require("./Controllers/movimientoController.js");
const remito = require("./Controllers/remitoController.js");
const login = require("./Controllers/login.js");
const receta = require ("./Controllers/recetasController.js")
const userExtractor = require("./middleware/userExtractor.js");

const router = Router();

router.use("/insumo", insumo);
router.use("/receta", receta);
router.use("/proveedor", proveedor);
router.use("/remito",  remito);
router.use("/login",login);
router.use("/movimiento",  movimiento);

module.exports = router;
