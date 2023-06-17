const mongoose = require("mongoose");
const express = require('express');
const Joi = require("joi");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  phone: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
    isGold: {
        type: Boolean,
        default: false
  }
});

const Customer = mongoose.model("Customers", customerSchema);

//Get all Customers' data
router.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.send(customers)
})

//Create Customer's data
router.post('/', async (req, res) => {
    const customer = new Customer({
        customer_name: req.body.customer_name,
        phone: req.body.phone
    })
  
  const { error } = validateCustomer(req.body)
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
  const { error } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message);
   return res.send(customer)
})

//Delete Customer Info
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
    res.send(customer)
})

const validateCustomer = function (customer) {
 const schema = Joi.object({
    customer_name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required()
 })
  return schema.validate(customer)
}


module.exports = router