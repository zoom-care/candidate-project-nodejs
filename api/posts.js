var express = require('express');
var router = express.Router();
var auth = require('./authorization');

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

router.patch('/:id', auth, getPosts,(req,res,next) => {

  let thisPost = req.posts.findOne({"id": Number(req.params.id)});  

  //update the values provided.
  thisPost.title = (req.body.title != undefined) ? String(req.body.title): thisPost.title;
  thisPost.body = (req.body.body != undefined) ? String(req.body.body): thisPost.body;

  req.posts.update(thisPost);

  res.send(`/api/posts/${req.params.id}`);
  res.status(200);
})

module.exports = router;