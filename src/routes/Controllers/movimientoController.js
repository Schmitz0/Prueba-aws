const { Op } = require('sequelize');

const { Router } = require('express');
const { Insumo } = require('../../db.js');
const { Receta } = require('../../db.js');
const { Movimiento } = require('../../db.js');
const { MovimientoInsumo } = require('../../db.js');
const {RecetaMovimiento} = require("../../db.js")
const { updateInsumo } = require('../Controllers/utils.js');
const moment = require('moment');

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const movimiento = await Movimiento.findByPk(id, {
      include: [
        {
          model: Insumo,
          attributes: ['id', 'nombre'],
          through: { attributes: ['cantidad', 'diferencia'] },
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(movimiento);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al obtener el movimiento ${id}`);
  }
});

router.get('/', async (req, res) => {
  try {
    const movimiento = await Movimiento.findAll({
      include: [
        {
          model: Insumo,
        },
        {
          model: Receta,
        },
        
     
      ],
      order: [['createdAt', 'DESC']],
    });


    res.json(movimiento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los movimientos');
  }
});

router.post('/', async (req, res) => {
  const { tipoDeMovimiento, insumos, motivo,tipo } = req.body;
  try {
    if (tipoDeMovimiento === 'Movimiento de insumo' && tipo === 'suma') {
      const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo });
      for (const { id, cantidad } of insumos) {
        const insumo = await Insumo.findByPk(id);
        let quantity = insumo.stock;
        
        await movimiento.addInsumo(insumo, { through: { cantidad } });
   

        await insumo.update({
          stock: Number(quantity) + Number(cantidad),
        });
      }

      res.json(movimiento);

    } else if(tipoDeMovimiento === 'Movimiento de insumo' && tipo === 'resta') {  
      const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo });
    for (const { id, cantidad } of insumos) {
      const insumo = await Insumo.findByPk(id);
      let quantity = insumo.stock;
      await movimiento.addInsumo(insumo, { through: { cantidad } });

      await insumo.update({
        stock: Number(quantity) - Number(cantidad),
      });
    }

    res.json(movimiento);
    } else {
      const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo });
      for (const { id, cantidad } of insumos) {
        const insumo = await Insumo.findByPk(id);
        let quantity = insumo.stock;
        let diferencia = cantidad - quantity;

        await movimiento.addInsumo(insumo, { through: { cantidad } });
        await movimiento.addInsumo(insumo, { through: { diferencia } });

        await insumo.update({
          stock: Number(quantity) + Number(diferencia),
        });
      }

      res.json(movimiento);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el movimiento');
  }
});


    router.post("/filters", async (req, res) => {
      const { filters } = req.body;
      try {
        const fecha1 = filters.fechaMin ? moment(filters.fechaMin, "DD/MM/YYYY").format("YYYY-MM-DD") : null;
        const fecha2 = filters.fechaMax ? moment(filters.fechaMax, "DD/MM/YYYY").format("YYYY-MM-DD") : null;
    
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

    const movimientos = await Movimiento.findAll({
      where: whereClause,
      include: [
        {
          model: Insumo,
          attributes: ['id', 'nombre', 'precio'],
          through: { attributes: ['cantidad'] }
        },
        {
          model: MovimientoInsumo,
          attributes: ['cantidad'],
          include: {
            model: Insumo,
            attributes: ['id', 'nombre', 'precio']
          }
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

  
    res.json(movimientos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el remito");
  }
});

router.post('/:id', async (req, res) => {
  const { tipoDeMovimiento, motivo, cantidadProducida } = req.body;
  const { id } = req.params;



  try {

    if (tipoDeMovimiento === 'Receta') {
      const movimiento = await Movimiento.create({ tipoDeMovimiento, motivo });
      await movimiento.update({ cantidadProducida });
      const receta = await Receta.findByPk(id, {
        include: [
          {
            model: Insumo,
            through: { attributes: ['cantidad', 'costo', 'costoPorBotella'] },
          },
        ],
      });
  
      await movimiento.addReceta(receta, { through: { cantidadProducida } });

        const aux = await Promise.all(receta.Insumos?.map(async (e) => {
        let insumo = await (e.id);
        let cantidadUsada = await (e.InsumoReceta.cantidad);
        const insumoACambiar = await Insumo.findByPk(insumo);
        const tot = cantidadUsada*cantidadProducida;
        await insumoACambiar.update({
          stock: insumoACambiar.stock-tot,
        });
        await movimiento.update({motivo:receta.name})
          await movimiento.addInsumo(insumo, { through: { cantidad:tot } });
          
      }));

      res.json(movimiento);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el movimiento');
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movABorrar = await Movimiento.findByPk(id, {
      include: [
        {
          model: Insumo,
          attributes: ['stock'],
        },
      ],
    });

    if (!movABorrar) throw new Error('El ID del movimiento no fue encontrado');

    if (
      movABorrar.tipoDeMovimiento === 'Movimiento de insumo' ||
      movABorrar.tipoDeMovimiento === 'Receta'
    ) {
      const ins = movABorrar.Insumos;
 

      for (let i = 0; i < ins.length; i++) {
        let insId = ins[i].MovimientoInsumo.InsumoId;
        let insQuantity = Number(ins[i].MovimientoInsumo.cantidad);
        
        const insumo = await Insumo.findByPk(insId);
        let quantity = Number(insumo.stock);

        await insumo.update({
          stock: quantity + insQuantity,
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
          stock: quantity - insDiferency,
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
