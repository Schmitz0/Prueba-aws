const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Proveedor', {
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
            type: DataTypes.STRING,
            // allowNull:false,
        },
        direccion: {
            type: DataTypes.STRING,
            // allowNull:false,
        },
        codigoPostal: {
            type: DataTypes.STRING,
            // allowNull:false,
        }
    }
  )
}