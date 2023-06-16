const mongoose = require("mongoose");
const express = require('express');
const Joi = require("joi");
const router = express.Router();

const customerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  phone: {
    type: String,
    required: true,
    min: 7,
    max: 15,
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
    const result = await customer.save()
   res.send(result)
})

//Update Customer Info
router.put('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            customer_name: req.body.customer_name,
            phone: req.body.phone,
            isGold: req.body.isGold
        },
        { new: true })
    res.send(customer)
})

//Delete Customer Info
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
    res.send(customer)
})

const validateCustomer = function () {
 return  Joi.object({
    customer_name: String.min(5).max(50).required(),
    phone: String.min(5).max(50).required()
  })
}


module.exports = router