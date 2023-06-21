
function validateMovies(movies) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).trim().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(10000).required(),
    dailyRentalRate: Joi.number().min(0).max(100).required(),
  });

  return schema.validate(movies);
}