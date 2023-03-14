const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('proveedor', {
        nombre: {
            type: DataTypes.STRING(50),
            // allowNull: false,
        },
        nombreContacto: {
            type: DataTypes.STRING(50),
            // allowNull: false,
        },
        email: {
          type: DataTypes.STRING(30),
        //   allowNull: false,
        //   unique: true,
        },
        descripcion:{
            type:DataTypes.STRING,
        },
        telefono: {
            type: DataTypes.INTEGER,
            // allowNull:false,
        }
    },
    {
        paranoid: true
    }
  )
}