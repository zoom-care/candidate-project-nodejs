var logger = require('../logger');
var db = require('../config/loki');
// load in-memory data
// (normally, this would be invoked during server start)
db.init();

var users = db.getDatabase().getCollection('users');
var posts = db.getDatabase().getCollection('posts');
var comments = db.getDatabase().getCollection('comments');

module.exports = {

  // users

  createUser (newUser) {
    logger.info('Creating new user:', newUser);
    return users.insertOne(newUser);
  },

  removeUser (user) {
    logger.info('Removing user:', user);
    return users.remove(user);
  },

  getAllUsers () {
    logger.debug('Fetching all users');
    return users.find({});
  },

  getUser (userId) {
    logger.debug(`Finding user: ${userId}`);
    return users.findOne({'id': { '$eq' : Number(userId) }});
  },

  saveUser (user) {
    logger.info('Updating user:', user);
    return users.update(user);
  },

  // posts

  createPost (newPost) {
    logger.info('Creating new post:', newPost);
    return posts.insertOne(newPost);
  },

  removePost (post) {
    logger.info('Removing post:', post);
    return posts.remove(post);
  },

  getAllPosts (userId) {
    logger.debug(`Fetching posts for user: ${userId}`);
    return posts.find({'userId': { '$eq' : Number(userId) }});
  },

  getPost (userId, postId) {
    logger.debug(`Fetching post ${postId} for user: ${userId}`);
    return posts.findOne({'userId': { '$eq' : Number(userId) }, 'id': { '$eq' : Number(postId) }});
  },

  savePost (post) {
    logger.info('Updating post:', post);
    return posts.update(post);
  },

  // comments

  createComment (newComment) {
    logger.info('Creating new comment:', newComment);
    return comments.insertOne(newComment);
  },

  removeComment (comment) {
    logger.info('Removing comment:', comment);
    return comments.remove(comment);
  },

  getAllComments (userId, postId) {
    logger.debug(`Fetching comments for post/user: ${postId}/${userId}`);
    return comments.find({'postId': { '$eq' : Number(postId) }});
  },

  getComment (userId, postId, commentId) {
    logger.debug(`Fetching comment ${commentId} from ${postId} by user: ${userId}`);
    return comments.findOne({'postId': { '$eq' : Number(postId) }, 'id': { '$eq' : Number(commentId) }});
  },

  saveComment (comment) {
    logger.info('Updating comment:', comment);
    return comments.update(comment);
  }

}
