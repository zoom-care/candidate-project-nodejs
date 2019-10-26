'use strict';

const express = require('express');
const router = express.Router();
const UserRepository = require('../respositories/UserRepository');
const User = require('../models/User');

router.get('/', (req, res) => {
    return res.json(UserRepository.find());
});

router.get('/:id', (req, res) => {
    return res.json(UserRepository.get(req.params.id));
});

router.post('/', (req, res) => {
    const newUser = req.body;
    const validation = User.schema.validate(newUser);

    if(validation.error) {
        return res.status(400).json({ message: validation.error.message });
    } else {
        // No ID increment here in the interest of simplicity (wasn't listed as a requirement)
        return res.json(UserRepository.insertOne(newUser));
    }
});


module.exports = router;