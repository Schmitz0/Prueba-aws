const { DataTypes } = require('sequelize');
const Remito = require('./Remito');
const Insumo = require('./Insumo');


module.exports = (sequelize) => {
sequelize.define('MovimientoInsumo', {
  cantidad: {
    type: DataTypes.DECIMAL,
    // allowNull: false
  },
  diferencia: {
    type: DataTypes.DECIMAL,
  },
  stockPrevio:{
    type: DataTypes.DECIMAL,
  },

  stockFinal:{
    type:DataTypes.DECIMAL
  }
 

})
};



