const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("RecetaMovimiento", {
        cantidadProducida: {
            type : DataTypes.INTEGER
        },
        
    },
    {
      paranoid: true,
    },
    {
      tableName : "movimiento_recetas"
  }
  )
}