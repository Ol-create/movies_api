const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { Movies, validate } = require("../models/movies");
const { Genre } = require("../models/genre");
const auth = require('../middlewares/auth')

//Get all the movies
router.get('/', async (req, res) => {
  const movies = await Movies.find().sort('name')
  res.send(movies);
})

//Post new movie
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);

  if (!genre) res.status(400).send('Invalid Genre');

  let movie = new Movies({
      title: req.body.title,
    genre: {
      _id: genre._id,
    },
  numberInStock: req.body.numberInStock,
  dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);
})
  
module.exports = router;