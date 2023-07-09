const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')
const {Customer, validate} = require('../models/customer')



//Get all Customers' data
router.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.send(customers)
})

//Create Customer's data
router.post('/', auth, async (req, res) => {
    const customer = new Customer({
        customer_name: req.body.customer_name,
        phone: req.body.phone
    })
  
  const { error } = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message)
    const result = await customer.save()
   res.send(result)
})

//Update Customer Info
router.put('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            customer_name: req.body.customer_name,
            phone: req.body.phone,
            isGold: req.body.isGold}, { new: true }
    )
  if (!customer) return res.status(404).send("Customer with the give ID is with not found")
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);
   return res.send(customer)
})

//Delete Customer Info
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
    res.send(customer)
})


module.exports = router