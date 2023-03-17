const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Receta", {
        name: {
            type: DataTypes.STRING(50),
            // allowNull: false,
            // unique:true,
        },
       
    },
    {
      paranoid: true,
    }
    
  )
}