const database = require('../config/loki').getDatabase();
const UserInputError = require('apollo-server').UserInputError;

exports.comments = (root, { userId, postId }) => {
  let user = null, post  = null, currentComments = null;
  const users = database.getCollection('users');
  const posts = database.getCollection('posts');
  const comments = database.getCollection('comments');
  const validationErrors = {};
  
  user = users.find({'id': userId })[0];
  if (user) {
    post = posts.find({ 'userId': userId, "id": postId })[0];
    if (post) {
      currentComments = comments.find({ postId: postId });
    }  else {
      validationErrors.postId = 'postId not found';
    }
  } else {
    validationErrors.userId = 'userId not found';
  }
  
  if (Object.keys(validationErrors).length > 0) {
    throw new UserInputError(
      'Failed to get comments due to validation errors',
      { validationErrors }
    );
  }

  return currentComments;
};
