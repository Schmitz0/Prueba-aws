const { Op, Sequelize } = require('sequelize');

const { Router } = require("express");
const { Producto } = require("../../db.js");
const { Proveedor } = require("../../db.js");
const { Remito } = require("../../db.js");
const { RemitoProducto } = require("../../db.js");


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

router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const remitoABorrar = await Remito.findByPk(id);
      console.log(remitoABorrar);
      await remitoABorrar.destroy()
      res.status(200).send(remitoABorrar)
  } catch (error) {
      res.status(400).send(error.message)
  }
})
// router.delete('/:id', async (req, res) => {
//   try {
//       const { id } = req.params;
//       const remitoABorrar = await Remito.findByPk(id, {
//         include:[{model: RemitoProducto}]
//       });
//       const {cantidad} = remitoABorrar; 
//       console.log(remitoABorrar);
//       if (remitoABorrar) {
//           await remitoABorrar.destroy()
//           console.log(id);
//           // await RemitoProducto.destroy({
//           //   where: {
//           //     RemitoId: id
//           //   }
//           // })
//           await Producto.update({
//             stock: Sequelize.literal(`stock - ${cantidad}`)
//           },{
//             where: {
//               id: {
//                 [Sequelize.Op.in]: Sequelize.literal(
//                   `(SELECT id FROM productos WHERE RemitoId = ${id})`
//                 )
//               }
//             }
//           })
//           res.status(200).send(`El remito de id ${id} fue borrado con éxito`)
//       }
//   } catch (error) {
//       res.status(400).send(error.message)
//   }
// })

module.exports = router;