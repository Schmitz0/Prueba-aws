const { DataTypes } = require('sequelize');
const Remito = require('./Remito');
const Insumo = require('./Insumo');


module.exports = (sequelize) => {
sequelize.define('MovimientoInsumo', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  diferencia: {
    type: DataTypes.INTEGER,

  },

}, {
  tableName: 'movimientos_insumos'
})
};



