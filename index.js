require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Producto } = require('./src/db.js');
const {Proveedor} = require('./src/db.js');
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running...`); 

    const productos = [
      {nombre: "azucar", descripcion:"es dulce", proveedor: "Jorge Perez", unidad: "kg", categoria: "alimento", imgUrl: "https://quierocuidarme.dkv.es/sites/default/files/styles/article_teaser_big_630x360/public/2022-02/propiedades-del-azucar.jpg"},
      {nombre: "sal", descripcion:"es salada", proveedor: "Jorgelina Jerez", unidad: "kg", categoria: "alimento", imgUrl: "https://ichef.bbci.co.uk/news/640/cpsprodpb/C894/production/_115784315_gettyimages-827818618.jpg"},
    ]

    const proveedores = [
      {nombre: "Pedro", apellido: "Azucar", descripcion:"es dulce", email:"pedro@gmail.com", telefono:1165417871},
      {nombre: "Jose", apellido: "sal", descripcion:"es dulce", email:"Jose@gmail.com", telefono:1165417871},
      {nombre: "Laura", apellido: "higo", descripcion:"es dulce", email:"Laura@gmail.com", telefono:1165417871},
      {nombre: "Pepe", apellido: "avion", descripcion:"es dulce", email:"Pepe@gmail.com", telefono:1165417871},
      {nombre: "Lautaro", apellido: "coca", descripcion:"es dulce", email:"Lautaro@gmail.com", telefono:1165417871},
      {nombre: "Josefina", apellido: "mana", descripcion:"es dulce", email:"Josefina@gmail.com", telefono:1165417871},
      {nombre: "Pol", apellido: "vida", descripcion:"es dulce", email:"Pol@gmail.com", telefono:1165417871},
    ]

    Producto.bulkCreate(productos).then(() => console.log("Productos cargados"))
    Proveedor.bulkCreate(proveedores).then(() => console.log("Proveedores cargados"))


  });
});


