const { Router } = require("express");
const { Producto } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {

    try {
        const productos = await Producto.findAll();
        res.json(productos);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }

}
)

router.post("/", async (req, res) => {

    const { nombre, precio, stock } = req.body;
    try {
      const producto = await Producto.create({ nombre, precio, stock });
      res.json(producto);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el producto');
    }

}
)

module.exports = router;