var express = require('express');
var router = express.Router();

var db = require('../config/loki').getDatabase();

let getPosts = (req, res, next) => {
  req.posts = db.getCollection('posts');
  next();
}

router.get('/', getPosts, (req,res,next) => {
  console.log("here");
  res.status(200);
  res.json(req.posts.data);
})

router.get('/:id', getPosts,(req,res,next) => {
//

  let thisPost = req.posts.findOne({"id":Number(req.params.id)});
  
  if(thisPost != null){
    res.status(200);
    res.json(thisPost);
  }else{
    res.status(404);
    res.send("not found");
  }
})

router.patch('/:id', getPosts,(req,res,next) => {

  let thisPost = req.posts.findOne({"id": Number(req.params.id)});  
  
  //update the values provided.
  thisPost.title = String(req.body.title);
  thisPost.body = String(req.body.body);

  req.posts.update(thisPost);

  res.send(`/posts/${req.params.id}`);
  res.status(200);
})

module.exports = router;