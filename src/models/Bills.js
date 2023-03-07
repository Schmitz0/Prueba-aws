const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('bills', {
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique:true,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        date: { 
            type: DataTypes.DATE,
            default: Date.now()
        },
        client:{
            type: DataTypes.STRING,
        },
    },
    {
      paranoid: true,
    }
  )
}