const { Op } = require('sequelize');

const { Router } = require("express");
const { Producto } = require("../../db.js");
const { Remito } = require("../../db.js");
const {RemitoProducto} = require("../../db.js")


const router = Router();

router.get("/", async (req, res) => {

    try {
      const remitos = await Remito.findAll({
        include: [{
          model: Producto,
          attributes: ['id', 'nombre', 'precio'],
          through: { attributes: ['cantidad'] }
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

    const { fecha, productos } = req.body;
    //let total = 0;
    try {
      const remito = await Remito.create({ fecha });
      for (const { id, cantidad } of productos) {
        const producto = await Producto.findByPk(id);
        console.log(producto);
        //total += producto.precio * cantidad;
        await remito.addProducto(producto, { through: { cantidad } });
        await producto.decrement('stock', { by: cantidad });
      }
      //await remito.update({ total });
      res.json(remito);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el remito');
    }
  });

module.exports = router;