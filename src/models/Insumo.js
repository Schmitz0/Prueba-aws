const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Insumo",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.FLOAT,
        // allowNull: false,
      },
      stock: {
        type: DataTypes.DECIMAL,
        // allowNull: false,
      },
      stockCritico: {
        type: DataTypes.DECIMAL,
        // allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      unidad: {
        type: DataTypes.STRING,
        //allowNull: false,
        // unique: true,
      },
      descripcion: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      proveedor: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      imgUrl: {
        type: DataTypes.TEXT,
      },
      usuario: {
        type: DataTypes.STRING,
      },
      tipoDeOperacion: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
};
