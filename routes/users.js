const _ = require('lodash') 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {User, validateUser} = require('../models/users')

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const validateEmail = User.findOne({
        email: req.body.email
    })
    
    if (validateEmail) return res.status(400).send('User already registered!');
    
    const user = new User(
       _.pick(req.body, ['name', 'email', 'password'])
    )

    await user.save()
    
    res.send(_.pick(user, ['_id', 'name', 'email']))

})

module.exports = router