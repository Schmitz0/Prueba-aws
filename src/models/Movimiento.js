const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "movimiento",
    {
      tipoDeMovimiento: {
        type: DataTypes.ENUM("Control de stock", "Movimiento de insumo", "Receta"),
        allowNull: false,
      },
      cantidadProducida:{
        type : DataTypes.INTEGER
      },
      motivo: {
        type: DataTypes.STRING,
      },
    },
  );
};
