const config = require('config');
const Joi = require("joi");
const express = require("express");
const app = express();
const helmet = require('helmet')
const morgan = require('morgan')
const router = require('./routes/movies')
const logger = require("./middleware/logger");

app.use(helmet());
app.use(express.json());
app.use(logger);
app.use("/api/genres", router);

if (app.get('env') === 'development') {
  app.use(morgan("tiny"));
  console.log('Morgan enabled...')
}

console.log(`App Name: ${config.get('name')}`)


const port = process.env.PORT || 30003;
app.listen(port, () => console.log(`Listening on port ${port}...`));
