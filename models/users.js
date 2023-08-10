const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  email: {
    type: String,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id, name: this.name }, 'jwtPrivateKey');
}

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(user);
}

const User = mongoose.model('User', userSchema)

module.exports.User = User;
module.exports.validateUser = validateUser;