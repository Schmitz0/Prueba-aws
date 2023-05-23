const { Op, Sequelize } = require('sequelize');

const { Router } = require("express");
const { Insumo } = require("../../db.js");
const { Proveedor } = require("../../db.js");
const { Remito } = require("../../db.js");
const { RemitoInsumo } = require("../../db.js");
const moment = require('moment');



const router = Router();

router.get("/", async (req, res) => {

    try {
      const remitos = await Remito.findAll({
        include: [{
          model: Insumo,
          attributes: ['id', 'nombre', 'precio'],
          through: { attributes: ['cantidad'] }
        },
        {
          model: Proveedor,
        }],
        order: [['createdAt', 'DESC']],
        limit:10
      });
      res.json(remitos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los remitos');
    }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const remito = await Remito.findByPk(id, {
      include: [
        {
          model: Insumo,
          attributes: ["id", "nombre", "precio"],
          through: { attributes: ["cantidad"] },
        },
        {
          model: Proveedor,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    !remito
      ? res.status(404).send(`Remito ${id} no encontrado`)
      : res.json(remito);
  } catch (error) {
    console.error(error);
    res.status(500).send("Remito no encontrado");
  }
});

router.post("/", async (req, res) => {
  const { insumos, proveedorId,numeroRemito,fecha } = req.body;
  try {

    const aux = moment(fecha, "DD-MM-YYYY").format("YYYY-MM-DD");

    const remito = await Remito.create({ proveedorId,numeroRemito,fecha:aux });
    for (const { id, cantidad, precio } of insumos) {
      const insumo = await Insumo.findByPk(id);
      let quantity = insumo.stock;
      await remito.addInsumo(insumo, { through: { cantidad } });
      await insumo.update({ precio });
      await insumo.update({
        stock: quantity + cantidad,
      });
    }
    res.json(remito);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el remito");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const remitoABorrar = await Remito.findByPk(id, {
      include: [
        {
          model: Insumo,
          attributes: ["stock"],
        },
      ],
    });

    if(!remitoABorrar) throw new Error("El ID del remito no fue encontrado");

    const ins = remitoABorrar.Insumos;

    for (let i = 0; i < ins.length; i++) {
      let insId = ins[i].RemitoInsumo.InsumoId;
      let insQuantity = ins[i].RemitoInsumo.cantidad;

      const insumo = await Insumo.findByPk(insId);
      let quantity = insumo.stock;
      await insumo.update({
        stock: quantity - insQuantity,
      });
    }

    remitoABorrar.destroy();
    res.status(200).send(remitoABorrar);
    
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/filters", async (req, res) => {
  const { filters } = req.body;
  try {

  
    const fecha1 = moment(filters?.fechaMin, "DD-MM-YYYY").format("YYYY-MM-DD");
    const fecha2 = moment(filters?.fechaMax, "DD-MM-YYYY").format("YYYY-MM-DD");

    const remitos = await Remito.findAll({
      where: {
        fecha: (fecha2 && fecha1) ? {[Op.between]: [fecha1, fecha2]} : fecha2 ? {[Op.lte]: fecha2} : fecha1 ? {[Op.gte]: fecha1} : {[Op.not]: "cloudinary"}
      },
      
      include: [{
        model: Insumo,
        attributes: ['id', 'nombre', 'precio'],
        through: { attributes: ['cantidad'] }
      },
      {
        model: Proveedor,
      }],
      order: [['createdAt', 'DESC']],
      limit:10,
     
      }
      );
    res.json(remitos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el remito");
  }
});




module.exports = router;