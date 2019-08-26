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

//Delete a comment
router.delete('/:id', auth, getComments, (req,res,next) => {
  let comment = req.comments.findOne({id:Number(req.params.id)});
  if(comment != null) {
    req.comments.remove(comment);
    res.status(200);
    res.send("Deleted");
  }else{
    res.status(404);
    res.send("Comment not found");
  }
});

module.exports = router;