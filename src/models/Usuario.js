const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('users', {
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        hashPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: { 
            type: DataTypes.STRING(15),
            defaultValue: "User",
        },
        imgUrl:{
            type: DataTypes.TEXT,
        },
    },
    {
      paranoid: true,
    }
  )
}