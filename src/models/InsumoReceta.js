const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('recipes', {
        cantidad : {
            type : DataTypes.FLOAT          
        },
        costo : {
            type : DataTypes.FLOAT          
        },
        costoPorBotella : {
            type : DataTypes.FLOAT          
        }

       
    },
    {
      paranoid: true,
    }
  )
}