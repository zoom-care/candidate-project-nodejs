const database = require('../config/loki').getDatabase();

const posts = (root, { userId }, { errorName }) => {
  let user = null, currPosts  = null;
  const colUsers = database.getCollection('users');
  const colPosts = database.getCollection('posts');
  const validationErrors = {};
  

  user = colUsers.findOne({'id': userId });
  if (user) {
    currPosts = colPosts.find({ 'userId': userId });
  } else {
    validationErrors.userId = 'userId not found';
  }
  
  if (Object.keys(validationErrors).length > 0) {
    console.error(validationErrors);
    throw new Error(errorName.NOT_FOUND);
  }

  return currPosts;
};

const updatePost = (root, params, { errorName }) => {
  const colPosts = database.getCollection('posts');
  const postParam = params.post;
  const post = colPosts.findOne({'id': postParam.id });
  
  if (post) {
    colPosts.update(Object.assign(post, postParam));
  } else {
    throw new Error(errorName.NOT_FOUND);
  }

  return postParam;
};

exports.posts = posts;
exports.updatePost = updatePost;
// exports.deleteComment = deleteComment;
