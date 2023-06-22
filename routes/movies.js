const mongoose = require('mongoose');
const { Movies, validate } = require('../models/movies')
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

//Get all the movies
router.get('/', async (req, res) => {
  const movies = await Movies.find().sort('name')
  res.send(movies);
})

//Post new movie
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);

  if (!genre) res.status(400).send('Invalid Genre');

  let movie = new Movies({
      title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.body
    },
  numberInStock: req.body.numberInStock,
  dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.sav();
  res.send(movie);
  })