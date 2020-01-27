const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

module.exports = db = {
  users,
  posts,
  comments,
};
