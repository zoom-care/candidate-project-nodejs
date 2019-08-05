const express = require('express');
const comment = require('../services/comment');
const { authRequest } = require('./authRequest');

const router = new express.Router();


/**
 * Retrieve all comments associated with a user's post
 */
router.get('/post/:postId', async (req, res, next) => {
  const options = {
    postId: req.params['postId']
  };

  try {
    const result = await comment.findAllByPostId(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete a comment
 */
router.delete('/:commentId', async (req, res, next) => {
  const options = {
    commentId: req.params['commentId']
  };

  try {
    authRequest(req);
    const result = await comment.deleteCommentById(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
