const express = require('express');
const post = require('../services/post');
const { authRequest } = require('./authRequest');

const router = new express.Router();


/**
 * Update a post
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    authRequest(req);
    const result = await post.updatePost(options);
    res.status(200).send(result.data);
  } catch (err) {
   next(err)
  }
});

module.exports = router;
