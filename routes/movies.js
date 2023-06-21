const mongoose = require('mongoose');
const { Movies, validate } = require('../models/movies')
const express = require('express');
const {Router} = require('express')

//Get all the movies
Router.get('/', async (req, res) => {
  const movies = await Movies.find()
  res.send(movies);
})