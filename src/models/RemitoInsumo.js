const { DataTypes } = require('sequelize');
const Remito = require('./Remito');
const Insumo = require('./Insumo');


module.exports = (sequelize) => {
  sequelize.define('RemitoInsumo', {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
  )
};



