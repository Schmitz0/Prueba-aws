const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('recipes', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique:true,
        },
       
    },
    {
      paranoid: true,
    }
  )
}