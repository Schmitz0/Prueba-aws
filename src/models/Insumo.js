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
        type: DataTypes.DECIMAL,
        // allowNull: false,
      },
      stock: {
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
    },
  );
};
