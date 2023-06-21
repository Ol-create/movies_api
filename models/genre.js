const mongoose = require('mongoose');
const Joi = require("joi");

const genreSchema = mongoose.Schema({
  movie_type: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
});

const Genre = mongoose.model("movies", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    movie_type: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports.genreSchema = genreSchema
module.exports.Genre = Genre
module.exports.validate = validateGenre