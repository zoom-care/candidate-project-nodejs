const express = require('express');
const users = require('../controllers/users')
const router = express.Router()

router.get('/users', users.getUsers)
router.get('/users/:userid', users.getUser)
router.post('/users', users.postUser)
module.exports = router