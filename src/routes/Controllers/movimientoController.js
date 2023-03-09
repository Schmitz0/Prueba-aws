const { Op } = require('sequelize');

const { Router } = require("express");
const { Producto } = require("../../db.js");
const { Usuario } = require("../../db.js");
const { Movimiento } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
    // try {
    //   const movimiento = await Movimiento.findAll({
    //     include: [{
    //       model: Producto,
    //       attributes: ['id', 'nombre', 'precio'],
    //       through: { attributes: ['cantidad'] }
    //     },
    //     {
    //       model: Proveedor,
    //     }],
    //     order: [['fecha', 'DESC']]
    //   });
    //   res.json(remitos);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send('Error al obtener los remitos');
    // }
});

// router.post("/", async (req, res) => {
//   const { tipoDeMovimiento, motivo } = req.body;
//   try {
//     const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo });
//     // for (const { id, cantidad , diferencia } of productos) {
//     //   const producto = await Producto.findByPk(id);
//       // let quantity = producto.stock
//       // await remito.addProducto(producto, { through: { cantidad } });
//       // await producto.update({precio})
//       // await producto.update({
//       //   stock: quantity + cantidad,
//       // })
//     }
//     res.json(movimiento);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error al crear el movimiento');
//   }
// });

module.exports = router;