var express = require('express');
var router = express.Router();
var auth = require('./authorization');

var db = require('../config/loki').getDatabase();

let getComments = (req, res, next) => {
  req.comments = db.getCollection('comments');
  next();
}

//Get a specific Comment

//Get a specific post
router.get('/posts/:postId', getComments, (req,res,next) => {
  let postComments = req.comments.find({postId: Number(req.params.postId)});
  res.status(200);
  res.json(postComments);
});

router.delete('/:id', getComments, (req,res,next) => {
});


module.exports = router;