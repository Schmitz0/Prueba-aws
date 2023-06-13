const { Router } = require("express");
const { Receta,Insumo,Movimiento,MovimientoInsumo,RecetaMovimiento,Remito,RemitoInsumo } = require("../../db.js");
const { Op, Sequelize } = require("sequelize");

const router = Router();

router.get("/", async (req, res) => {
  try {
    // Obtén todos los insumos y calcula el valor total de su inventario
    const insumos = await Insumo.findAll();
    const valorTotal = insumos.reduce(
      (total, insumo) => total + insumo.precio * insumo.stock,
      0
    );

    res.json({ valorTotal });
  } catch (error) {
    console.error(error);
    res
    .status(500)
    .send("Error al obtener el valor total del inventario de insumos");
  }
});

router.post("/", async (req, res) => {
  const { proyeccion } = req.body;
  console.log(proyeccion);
  try {
    
    const insumo = await Insumo.findAll();
    const arrayFinal = [];    
    const nombresInsumos = [];
    
    for (let i = 0; i < proyeccion.length; i++) {
      const id = proyeccion[i].recetaId;
      const cantidad = proyeccion[i].cantidad;
      
      const recetaActual = await Receta.findByPk(id, {
        include: [
          {
            model: Insumo,
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      
      const recorrido2 = recetaActual.Insumos;
      
      for (let j = 0; j < recorrido2.length; j++) {
        const cantidadInsumo = recorrido2[j].InsumoReceta.cantidad;
        const costoInsumo = recorrido2[j].InsumoReceta.costo;
        const nombreInsumo = recorrido2[j].nombre;
        const costoFinal = costoInsumo * cantidad * cantidadInsumo;
        const cantidadTotal = cantidadInsumo * cantidad;
        const idInsumo = recorrido2[j].id;
        const stockTabla = recorrido2[j].stock;
        
        
        
        const aux = {
          nombreInsumo: nombreInsumo,
          costoFinal: costoFinal,
          cantidadTotal: cantidadTotal,
          idInsumo: idInsumo,
          stockReal:0,
          insumosRestantes:0,
        };
        
        
        
        if (!nombresInsumos.includes(nombreInsumo)) {
          nombresInsumos.push(nombreInsumo);
          
          arrayFinal.push(aux);
          aux.stockReal = Number(stockTabla);
          aux.insumosRestantes= aux.stockReal - aux.cantidadTotal 
          
          
        } else {
          let objetoBuscado = aux.nombreInsumo;
          let index = arrayFinal.findIndex(
            (objeto) => objeto.nombreInsumo === objetoBuscado
            );
            
            if (index !== -1) {
              arrayFinal[index].costoFinal += aux.costoFinal;
              arrayFinal[index].cantidadTotal += aux.cantidadTotal;
              
            }
          }
        }
        
        
      }
      
    res.json(arrayFinal);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al hacer el proyectado");
  }
});

router.post('/insumoCantidad', async (req, res) => {
  const { filters } = req.body;



  try {

    if (!filters) {
      throw new Error('Faltan Datos');
    }
    const productData = await Movimiento.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.literal(`EXTRACT(YEAR FROM "createdAt")`),
            filters.year
          ),
          Sequelize.where(
            Sequelize.literal(`EXTRACT(MONTH FROM "createdAt")`),
            parseInt(filters.month, 10)
          ),
          {
            tipoDeMovimiento:'Receta'
          }
        ]
      },
      include: [
        {
          model: Insumo,
          attributes: ['id', 'nombre', 'precio','categoria'],
          through: { attributes: ['cantidad'] }
        },
        {
          model: MovimientoInsumo,
          attributes: ['cantidad'],
          include: {
            model: Insumo,
            attributes: ['id', 'nombre', 'precio','categoria']
          }
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    // Sumar las cantidades por insumo
    const insumosTotales = {};
    productData.forEach((movimiento) => {
      movimiento.Insumos.forEach((insumo) => {
        const { id, nombre, precio,categoria } = insumo;
        const cantidad = Number(insumo.MovimientoInsumo.cantidad);

        if (insumosTotales[id]) {
          insumosTotales[id].cantidad += cantidad;
        } else {
          insumosTotales[id] = { id, nombre, precio, cantidad,categoria };
        }
      });
    });

    const insumosTotalesArray = Object.values(insumosTotales);

    return res.status(200).send(insumosTotalesArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
});



router.get('/insumosPrecios', async (req, res) => {

      try {

          const insumos = await Insumo.findAll({
            attributes:['nombre', 'precio']
          });

      


      return res.status(200).send(insumos)
      } catch (error) {
      res.status(400).send(error.message)
      }
})
 

router.post("/insumoControl", async (req, res) => { 
  const { filters } = req.body;

  try {
    if (!filters) {
      throw new Error('Faltan Datos');
    }

    const response = await Movimiento.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.literal(`EXTRACT(YEAR FROM "createdAt")`),
            filters.year
          ),
          Sequelize.where(
            Sequelize.literal(`EXTRACT(MONTH FROM "createdAt")`),
            parseInt(filters.month, 10)
          ),
          {
            tipoDeMovimiento: { [Op.or]: ["Movimiento de insumo"] },
          }
        ]
      },
      include: [
        {
          model: Insumo,
          attributes: ['id', 'nombre', 'precio','categoria'],
          through: { attributes: ['cantidad'] }
        },
        {
          model: MovimientoInsumo,
          attributes: ['cantidad'],
          include: {
            model: Insumo,
            attributes: ['id', 'nombre', 'precio','categoria']
          }
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });




// Obtener el objeto con el insumo, cantidad y categoría
const result = Object.values(response.reduce((obj, movimiento) => {
  movimiento.Insumos.forEach((insumo) => {
    if (obj[insumo.id]) {
      obj[insumo.id].cantidad += 1;
    } else {
      obj[insumo.id] = {
        nombre: insumo.nombre,
        cantidad: 1,
        categoria: insumo.categoria
      };
    }
  });
  return obj;
}, {}));



    return res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
