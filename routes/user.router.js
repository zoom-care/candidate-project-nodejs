/**
 * @file User router module
 * @todo Look for better field validation/sanitization tool and its placement within controllers
 */

const express = require('express');
const router = express.Router(); 
const { validationResult, body } = require('express-validator');
const ctlUser = require('../controllers/user.controller.js');
const auth = require('../middleware/auth.js');

/**
 * Authorization for un-safe methods, in this case applied to all methods.
 * @see Other comment.router.js for different usage
 */
router.use(auth);

/**
 * Process GET
 */
router.get('/', (req, res) => {
    res.send({message:'Implementation of GET handler for /users route.'});
});

/**
 * Process POST
 */
router.post(
    '/', 
    [
        // Check for presumably required fields
      body('name').exists().trim().notEmpty(),
      body('username').exists().trim().notEmpty(),
      body('email').exists().normalizeEmail().isEmail()
    ],
    (req, res) => {
        
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).send({message: errors.array()});    
            return;
        }

        // Perform additional sanitization here - that is for other fields.
        // Skipping this as this is trivial task and not enough specs provided 
      
        // ... Any other fields and props sanitization
      
        // Save user data      
        const {err, user} = ctlUser.saveUser(req.body);
        
        // Check for error
        if (err) {
            res.status(err.status).send({message: err.message});
            return;
        }
        
        // Set location header to the newly created resource 
        res.append('Location', `/users/${user.id}`);
        // Set proper status code
        res.status(user.isNew ? 201 : 200);
        // Send user object
        res.send(user);
    }
);

module.exports = router;