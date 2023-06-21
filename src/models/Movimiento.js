const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Movimiento",
    {
      tipoDeMovimiento: {
        type: DataTypes.ENUM("Control de stock", "Movimiento de insumo", "Receta", "Modificación del insumo", "Eliminación de insumo", "Creación de insumo"),
        allowNull: false,
      },
      cantidadProducida:{
        type : DataTypes.DECIMAL,
      },
      motivo: {
        type: DataTypes.STRING,
      },
      estado:{
        type: DataTypes.BOOLEAN,
        defaultValue:true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      usuario: {
        type: DataTypes.INTEGER,
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
