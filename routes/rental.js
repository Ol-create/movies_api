const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Fawn = require('fawn')

const auth = require("../middlewares/auth");
const { Rental, validate } = require("../models/rental");
const { Movies } = require("../models/movies");
const { Customer } = require("../models/customer");

// Fawn.init("mongodb://localhost:27017/genreDB");

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movies.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
    
  // new Fawn.Task()
  //   .save("rentals", rental)
  //   .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
  //   .run();

  // res.send(rental);

  const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const result = await rental.save();
      movie.numberInStock--;
      await movie.save();
      await session.commitTransaction();
      res.send(result);
    } catch (ex) {
      await session.abortTransaction();
      throw ex;
    } finally {
      session.endSession();
    }
  // } catch (ex) {
  //   res.status(500).send("Something failed.");
  // }
  
})

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");
  res.send(rental);
});

module.exports = router;
