const { Op } = require('sequelize');

const { Router } = require("express");
const { Producto } = require("../../db.js");
const { Proveedor } = require("../../db.js");
const { Remito } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {

    try {
      const remitos = await Remito.findAll({
        include: [{
          model: Producto,
          attributes: ['id', 'nombre', 'precio'],
          through: { attributes: ['cantidad'] }
        },
        {
          model: Proveedor,
        }],
        order: [['fecha', 'DESC']]
      });
      res.json(remitos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los remitos');
    }
});

  router.post("/", async (req, res) => {
    const { fecha, productos, proveedorId } = req.body;
    try {
      const remito = await Remito.create({ fecha, proveedorId });
      for (const { id, cantidad , precio } of productos) {
        const producto = await Producto.findByPk(id);
        let quantity = producto.stock
        await remito.addProducto(producto, { through: { cantidad } });
        await producto.update({precio})
        await producto.update({
          stock: quantity + cantidad,
        })
      }

      res.json(remito);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el remito');
    }
  });

module.exports = router;