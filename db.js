var loki = require('lokijs');

var comments;
var posts;
var users;

const seed = () => {
  const db = new loki('zoom-care-example');
  users = db.addCollection('users', { indices: ['email'], unique: 'email'});
  posts = db.addCollection('posts', { indices: ['userId'] });
  comments = db.addCollection('comments', { indices: ['postId'] });

  var commentData = require('./data/comments.json');
  var postData = require('./data/posts.json');
  var userData = require('./data/users.json');

  for (let comment of commentData) {
    comments.insert(comment);
  }

  for (let post of postData) {
    posts.insert(post);
  }

  for (let user of userData) {
    users.insert(user);
  }
}

const getComments = () => {
  return comments;
}

const getPosts = () => {
  return posts;
}

const getUsers = () => {
  return users;
}

module.exports = {
  seed,
  getComments,
  getPosts,
  getUsers,
};
