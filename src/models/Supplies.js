const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('supplies', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unit: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: { 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        client:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        imgUrl:{
            type: DataTypes.TEXT,
        },
        stock: { 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
      paranoid: true,
    }
  )
}