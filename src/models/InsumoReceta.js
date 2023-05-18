const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("InsumoReceta", {
        cantidad : {
            type : DataTypes.DECIMAL          
        },
        costo : {
            type : DataTypes.DECIMAL          
        },
        costoPorBotella : {
            type : DataTypes.DECIMAL          
        }

       
    },
  )
}