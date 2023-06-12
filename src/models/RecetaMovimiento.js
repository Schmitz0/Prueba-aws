const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'RecetaMovimiento',
    {
      cantidadProducida: {
        type: DataTypes.DECIMAL,
      },
    },
    {
      paranoid: true,
    }
  );
};
