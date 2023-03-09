const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "movimiento",
    {
      tipoDeMovimiento: {
        type: DataTypes.ENUM("Control de stock", "Movimiento de insumo"),
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
      },
      diferencia: {
        type: DataTypes.INTEGER,
      },
      motivo: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
  );
};
