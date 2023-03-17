const { Op } = require('sequelize');

const { Router } = require("express");
const { Insumo } = require("../../db.js");
const { Usuario } = require("../../db.js");
const { Movimiento } = require("../../db.js");
const { MovimientoInsumo } = require('../../db.js');

const router = Router();

router.get("/", async (req, res) => {
    try {
      const movimiento = await Movimiento.findAll({
        include: [{
          model: Insumo,
          attributes: ['id', 'nombre'],
          through: { attributes: ['cantidad','diferencia'] }
        },
      ],
        order: [['createdAt', 'DESC']]
      });
      res.json(movimiento);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los movimientos');
    }
});

router.post("/", async (req, res) => {
  const { tipoDeMovimiento, insumos, motivo } = req.body;
  try {
    const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo });
    for (const { id, cantidad } of insumos) {
      const insumo = await Insumo.findByPk(id);
      let quantity = insumo.stock
      const diferencia = cantidad-quantity;
      console.log(diferencia)
      await movimiento.addInsumo(insumo, { through: { cantidad } });
      await movimiento.addInsumo(insumo, { through: { diferencia: diferencia } });
        // await movimiento.update({
        //     cantidad: cantidad,
        // })
        // await movimiento.update({
        //     diferencia: dif,
        // })
      await insumo.update({
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