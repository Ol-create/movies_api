const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, async(req, res) => {
    const result = await User.findById(req.user._id)
        .select('-password')
    res.send(result)

})

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const validateEmail = await User.findOne({
        email: req.body.email
    })
    
    if (validateEmail) return res.status(400).send('User already registered!');
    
    const user = new User(
       _.pick(req.body, ['name', 'email', 'password'])
    )
    
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    
    await user.save()
    const token = user.generateToken()
    
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))

})

module.exports = router