/**
 * @file Comment router module
 */

const express = require('express');
const router = express.Router(); 
const { validationResult, param, check } = require('express-validator');
const ctlComment = require('../controllers/comment.controller.js');
const auth = require('../middleware/auth.js');

/**
 * Process GET
 */
router.get(
  '/:id',
  // Check post ID
  param('id').exists().notEmpty().isInt({min:1}),
  (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send({message: "Valid post ID required"});
      return;
    }
    // Save user data      
    const {err, comments} = ctlComment.loadCommentsByPostID(parseInt(req.params.id));
    // Check for error
    if (err) {
      res.status(err.status).send({message: err.message});
      return;
    }
    res.status(comments.length ? 200 : 204);
    res.send({items:comments});
});

/**
 * Process DELETE
 */
router.delete(
    '/:id',
    auth,     // Example of using auth for a particular method 
    param('id').exists().notEmpty().isInt({min:1}),
    (req, res) => {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).send({message: "Valid comment ID is required"});
        return;
      }

      var comment = ctlComment.loadComment(parseInt(req.params.id));
      
      if (!comment.length) {
        res.status(422);
        res.send("Comment not found");
        return;
      }
      
      ctlComment.deleteComment(comment);
      res.status(200).send("Comment has been deleted");
    }
);

module.exports = router;