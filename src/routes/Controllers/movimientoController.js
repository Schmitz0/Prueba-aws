const { Op } = require('sequelize');

const { Router } = require("express");
const { Producto } = require("../../db.js");
const { Usuario } = require("../../db.js");
const { Movimiento } = require("../../db.js");
const {MovimientoProducto} = require('../../db.js');

const router = Router();

router.get("/", async (req, res) => {
    try {
      const movimiento = await Movimiento.findAll({
        include: [{
          model: Producto,
          attributes: ['id', 'nombre'],
          through: { attributes: ['cantidad','diferencia'] }
        },
      ],
        order: [['date', 'DESC']]
      });
      res.json(movimiento);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los movimientos');
    }
});

router.post("/", async (req, res) => {
  const { tipoDeMovimiento, productos, motivo ,date} = req.body;
  try {
    const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo , date });
    for (const { id, cantidad } of productos) {
      const producto = await Producto.findByPk(id);
      let quantity = producto.stock
      const diferencia = cantidad-quantity;
      console.log(diferencia)
      await movimiento.addProducto(producto, { through: { cantidad } });
      await movimiento.addProducto(producto, { through: { diferencia:diferencia } });
        // await movimiento.update({
        //     cantidad: cantidad,
        // })
        // await movimiento.update({
        //     diferencia: dif,
        // })
      await producto.update({
        stock: cantidad,
      })
    }
    res.json(movimiento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el movimiento');
  }
});

module.exports = router;