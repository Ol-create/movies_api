const mongoose = require("mongoose");
const Joi = require("joi")

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
    default: false,
  },
});

const Customer = mongoose.model("Customers", customerSchema);

const validateCustomer = function (customer) {
  const schema = Joi.object({
    customer_name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(customer);
};


module.exports.Customer = Customer
module.exports.validate = validateCustomer
