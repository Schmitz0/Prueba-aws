const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Remito',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      numeroRemito: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      usuario: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
};
