const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Rental, validate } = require("../models/rental");
const { Movies } = require('../models/movies');
const { Customer } = require('../models/customer');
const Fawn = require('fawn');

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const customer = await Customer.findById(req.body.customerId)
  if (!customer) return res.status(400).send('Invalid Customer')

   let movies = await Movies.findById(req.body.moviesId);
  if (!movies) return res.status(400).send("Invalid Customer");
  
  if (movies.numberInStock === 0) return res.status(400).send('No movies in stock')

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movies: {
      _id: movies,
      title: movies.title,
      dailyRentalRate: movies.dailyRentalRate
    }
  })
  
  new Fawn.Task()
    .save('rentals', rental)
    .update('movies', { _id: movies._id },
      { $inc: { numberInStock: m - 1 } }
    ).run();

  rental = await rental.save();
});

