const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Remito', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  },
  {
    tableName: 'remitos'
  })
};
