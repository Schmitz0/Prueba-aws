const { DataTypes } = require('sequelize');
const Remito = require('./Remito');
const Producto = require('./Producto');


module.exports = (sequelize) => {
sequelize.define('MovimientoProducto', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  diferencia: {
    type: DataTypes.INTEGER,

  },

}, {
  tableName: 'movimientos_productos'
})
};



