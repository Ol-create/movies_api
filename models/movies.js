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
