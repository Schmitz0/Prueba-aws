require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;


const sequelize = new Sequelize('database-1', 'postgres', 'Olivia2022!', {
  host: 'database-1.cvnpko0en2ye.sa-east-1.rds.amazonaws.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Requerir SSL
      rejectUnauthorized: false // No rechazar conexiones no autorizadas (importante para Amazon RDS)
    }
  }
});


const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

//const { Videogame, Genre } = sequelize.models;

const { RemitoInsumo, Remito, Insumo, Proveedor, Movimiento, Usuario, MovimientoInsumo, InsumoReceta,  Receta, RecetaMovimiento  } = sequelize.models;


Remito.belongsToMany(Insumo, { through: RemitoInsumo });
Insumo.belongsToMany(Remito, { through: RemitoInsumo });
 
Proveedor.hasMany(Remito, { foreignKey: 'proveedorId' });
Remito.belongsTo(Proveedor, { foreignKey: 'proveedorId' });

Movimiento.belongsToMany(Insumo, { through: MovimientoInsumo })
Insumo.belongsToMany(Movimiento, { through: MovimientoInsumo })

Receta.belongsToMany(Insumo, {through : InsumoReceta })
Insumo.belongsToMany(Receta, {through  : InsumoReceta})

Receta.belongsToMany(Movimiento, {through : RecetaMovimiento})
Movimiento.belongsToMany(Receta, {through : RecetaMovimiento})

Movimiento.belongsTo(Usuario)
Usuario.hasMany(Movimiento)

Movimiento.hasMany(MovimientoInsumo);
MovimientoInsumo.belongsTo(Movimiento);

MovimientoInsumo.belongsTo(Insumo);
MovimientoInsumo.belongsTo(Movimiento);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};