const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('recipes', {
        cantidadProducida: {
            type : DataTypes.INTEGER          
        },
        
    },
    {
      paranoid: true,
    }
  )
}