/**
 * @file Post router module
 * @todo Look for better field validation/sanitization tool and its placement within controllers
 */

const express = require('express');
const router = express.Router(); 
const { validationResult, body, param } = require('express-validator');
const ctlPost = require('../controllers/post.controller.js');
const auth = require('../middleware/auth.js');

/**
 * Authorization for un-safe methods, in this case applied to all methods.
 * @see Other comment.router.js for different usage
 */
router.use(auth);

/**
 * Process GET
 */
router.get(
  '/:id',
  // Check for required fields
  param('id').exists().notEmpty().isInt({min:1}),
  (req, res) => {
    res.status(501);
    res.send("GET placeholder for /posts");
      
  }
);

/**
 * Process PUT
 * 
 * NOTE: skipping new post creation if post is not found 
 */
router.put( 
  '/:id', 
  // Check for required fields 
  [
    param('id').exists().notEmpty().isInt({min:1}),
    body('title').exists().notEmpty().isString(),
    body('body').exists().notEmpty().isString()
  ],
  (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send({message: "Required field is missing"});
      return;
    }
    
    // Possible additional validations for body and title go here
    // ...
  
    var id = parseInt(req.params.id);
    
    // Update post      
    const {err, post} = ctlPost.updatePost(id, req.body);
  
    // Check for error
    if (err) {
      res.status(err.status).send({message: err.message});
      return;
    }
  
    // Set location header 
    res.append('Location', `/posts/${id}`);
    // Set proper status code
    res.status(200);
    // Send user object
    res.send(post);
  }
);

module.exports = router;