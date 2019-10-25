'use strict';

var lokijs  = require('../../config/loki')
var db = lokijs.getDatabase()

exports.createUser = function(req, res) {
var users = db.getCollection("users");
var newUser = users.insert(req.body);
res.json(newUser);
     
}

exports.getUsers = function(req, res){
  var users = db.getCollection("users");

  try{
    var results = users.chain().simplesort("id").data();
    ((!Array.isArray(results) || !results.length)) ? res.status(400).json({'error': 'users not found'}) : res.status(200).json(results);
  }
  catch(err){
    res.status(500).json({"error":  err});
  }
}

exports.getComments = function(req, res) {
   var comments = db.getCollection('comments');
   var postId = Number(req.params.postId); 
   
  try{
    var postComments = comments.find({'postId': postId});
    ((!Array.isArray(postComments) || !postComments.length)) ? res.status(400).json({'error': 'comment not found'}) : res.status(200).json(postComments);
  }
  catch(err){
    res.status(500).json({'error': err});
  }
}

exports.updatePost = function(req, res) {
  var posts = db.getCollection('posts');
  var postId = Number(req.body.id); 
  
  try{
    var originalPost = posts.findObject({'id': postId});
    var newPost = req.body; 
    
    if(originalPost != null){
      for(var property in newPost){
        if(newPost.hasOwnProperty(property) && originalPost.hasOwnProperty(property)){
          originalPost[property] = newPost[property];
        }
      }
      posts.update(originalPost);
    }
    else{
      res.status(400).json({'error': 'post not found'})
    }
    
    var updatedPost = posts.findObject({'id': postId});
      
    res.status(200).json(updatedPost);
  }
  catch(err){
    res.status(500).json({"error":  err});
  }    
}

exports.deleteComment = function(req, res) {
    var comments = db.getCollection('comments');
    var commentId = Number(req.params.commentId);
    
    try{
      var comment = comments.find({'id': commentId});

      if(comment == null || !comment.length) 
        res.status(400).json({'error': 'comment not found'});
          
      comments.remove(comment); 
        res.status(200).json({'comment': 'deleted'});
    }
    catch(err){
      res.status(500).json({"error":  err});
    }
    
}   