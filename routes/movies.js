const mongoose = require('mongoose');
const {genreSchema} = require('./genre')

const moviesSchema = mongoose.Schema({
  title: { type: String, maxLength: 50, minLength: 3, required: true },
  name: {
    type: String,
    ref: genreSchema,
    maxLength: 50,
    minLength: 3,
    required: true,
  },
  numberInStock: { type: Number, min: 0, max: 10000 },
  dailyRentalRate: { type: Number, min: 0, max: 100},
});