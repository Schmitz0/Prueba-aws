const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('recipes', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique:true,
        },
        supplie: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        cost: { 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        costUnit: { 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
      paranoid: true,
    }
  )
}