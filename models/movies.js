const Joi = require('joi');
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const moviesSchema = mongoose.Schema({
  title: {
    type: String,
    maxLength: 50,
    minLength: 3,
    required: true,
    trim: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: { type: Number, min: 0, max: 10000, required: true },
  dailyRentalRate: { type: Number, min: 0, max: 100, required: true },
});

const Movies = mongoose.model('movies', moviesSchema);

function validateMovies(genre) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).trim().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(1000).trim().required(),
    dailyRentalRate: Joi.number().min(0).max(100).trim().required(),
  });

  return schema.validate(genre);
}

module.exports.Movies = Movies;
module.exports.validate = validateMovies;