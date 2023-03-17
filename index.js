require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Producto } = require('./src/db.js');
const { Insumo } = require('./src/db.js');
const { Proveedor } = require('./src/db.js');
const { Usuario } = require("./src/db.js")
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running...`); 

    const insumos = [
      // {nombre: "azucar", descripcion:"es dulce", proveedor: "Jorge Perez", unidad: "kg", categoria: "alimento", imgUrl: "https://quierocuidarme.dkv.es/sites/default/files/styles/article_teaser_big_630x360/public/2022-02/propiedades-del-azucar.jpg"},
      {categoria:"Alimentos", nombre:"ACIDO ASCORBICO", precio:9.2, proveedor:"LG", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"ACIDO CITRICO ANHIDRO", precio:4.2, proveedor:"LG", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"Acido Fosf�rico", precio:3.76, proveedor:"LG", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"AN CARAMELO 822227", precio:2, proveedor:"LG", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"AZUCAR INVERTIDO", precio:0.711, proveedor:"azucarlito", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"BENZOATO DE SODIO", precio:4.4, proveedor:"LG", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"CITRATO DE SODIO", precio:4.6, proveedor:"", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"GAS CARBONICO", precio:0.799266503667482, proveedor:"Linde", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"SORBATO DE POTASIO", precio:4.4, proveedor:"", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"JUGO DE NARANJA CLARA", precio:0, proveedor:"", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"Sabor Cola Givaudan", precio:23, proveedor:"Givaudan", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"EDTA", precio:19.6, proveedor:"", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"Sabor Naranja Givaudan", precio:29.3, proveedor:"Givaudan", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"Colorante Caramelo (INS 150d)", precio:2, proveedor:"", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"Colorante Tartrazina (Sol.al 1 % en agua)", precio:20, proveedor:"", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"Colorante Caramelo F 75", precio:2, proveedor:"", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"Sabor Pomelo Givaudan", precio:29, proveedor:"Givaudan", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"Bitter Givaudan", precio:49.5, proveedor:"Givaudan", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"Sabor Lima Lim�n", precio:17, proveedor:"", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Alimentos", nombre:"Sabor Lim�n", precio:44.1, proveedor:"", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"ADHESIVO", precio:8.74, proveedor:"Percat", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"CART�N FINO", precio:0.54, proveedor:"Pamer", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"CART�N GRUESO", precio:0.92, proveedor:"Pamer", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"ETIQUETA BID�N 6000", precio:0.0308, proveedor:"RBS", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"ETIQUETA SIF�N 2000", precio:0.0079, proveedor:"Strong", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"ETIQUETA AGUA 2000", precio:0.0055, proveedor:"Strong", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"ETIQUETA AGUA 600", precio:0.00655, proveedor:"Ecoflex", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"Etiqueta Net 2250", precio:0.0098, proveedor:"strong", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"STRECH TRANSPARENTE", precio:2.1, proveedor:"Dematte", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"TERMO TRANSPARENTE", precio:2.15, proveedor:"Conopac", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"TERMO IMPRESO", precio:2.75, proveedor:"Conopac", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Empaque", nombre:"STRECH BLANCO", precio:2.45, proveedor:"Dematte", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"ENVASE AGUA 2000", precio:0.168068459657702, proveedor:"Multiflex", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"ENVASE AGUA 600", precio:0.125061124694377, proveedor:"Multiflex", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"ENVASE BID�N SOPLADO", precio:0.447021869057321, proveedor:"Multiflex", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"ENVASE SIF�N", precio:0.204645476772616, proveedor:"Multiflex", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"PREFORMA 41 GR", precio:0.0848279039083207, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"PREFORMA 19,5 GR", precio:0.0438103116019833, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"PREFORMA 28 GR", precio:0.0598151312231475, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"PREFORMA 36 GR", precio:0.0752626167523725, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"PREFORMA 42,7 GR", precio:0.0876162174379602, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"PREFORMA 47 GR", precio:0.0949290197699995, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"PREFORMA 52,7 GR", precio:0.105051230046854, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"PREFORMA 56 GR", precio:0.114738448867334, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Envases", nombre:"PREFORMA 94GR", precio:0.194592490115113, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Tapa", nombre:"ASA BID�N", precio:0.0387286063569682, proveedor:"Multiflex", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Tapa", nombre:"CABEZAL SIFON", precio:0.175, proveedor:"Sides", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Tapa", nombre:"TAPA AMARILLA", precio:0.01282, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Tapa", nombre:"TAPA AZUL", precio:0.01282, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Tapa", nombre:"TAPA BI�N", precio:0.0264058679706601, proveedor:"Multiflex", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Tapa", nombre:"TAPA NARANJA", precio:0.01282, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Tapa", nombre:"TAPA ROJA", precio:0.01282, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""},
      {categoria:"Tapa", nombre:"Tapa Verde", precio:0.01282, proveedor:"Cristalpet", unidad:"", Descripcion:"", imgUrl:""}
    ]

    const proveedores = [
      {nombre: "Cristalpet", nombreContacto: "", descripcion:"", email:"", telefono:0},
      {nombre: "Hilosplásticos", nombreContacto: "", descripcion:"", email:"", telefono:0},
      {nombre: "Linde", nombreContacto: "", descripcion:"", email:"", telefono:0},
      {nombre: "Multiflex", nombreContacto: "", descripcion:"", email:"", telefono:0},
      {nombre: "Nortesur", nombreContacto: "", descripcion:"", email:"", telefono:0},
      {nombre: "Pamer", nombreContacto: "", descripcion:"", email:"", telefono:0},
      {nombre: "Pandoplast", nombreContacto: "", descripcion:"", email:"", telefono:0},
      {nombre: "RBS", nombreContacto: "", descripcion:"", email:"", telefono:0},
      {nombre: "IMESI", nombreContacto: "", descripcion:"", email:"", telefono:0},
      {nombre: "Ecoflex", nombreContacto: "", descripcion:"", email:"", telefono:0},
      {nombre: "Percat", nombreContacto: "", descripcion:"", email:"", telefono:0},
    ]
    
    
    
    
    
    

    const usuario = [
      {name: "Gaston Schmitz", email: "gastonschmitz0@gmail.com", hashPassword: "$2b$08$/DFujLqVmZYc2qHWRdf.EuXZTLOlf2NzuL5ihfcJ0xkR/5vH7Fk/e",role: "Admin", imgUrl:"https://media.gettyimages.com/id/1292567082/es/foto/male-personal-trainer-sitting-on-weight-bench-after-training-client-finish-in-a-gym.jpg?s=2048x2048&w=gi&k=20&c=R9YVEJQyRcLTFX8sQsGpYwaOWzAcP1Z8D7iKv0Oxktc="},      //123
      {name: "Pablo Lospennato", email: "yosoypxl@gmail.com", hashPassword: "$2b$08$THIWbid7F5iySlIs2yxPlOracC44cyVT.hWI0Z1k88h4/G8r9awae",role: "Admin", imgUrl:"https://media.gettyimages.com/id/1319635095/es/foto/despu%C3%A9s-de-terminar-con-el-uso-de-equipos-de-ejercicio-en-el-gimnasio-moderno-el-atleta-y-el.jpg?s=2048x2048&w=gi&k=20&c=S_S2Q65ekxuy1mlmadVYawIm0VqABDTGlAh5mWdJKbo="},           //asd123
      {name: "Martin Galara", email: "martin@gmail.com", hashPassword: "$2b$08$xA9tnzZIUM63bn3dvIRPae2vZCaUk4VPQE.fuGg2MAuQ9OEqPyypG",role: "Staff", imgUrl:"https://media.gettyimages.com/id/1292567082/es/foto/male-personal-trainer-sitting-on-weight-bench-after-training-client-finish-in-a-gym.jpg?s=2048x2048&w=gi&k=20&c=R9YVEJQyRcLTFX8sQsGpYwaOWzAcP1Z8D7iKv0Oxktc="},       //hola
    ]


    Insumo.bulkCreate(insumos).then(() => console.log("Insumos cargados"));
    Proveedor.bulkCreate(proveedores).then(() => console.log("Proveedores cargados"));
    Usuario.bulkCreate(usuario).then(() => console.log("Usuarios cargados"));

  });
});


