const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Remito', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
  }
}, {
  tableName: 'remitos'
})
};
