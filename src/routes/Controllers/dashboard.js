const { Router } = require("express");
const { Insumo } = require("../../db.js");
const { Receta } = require("../../db.js");
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
        const costoFinal = costoInsumo * cantidad;
        const cantidadTotal = cantidadInsumo * cantidad;
        const idInsumo = recorrido2[j].id;

        const aux = {
          nombreInsumo: nombreInsumo,
          costoFinal: costoFinal,
          cantidadTotal: cantidadTotal,
          idInsumo: idInsumo,
        };

        if (!nombresInsumos.includes(nombreInsumo)) {
          nombresInsumos.push(nombreInsumo);

          arrayFinal.push(aux);
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

module.exports = router;
