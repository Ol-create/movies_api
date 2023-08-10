const mongoose = require('mongoose');
const config = require('config');
const express = require("express");
const helmet = require('helmet')
const morgan = require('morgan')
const genre = require('./routes/genre')
const movies = require('./routes/movies')
const customer = require("./routes/customer");
const rental = require("./routes/rental")
const users = require("./routes/users");
const auth = require("./routes/auth");
const Fawn = require('fawn')


if (!config.get('jwtPrivateKey')) {
  console.log('Error: SecretKey is not defined!');
  process.exit(1);
}

const app = express();
app.use(helmet());
app.use(express.json());
app.use('/api/movies', movies);
app.use('/api/genre', genre);
app.use('/api/customer', customer);
app.use('/api/rental', rental);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(function (err, req, res, next) {
  res.status(500).send('Something failed')
})

if (app.get('env') === 'development') {
  app.use(morgan("tiny"));
  console.log('Morgan enabled...')
}

// console.log(`App Name: ${config.get('name')}`)

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening on port ${port}...`));
mongoose.connect('mongodb://localhost:27017/genreDB')
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch(err => console.log(`Error: Unable to connect to MongDB Server ${err}`))

Fawn.init("mongodb://localhost:27017/genreDB");