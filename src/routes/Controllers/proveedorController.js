const { Router } = require("express");
const { Proveedor } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll({order: [['id', 'ASC']]});
        res.json(proveedores);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los proveedores');
      }
  }
)

router.get("/:id", async (req, res) => {
  const { id } = req.params;
    try {
      const proveedorId = await Proveedor.findByPk(id);
      !proveedorId ?
      res.status(400).send("El ID del proveedor no fue encontrado") :
      res.status(200).send(proveedorId)
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el proveedor solicitado');
      }
  }
)

router.post("/", async (req, res) => {
    const { nombre, nombreContacto, email, descripcion, telefono} = req.body;
    try {
      const proveedor = await Proveedor.create({ nombre, nombreContacto, email, descripcion, telefono });
      res.json(proveedor);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el proveedor');
    }
  }
)

router.put('/:id', async (req, res) => {
  const { id } = req.params 
  const changes = {}

  for (const property in req.body) {
      if(property !== "id" && property !== "userRole" && property !== "userName") changes[property] = req.body[property]
    }

  try {
      const proveedor = await Proveedor.findByPk(id)

      await proveedor.update(changes)

      return res.status(200).json(proveedor)

  } catch (error) {
      res.status(400).send(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const proveedorToDelete = await Proveedor.findByPk(id);
      if (proveedorToDelete) {
          await proveedorToDelete.destroy()
          res.status(200).send(`El proveedor de id ${id} fue borrado con éxito`)
      }
  } catch (error) {
      res.status(400).send(error.message)
  }
})

module.exports = router;