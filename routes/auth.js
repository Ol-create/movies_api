const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../models/users");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const validateEmail = User.findOne({
    email: req.body.email,
  });

  if (!validateEmail) return res.status(400).send("Invalid email or password");

    const user = new User(_.pick(req.body, ["email", "password"]));
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send("Invalid email or password");

  res.send(true)
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().min(10).max(255).required(),
    password: Joi.string().email().min(10).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;
