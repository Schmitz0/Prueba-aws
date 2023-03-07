const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "movements",
    {
      supplie: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      difference: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      typeOfMovement: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      motive: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );
};
