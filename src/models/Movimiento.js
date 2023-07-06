const { DataTypes } = require("sequelize");
const tiposDeMov = {
  CONTROLDESTOCK:"Control de stock", 
  MOVIMIENTODEINSUMO:"Movimiento de insumo", 
  RECETA:"Receta", 
  MODIFICACIONDELINSUMO:"Modificación del insumo", 
  ELIMINACIONDEINSUMO:"Eliminación de insumo", 
  CREACIONDEINSUMO:"Creación de insumo", 
  CREACIONDEPROVEEDOR:"Creación de proveedor", 
  EDICIÓNDEPROVEEDOR:"Edición de proveedor", 
  ELIMINACIONDEPROVEEDOR:"Eliminación de proveedor", 
  ELIMINACIONDELARECETA:"Eliminación de la receta",
  EDICIONDELARECETA: "Edición de la receta",
}
module.exports = (sequelize) => {
  sequelize.define(
    "Movimiento",
    {
      tipoDeMovimiento: {
        // type: DataTypes.ENUM("Control de stock", "Movimiento de insumo", "Receta", "Modificación del insumo", "Eliminación de insumo", "Creación de insumo", "Creación de proveedor", "Edición de proveedor", "Eliminación de proveedor", "Eliminación de la receta","Edición de la receta",),
        type: DataTypes.ENUM(Object.values(tiposDeMov)),
        allowNull: false,
      },
      cantidadProducida:{
        type : DataTypes.DECIMAL,
      },
      motivo: {
        type: DataTypes.STRING,
      },
      estado:{
        type: DataTypes.BOOLEAN,
        defaultValue:true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      usuario: {
        type: DataTypes.INTEGER,
      },
      tipoDeOperacion: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
};
