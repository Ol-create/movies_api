const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require("joi");

const genreSchema = mongoose.Schema({
  movie_type: {
    type: String,
    required: true,
    min: 3,
    max: 50
  }
})

const Genre = mongoose.model("movies", genreSchema);

router.get("/", async (req, res) => {
  const result = await Genre.find()
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
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

  const { error } = validateGenre(req.body);
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

function validateGenre(genre) {
  const schema = Joi.object({
    movie_type: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = router;
module.exports = genreSchema;