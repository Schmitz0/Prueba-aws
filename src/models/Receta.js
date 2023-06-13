const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Receta',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // unique:true,
      },
      costoPorReceta: {
        type: DataTypes.FLOAT,
      },
      usuario: {
        type: DataTypes.STRING,
      },
      imgUrl: {
        type: DataTypes.TEXT,
        defaultValue: 'https://www.aguaesencial.com/assets/images/soda.png',
      },
    },
    {
      paranoid: true,
    }
  );
};
