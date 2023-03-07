const { Router } = require("express");
const { NOW } = require("sequelize");
const { Bills } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
    try {
      const allBills = await Bills.findAll();
      allBills.length
        ? res.status(200).json(allBills)
        : res.status(400).send("No hay remitos");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const { number, supply, quantity, client , date } = req.body;

      const {userId} = req.body;

        const newBill = await Bills.create({
          number,
          supply,
          quantity,
          client,
          userId,
          date,
        });

      res.status(200).json(newBill);
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
  
        const Bill = await Bills.findByPk(id)
    
        await Bill.update(changes)
    
        return res.status(200).json(Bill)
       
    } catch (error) {
        res.status(400).send(error.message)
    }
  })
  
  module.exports = router;
  