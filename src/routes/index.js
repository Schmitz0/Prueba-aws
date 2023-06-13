const { Router } = require("express");
const insumo = require("./Controllers/insumoController.js");
const usuario = require("./Controllers/usuarioController.js");
const users = require("./Controllers/userRouter.js");
const proveedor = require("./Controllers/proveedorController.js");
const movimiento = require("./Controllers/movimientoController.js");
const remito = require("./Controllers/remitoController.js");
const dashboard = require("./Controllers/dashboard.js");
// const login = require("./Controllers/login.js");
const receta = require ("./Controllers/recetasController.js")
const userExtractor = require("./middleware/userExtractor.js");

const router = Router();

router.use("/insumo", userExtractor, insumo);
router.use("/usuario", userExtractor, usuario);
router.use("/users", users);
router.use("/receta", userExtractor, receta);
router.use("/proveedor", userExtractor, proveedor);
router.use("/remito", userExtractor,  remito);
router.use("/dashboard", userExtractor,  dashboard);
// router.use("/login", userExtractor,login);
router.use("/movimiento", userExtractor,  movimiento);

module.exports = router;
