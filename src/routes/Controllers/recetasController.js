const { Router } = require('express');
const { Receta } = require('../../db.js');
const { Insumo } = require('../../db.js');
const { Movimiento } = require('../../db.js');
const {InsumoReceta} = require('../../db.js');
const userExtractor = require('../middleware/userExtractor.js');

const router = Router();

router.get('/', userExtractor, async (req, res) => {
  try {
    const recetas = await Receta.findAll({
      include: [
        {
          model: Insumo,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(recetas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las recetas');
  }
});

router.put('/precios', async (req, res) => {
 
  try {
    const receta = await Receta.findAll({
      include: [
        {
          model: Insumo,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    for (let i = 0; i < receta.length; i++) {
      let contador = 0;
      const recetaAct = receta[i].id;
      const costoReceta = await Receta.findOne({where:{id:recetaAct}});
      for (let j = 0; j < receta[i].Insumos.length; j++) {

       const insumoAct = receta[i].Insumos[j].id;
      
        const precioAct = receta[i].Insumos[j].precio;

        const insumoReceta = await InsumoReceta.findOne({
          where: {
            RecetumId: recetaAct,
            InsumoId: insumoAct // El ID del insumo que quieres actualizar
          }
        });

        contador += precioAct * insumoReceta.cantidad;

        const costPorBottle = precioAct*insumoReceta.cantidad

     
        await insumoReceta.update({ costo: precioAct });
        await insumoReceta.update({ costoPorBotella: costPorBottle });
    
      }

      
      await costoReceta.update({costoPorReceta:contador})
      
    }
    res.json(receta);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear la receta');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const receta = await Receta.findByPk(id, {
      include: [
        {
          model: Insumo,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    !receta ?
    res.status(400).send(`La receta de id ${id} no fue encontrada`) :
    res.status(200).json(receta);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al obtener la receta de id ${id}`);
  }
});

router.post('/', async (req, res) => {
  const { name, imgUrl, insumos } = req.body;
  try {
    const receta = await Receta.create({ name });
    // if(imgUrl) await receta.update({imgUrl});
    for (const { id, cantidad } of insumos) {
      const insumo = await Insumo.findByPk(id);
      let costo = insumo.precio;
      let costoPorBotella = costo * cantidad;
      await receta.addInsumo(insumo, { through: { cantidad } });
      await receta.addInsumo(insumo, { through: { costo: costoPorBotella } });
      await receta.addInsumo(insumo, { through: { costoPorBotella } });
      // await insumo.update({ precio: cantidad * costoPorBotella });
    }
    res.json(receta);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear la receta');
  }
});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
////////////////////// P U T //////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, imgUrl, insumoId, cantidad } = req.body;
  // console.log(name, id);
  try {
    const receta = await Receta.findByPk( id );
    if(imgUrl) await receta.update({imgUrl});
    if(name) await receta.update({name});
    if(insumoId || cantidad){ 

    const insumo = await Insumo.findByPk(insumoId);
    let costo = insumo.precio;
      let costoPorBotella = costo * cantidad;
      await receta.addInsumo(insumo, { through: { cantidad } });
      await receta.addInsumo(insumo, { through: { costo: costoPorBotella } });
      await receta.addInsumo(insumo, { through: { costoPorBotella } });
    }
    // for (const { id, cantidad, costo, costoPorBotella } of insumos) {
    //   const insumo = await Insumo.findByPk(id);
    //   let precio = insumos.precio;
    //   await receta.addInsumo(insumo, { through: { cantidad } });
    // }
    res.json(receta);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al modificar la receta');
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rowId = req.body;
    
    console.log();
    const receta = await Receta.findByPk(id);
    const insumoABorrar = await Insumo.findByPk(insumoId);
    
    const insumosReceta = await receta.getInsumos();
    
    if (insumosReceta.some(insumo => insumo.id === insumoABorrar.id)) {
      await receta.removeInsumo(insumoABorrar);
      res.status(200).send(`El insumo ${insumoABorrar.nombre} de la receta de id ${id} fue borrado con éxito.`);
    } else {
      res.status(400).send(`El insumo ${insumoABorrar.nombre} no está asociado a la receta de id ${id}.`);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const recetaABorrar = await Receta.findByPk(id);
      if (recetaABorrar) {
          await recetaABorrar.destroy()
          res.status(200).send(`La receta de id ${id} fue borrada con éxito`)
      }
  } catch (error) {
      res.status(400).send(error.message)
  }
})





module.exports = router;
