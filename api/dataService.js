var db = require('../config/loki');

// load in-memory data (normally, this would be invoked during server start)
db.init();

var users = db.getDatabase().getCollection('users');
var posts = db.getDatabase().getCollection('posts');

module.exports = {

  createUser (newUser) {
    return users.insertOne(newUser);
  },

  removeUser (user) {
    return users.remove(user);
  },

  getAllUsers () {
    return users.find({});
  },

  getUser (userId) {
    return users.findOne({'id': { '$eq' : Number(userId) }});
  },

  saveUser (user) {
    return users.update(user);
  },

  // posts

  createPost (newPost) {
    return posts.insertOne(newPost);
  },

  removePost (post) {
    return posts.remove(post);
  },

  getAllPosts (userId) {
    return posts.find({'userId': { '$eq' : Number(userId) }});
  },

  getPost (userId, postId) {
    return posts.findOne({'userId': { '$eq' : Number(userId) }}, {'id': { '$eq' : Number(postId) }});
  },

  savePost (post) {
    return posts.update(post);
  },

}
