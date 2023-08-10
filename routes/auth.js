const _ = require("lodash");
const Joi = require('joi')
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../models/users");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({
    email: req.body.email
  });

  if (!user.email) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send("Invalid email or password");
  
    const token = user.generateToken()
  res.send(token)
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().min(8).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;
