const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("InsumoReceta", {
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
  )
}