require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Producto } = require('./src/db.js');
const {Proveedor} = require('./src/db.js');
const {Usuario} = require("./src/db.js")
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

    const usuario = [
      {name: "Gaston Schmitz", email: "gastonschmitz0@gmail.com", hashPassword: "$2b$08$/DFujLqVmZYc2qHWRdf.EuXZTLOlf2NzuL5ihfcJ0xkR/5vH7Fk/e",role: "Admin", imgUrl:"https://media.gettyimages.com/id/1292567082/es/foto/male-personal-trainer-sitting-on-weight-bench-after-training-client-finish-in-a-gym.jpg?s=2048x2048&w=gi&k=20&c=R9YVEJQyRcLTFX8sQsGpYwaOWzAcP1Z8D7iKv0Oxktc="},      //123
      {name: "Pablo Lospennato", email: "yosoypxl@gmail.com", hashPassword: "$2b$08$THIWbid7F5iySlIs2yxPlOracC44cyVT.hWI0Z1k88h4/G8r9awae",role: "Admin", imgUrl:"https://media.gettyimages.com/id/1319635095/es/foto/despu%C3%A9s-de-terminar-con-el-uso-de-equipos-de-ejercicio-en-el-gimnasio-moderno-el-atleta-y-el.jpg?s=2048x2048&w=gi&k=20&c=S_S2Q65ekxuy1mlmadVYawIm0VqABDTGlAh5mWdJKbo="},           //asd123
      {name: "Martin Galara", email: "martin@gmail.com", hashPassword: "$2b$08$xA9tnzZIUM63bn3dvIRPae2vZCaUk4VPQE.fuGg2MAuQ9OEqPyypG",role: "Staff", imgUrl:"https://media.gettyimages.com/id/1292567082/es/foto/male-personal-trainer-sitting-on-weight-bench-after-training-client-finish-in-a-gym.jpg?s=2048x2048&w=gi&k=20&c=R9YVEJQyRcLTFX8sQsGpYwaOWzAcP1Z8D7iKv0Oxktc="},       //hola
    ]


    Producto.bulkCreate(productos).then(() => console.log("Productos cargados"));
    Proveedor.bulkCreate(proveedores).then(() => console.log("Proveedores cargados"));
    Usuario.bulkCreate(usuario).then(() => console.log("Usuarios cargados"));

  });
});


