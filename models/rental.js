const mongoose = require('mongoose');

const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 5,
                maxlength: 5,
            },
            isGold: {
                type: Boolean,
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50,
            }
        }),
    },
    movies: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 4,
                maxlength: 50,
                trim: true
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        })
    },
    dateOut: {
        type: Date,
        default: Date.now,
    },

    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }

});

const Rental = mongoose.model('rentals', rentalSchema)

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.string().min(24).required(),
    movieId: Joi.string().min(24).required(),
  });

  return schema.validate(rental);
}


module.exports.validate = validateRental;
module.exports.Rental = Rental