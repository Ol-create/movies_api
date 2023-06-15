const mongoose = require("mongoose");
const Joi = require("joi");
const router = mongoose.Router();

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
  isGold: Boolean,
});

const Customer = mongoose.model("Customers", customerSchema);
