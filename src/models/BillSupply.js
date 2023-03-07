const { DataTypes } = require('sequelize');
const Bills = require('./Bills');
const Supplies = require('./Supplies');

module.exports = (sequelize) => {
    sequelize.define('BillSupply', {
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      }, {
        tableName: 'bill_supply'
      })
    };