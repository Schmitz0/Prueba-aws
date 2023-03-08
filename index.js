require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
// const Supplies = require('./src/db.js');
// const Bills = require('./src/db.js')
const { Producto } = require('./src/db.js')
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running...`); 

    const productos = [
      {nombre: "azucar", descripcion:"es dulce", proveedor: "Jorge Perez", unidad: "kg", categoria: "alimento", imgUrl: "https://quierocuidarme.dkv.es/sites/default/files/styles/article_teaser_big_630x360/public/2022-02/propiedades-del-azucar.jpg"},
      {nombre: "sal", descripcion:"es salada", proveedor: "Jorgelina Jerez", unidad: "kg", categoria: "alimento", imgUrl: "https://ichef.bbci.co.uk/news/640/cpsprodpb/C894/production/_115784315_gettyimages-827818618.jpg"},
    ]

    Producto.bulkCreate(productos).then(() => console.log("Productos cargados"))


  });
});


