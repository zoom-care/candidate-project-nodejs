const express = require('express');
const user = require('../services/user');
const { authRequest } = require('./authRequest');
const router = new express.Router();

/**
 * Retrieve all users
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await user.findAll(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Create user
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    authRequest(req);
    const result = await user.createUser(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
