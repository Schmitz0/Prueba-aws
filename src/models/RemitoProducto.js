const { DataTypes } = require('sequelize');
const Remito = require('./Remito');
const Producto = require('./Producto');


module.exports = (sequelize) => {
  sequelize.define('RemitoProducto', {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'remitos_productos'
  })
};



