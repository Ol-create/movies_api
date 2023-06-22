const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 5,
                maxlength: 50,
                required: true
            },
            isGold: {
                type: Boolean,
                required: true
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50,
            }
        }),
        required: true,
    },
    movies: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: true,
                maxlength: true,
                trim: true
            },
            dailyRentalRate: {
                type: Number,
            }
        })
    }

})