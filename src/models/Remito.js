const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Remito', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
  numeroRemito: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,

  },
})
};
