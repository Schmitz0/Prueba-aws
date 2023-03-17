const { Router } = require("express");
const { Proveedor } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
    // const { insumos, proveedorId } = req.body;
    // try {
    //   const remito = await Remito.create({ proveedorId });
    //   for (const { id, cantidad, precio } of insumos) {
    //     const insumo = await Insumo.findByPk(id);
    //     let quantity = insumo.stock;
    //     await remito.addInsumo(insumo, { through: { cantidad } });
    //     await insumo.update({ precio });
    //     await insumo.update({
    //       stock: quantity + cantidad,
    //     });
    //   }
    //   res.json(remito);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send("Error al crear el remito");
    // }
  });

  module.exports = router;