const { Router } = require('express');
const { Insumo } = require('../../db.js');
const { Op, Sequelize } = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
    try {
      // Obtén todos los insumos y calcula el valor total de su inventario
      const insumos = await Insumo.findAll();
      const valorTotal = insumos.reduce((total, insumo) => total + insumo.precio * insumo.stock, 0);
  
      res.json({ valorTotal });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el valor total del inventario de insumos');
    }
  });


module.exports = router;
