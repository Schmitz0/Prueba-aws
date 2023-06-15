const { Op } = require("sequelize");

const { Router } = require("express");
const { Insumo } = require("../../db.js");
const { Receta } = require("../../db.js");
const { Movimiento } = require("../../db.js");
const { MovimientoInsumo } = require("../../db.js");
const { RecetaMovimiento } = require("../../db.js");
const { updateInsumo } = require("../Controllers/utils.js");
const moment = require("moment");
const Remito = require("../../models/Remito.js");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movimiento = await Movimiento.findByPk(id, {
      include: [
        {
          model: Insumo,
          attributes: ["id", "nombre"],
          through: { attributes: ["cantidad", "diferencia"] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(movimiento);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al obtener el movimiento ${id}`);
  }
});

router.post("/estado", async (req, res) => {
  const { estado } = req.body;
  try {
    const movimiento = await Movimiento.findAll({
      where: {
        estado,
      },
      include: [
        {
          model: Insumo,
        },
        {
          model: Receta,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(movimiento);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los movimientos");
  }
});

router.post("/", async (req, res) => {
  const{ userid } = req.headers;
  // const name = req.get('name')
  // console.log(userid);

  const { tipoDeMovimiento, insumos, motivo, tipo } = req.body;
  try {
    if (tipoDeMovimiento === "Movimiento de insumo" && tipo === "suma") {
      const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo });
      for (const { id, cantidad } of insumos) {
        const insumo = await Insumo.findByPk(id);
        let quantity = insumo.stock;
        let stockFinal = Number(quantity) + Number(cantidad);
        let diferencia = cantidad - quantity;

        await movimiento.addInsumo(insumo, { through: { cantidad } });
        await movimiento.addInsumo(insumo, {
          through: { diferencia: cantidad },
        });
        await movimiento.addInsumo(insumo, {
          through: { stockFinal: stockFinal },
        });
        await movimiento.addInsumo(insumo, {
          through: { stockPrevio: quantity },
        });

        await insumo.update({
          stock: Number(quantity) + Number(cantidad),
        });

        await movimiento.update({
          usuario: userid,
          tipoDeOperacion:tipo,
        });
      }

      res.json(movimiento);
    } else if (
      tipoDeMovimiento === "Movimiento de insumo" &&
      tipo === "resta"
    ) {
      const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo });
      for (const { id, cantidad } of insumos) {
        const insumo = await Insumo.findByPk(id);
        let quantity = insumo.stock;
        let stockFinal = Number(quantity) - Number(cantidad);
        let diferencia = cantidad - quantity;

        await movimiento.addInsumo(insumo, { through: { cantidad } });
        await movimiento.addInsumo(insumo, {
          through: { diferencia: -cantidad },
        });
        await movimiento.addInsumo(insumo, {
          through: { stockFinal: stockFinal },
        });
        await movimiento.addInsumo(insumo, {
          through: { stockPrevio: quantity },
        });

        await insumo.update({
          stock: Number(quantity) - Number(cantidad),
        });

        await movimiento.update({
          usuario: userid,
          tipoDeOperacion:tipo,
        });
      }

      res.json(movimiento);
    } else {
      const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo });
      for (const { id, cantidad } of insumos) {
        const insumo = await Insumo.findByPk(id);
        let quantity = insumo.stock;
        let stockFinal = quantity - cantidad;
        let diferencia = cantidad - quantity;

        await movimiento.addInsumo(insumo, { through: { cantidad } });
        await movimiento.addInsumo(insumo, {
          through: { diferencia: diferencia },
        });
        await movimiento.addInsumo(insumo, {
          through: { stockFinal: cantidad },
        });
        await movimiento.addInsumo(insumo, {
          through: { stockPrevio: quantity },
        });
        await movimiento.update({
          usuario: userid,
          estado: false,
        });
      }

      res.json(movimiento);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el movimiento");
  }
});

router.post("/historial/:id", async (req, res) => {
  const{ userid } = req.headers;
  const { id } = req.params; 

  try {
      const movimiento = await Movimiento.findByPk(id,{
        include: [
          {
            model: Insumo,
          },
        ]
      });
  
     
      for (let i = 0; i < movimiento.Insumos?.length; i++) {
         const idInsumo = movimiento.Insumos[i].MovimientoInsumo.InsumoId
        const insumo = await Insumo.findByPk(idInsumo);
        
        const quantity = insumo.stock;
      console.log(quantity);
        const stockFinal = movimiento.Insumos[i].MovimientoInsumo.stockFinal

        await insumo.update({
          stock: Number(stockFinal),
        });
        
        await movimiento.update({
          usuario: userid,
          estado: true,
        });
      }

      res.json(movimiento);
      }

   catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el movimiento");
  }
});

router.post("/historial/control/:id", async (req, res) => {
  const { id } = req.params;
  const { InsumoId, stockFinal } = req.body;

 
  try {
    const movimiento = await Movimiento.findAll({
 
      include: [
        {
          model: Insumo,
          where: {
            id: InsumoId
          },
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    const insumos = movimiento[0].Insumos[0].MovimientoInsumo
    const stockPrev = movimiento[0].Insumos[0].MovimientoInsumo.stockPrevio

      await insumos.update({
        stockFinal: Number(stockFinal),
        diferencia : Number(stockFinal) - Number(stockPrev) ,
      });
      res.json(movimiento);    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el movimiento");
  }
});


router.post("/filters", async (req, res) => {
  const { filters } = req.body;

  try {
    const fecha1 = filters.fechaMin
      ? moment(filters.fechaMin, "DD/MM/YYYY").format("YYYY-MM-DD")
      : null;
    const fecha2 = filters.fechaMax
      ? moment(filters.fechaMax, "DD/MM/YYYY").format("YYYY-MM-DD")
      : null;
    const insumoNombre = filters.insumo ? filters.insumo : null;

    const whereClause = {};

    if (fecha1 && fecha2) {
      if (fecha1 === fecha2) {
        // Caso especial cuando fechaMin y fechaMax son iguales
        whereClause.createdAt = {
          [Op.between]: [`${fecha1} 00:00:00`, `${fecha2} 23:59:59`],
        };
      } else {
        whereClause.createdAt = {
          [Op.between]: [fecha1, fecha2],
        };
      }
    } else if (fecha2) {
      whereClause.createdAt = {
        [Op.lte]: fecha2,
      };
    } else if (fecha1) {
      whereClause.createdAt = {
        [Op.gte]: fecha1,
      };
    } else {
      whereClause.createdAt = {
        [Op.not]: "cloudinary",
      };
    }

    if (filters.estado) {
      whereClause.estado = filters.estado;
    }

    const movimientos = await Movimiento.findAll({
      where: whereClause,
      include: [
        {
          model: Insumo,
          where: {
            nombre: insumoNombre
              ? { [Op.like]: insumoNombre }
              : { [Op.not]: "cloudinary" },
          },
        },
        {
          model: MovimientoInsumo,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    res.json(movimientos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el remito");
  }
});

router.post("/:id", async (req, res) => {
  // const name = req.get("name");
  const{ userid } = req.headers;
  const { tipoDeMovimiento, motivo, cantidadProducida } = req.body;
  const { id } = req.params;

  try {
    if (tipoDeMovimiento === "Receta") {
      const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo });

      await movimiento.update({ cantidadProducida });
      await movimiento.update({ usuario: userid });
      const receta = await Receta.findByPk(id, {
        include: [
          {
            model: Insumo,
            through: { attributes: ["cantidad", "costo", "costoPorBotella"] },
          },
        ],
      });

      await movimiento.addReceta(receta, { through: { cantidadProducida } });

      const aux = await Promise.all(
        receta.Insumos?.map(async (e) => {
          // const stockPrevio =  await movimiento.addReceta(receta, { through: { cantidadProducida } });

          let insumo = await e.id;
          let stockPrevio = await e.stock;
          let cantidadUsada = await e.InsumoReceta.cantidad;
          const insumoACambiar = await Insumo.findByPk(insumo);
          const tot = cantidadUsada * cantidadProducida;
          const stockFinal = Number(stockPrevio) - Number(tot);
          await insumoACambiar.update({
            stock: Number(insumoACambiar.stock) - Number(tot),
          });
          await movimiento.update({ motivo: receta.name });
          await movimiento.addInsumo(insumo, { through: { cantidad: tot } });
          await movimiento.addInsumo(insumo, { through: { diferencia: tot } });
          await movimiento.addInsumo(insumo, {
            through: { stockPrevio: stockPrevio },
          });
          await movimiento.addInsumo(insumo, {
            through: { stockFinal: stockFinal },
          });
        })
      );

      res.json(movimiento);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el movimiento");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movABorrar = await Movimiento.findByPk(id, {
      include: [
        {
          model: Insumo,
          attributes: ["stock"],
        },
      ],
    });

    if (!movABorrar) throw new Error("El ID del movimiento no fue encontrado");


    if (
      movABorrar.tipoDeMovimiento === "Movimiento de insumo" &&
      movABorrar.tipoDeOperacion === "suma"
    ) {
      const ins = movABorrar.Insumos;

      for (let i = 0; i < ins.length; i++) {
        let insId = ins[i].MovimientoInsumo.InsumoId;
        let insQuantity = Number(ins[i].MovimientoInsumo.cantidad);

        const insumo = await Insumo.findByPk(insId);
        let quantity = Number(insumo.stock);

        await insumo.update({
          stock: Number(quantity) - Number(insQuantity),
        });
      }

      movABorrar.destroy();
      res.status(200).send(movABorrar);

    }else if (
      movABorrar.tipoDeMovimiento === "Movimiento de insumo" ||
      movABorrar.tipoDeMovimiento === "Receta"
    ) {
      const ins = movABorrar.Insumos;

      for (let i = 0; i < ins.length; i++) {
        let insId = ins[i].MovimientoInsumo.InsumoId;
        let insQuantity = Number(ins[i].MovimientoInsumo.cantidad);

        const insumo = await Insumo.findByPk(insId);
        let quantity = Number(insumo.stock);

        await insumo.update({
          stock: Number(quantity) + Number(insQuantity),
        });
      }

      movABorrar.destroy();
      res.status(200).send(movABorrar);
    } else {
      const ins = movABorrar.Insumos;

      for (let i = 0; i < ins.length; i++) {
        let insId = ins[i].MovimientoInsumo.InsumoId;
        let insDiferency = ins[i].MovimientoInsumo.diferencia;

        const insumo = await Insumo.findByPk(insId);
        let quantity = insumo.stock;
        await insumo.update({
          stock: Number(quantity) - Number(insDiferency),
        });
      }

      movABorrar.destroy();
      res.status(200).send(movABorrar);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
