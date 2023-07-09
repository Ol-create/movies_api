const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    minlength: 5,
    required: true,
  },
  email: {
    type: String,
    maxlength: 50,
    minlength: 5,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxlength: 1024,
    required: true,
  },
});

const User = mongoose.model('Users', userSchema)

function validateUser(user) {
   
   const schema =  Joi.object({
          name: Joi.string().required().min(5).max(50),
          email: Joi.string().email().min(10).max(255).required(),
          password: Joi.string().email().min(10).max(255).required(),
        });
   return schema.validate(user)
}

module.export.User = User
module.exports.validateUser = validateUser


