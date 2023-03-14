const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Producto",
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
        type: DataTypes.INTEGER,
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
    {
      tableName: "productos",
    }
  );
};
