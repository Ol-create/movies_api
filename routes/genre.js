const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { Genre, validate } = require('../models/genre')
const auth = require('../middlewares/auth')


router.get("/", async (req, res) => {
  const result = await Genre.find()
  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = new Genre({
    movie_type: req.body.movie_type,
  });
result = await movie.save()
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const movie = await Genre.findByIdAndUpdate(req.params.id, {
    movie_type: req.body.movie_type
  },
    {new: true}
  );
  if (!movie)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Genre.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

module.exports = router;