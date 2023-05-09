const { Router } = require('express');
const { Insumo } = require('../../db.js');
const { Op, Sequelize } = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const insumo = await Insumo.findAll({
      order: [['id', 'ASC']],
    });
    res.json(insumo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los insumo');
  }
});

router.get('/stock', async (req, res) => {
  try {
    const insumosBajoStock = await Insumo.findAll({
      where: {
        stock: {
          [Op.lt]: 10 // Establece el límite de stock bajo aquí
        }
      },
      order: [['stock', 'ASC']],
    });
    res.json(insumosBajoStock);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los insumos con bajo stock');
  }
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const insumoId = await Insumo.findByPk(id);
    !insumoId
      ? res.status(400).send('El ID del insumo no fue encontrado')
      : res.status(200).send(insumoId);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el insumo solicitado');
  }
});


router.post('/', async (req, res) => {
  const {
    nombre,
    precio,
    stock,
    descripcion,
    proveedor,
    imgUrl,
    unidad,
    categoria,
  } = req.body;
  try {
    const insumo = await Insumo.create({
      nombre,
      precio,
      stock,
      descripcion,
      proveedor,
      imgUrl,
      unidad,
      categoria,
    });
    res.json(insumo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el insumo');
  }
});

router.post('/filter', async (req, res) => {
  const { filters } = req.body;

  try {
    const insumosData = await Insumo.findAndCountAll({
      order:(filters.orden === "desc")
        ?  [['id', 'DESC']] : (filters.orden === "asc")
        ?  [['id', 'ASC']] : []
    });

    res.status(200).send(insumosData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = {};

  for (const property in req.body) {
    if (property !== 'id' && property !== 'userRole' && property !== 'userName')
      changes[property] = req.body[property];
  }

  try {
    const insumo = await Insumo.findByPk(id);

    await insumo.update(changes);

    return res.status(200).json(insumo);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const insumoABorrar = await Insumo.findByPk(id);
    if (insumoABorrar) {
      await insumoABorrar.destroy();
      res.status(200).send(`El insumo de id ${id} fue borrado con éxito`);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
