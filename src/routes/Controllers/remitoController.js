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
      const remitoABorrar = await Remito.findByPk(id,{
        include:[{
          model:Producto,
          attributes:["stock"],
        }]
      });


      const aux = await RemitoProducto.findByPk(id)
      const prod = remitoABorrar.Productos;

      for (let i = 0; i < prod.length; i++) {

        let prodId = prod[i].RemitoProducto.ProductoId;
        let prodQuantity = prod[i].stock;

        //asi es para llegar a los datos que necesitamos
        //console.log(prod[i].RemitoProducto.ProductoId);
        //console.log(prod[i].stock);

        const producto = await Producto.findByPk(prodId);
        let quantity = producto.stock
        await producto.update({
          stock: quantity - prodQuantity,
        })

        
      }
      
      remitoABorrar.destroy();
      res.status(200).send(remitoABorrar)
  } catch (error) {
      res.status(400).send(error.message)
  }
})


module.exports = router;