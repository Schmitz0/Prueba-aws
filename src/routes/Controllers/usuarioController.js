const { Router } = require("express");
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Usuario, Movimiento, Insumo } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
      }
  }
)

router.get("/:id", async (req, res) => {
  const { id } = req.params;
    try {
      const usuarioId = await Usuario.findByPk(id);
      !usuarioId ?
      res.status(400).send("El ID del usuario no fue encontrado") :
      res.status(200).send(usuarioId)
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el usuario solicitado');
      }
  }
)

router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashPassword = await bcrypt.hash(password,8)
      const usuario = await Usuario.create({ name, email, hashPassword });
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el usuario');
    }
  }
)

router.put('/:id', async (req, res) => {
  const { id } = req.params 
  const changes = {}
  
  try {
  for (const property in req.body) {
      if(property !== "role" || property !== "name" || property !== "imgUrl" || property !== "email" || property !== "password") changes[property] = req.body[property]
    }
  changes.hashPassword = await bcrypt.hash(changes.password,8)
  changes.password = ""
  console.log(changes);
    console.log(changes, id);
      const usuario = await Usuario.findByPk(id)
      await usuario.update(changes)
      return res.status(200).json(usuario)
  } catch (error) {
      res.status(400).send(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const usuarioToDelete = await Usuario.findByPk(id);
      if (usuarioToDelete) {
          await usuarioToDelete.destroy()
          res.status(200).send(`El usuario de id ${id} fue borrado con éxito`)
      }
  } catch (error) {
      res.status(400).send(error.message)
  }
})

router.post('/registro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const movimientos = await Movimiento.findAll({
      where: {
        usuario: id,
      },
    });
    console.log(movimientos);
    res.json(movimientos);
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router;