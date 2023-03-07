const { Router } = require("express");
const { Supplies } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allItems = await Supplies.findAll();
    allItems.length
      ? res.status(200).json(allItems)
      : res.status(400).send("no hay Insumos");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, category, unit, description, cost, client, imgUrl, stock } =
      req.body;

    const newItem = await Supplies.create({
      name,
      category,
      unit,
      description,
      cost,
      client,
      imgUrl,
      stock,
    });

    res.status(200).json(newItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {

  const { id } = req.params 

  const changes = {}

  for (const property in req.body) {
      if(property !== "id") changes[property] = req.body[property]
    }
  
  try {

      const product = await Supplies.findByPk(id)
  
      await product.update(changes)
  
      return res.status(200).json(product)
     
  } catch (error) {
      res.status(400).send(error.message)
  }
})

module.exports = router;
