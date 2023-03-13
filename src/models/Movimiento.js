const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "movimiento",
    {
      tipoDeMovimiento: {
        type: DataTypes.ENUM("Control de stock", "Movimiento de insumo"),
        allowNull: false,
      },
      motivo: {
        type: DataTypes.STRING,
      },
    },
  );
};
