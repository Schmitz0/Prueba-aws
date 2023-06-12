const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define(
    'Usuario',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hashPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,

      },
      imgUrl: {
        type: DataTypes.TEXT,
        defaultValue: 'https://angol.cl/images/pagina_principal/noImage.jpg',
      },

    },
    {
      paranoid: true,
    }
  );
};
