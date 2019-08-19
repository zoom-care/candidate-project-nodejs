const database = require('../config/loki').getDatabase();

const comments = (root, { userId, postId }, { errorName }) => {
  let user = null, post  = null, currentComments = null;
  const colUsers = database.getCollection('users');
  const colPosts = database.getCollection('posts');
  const colComments = database.getCollection('comments');
  const validationErrors = {};
  

  user = colUsers.findOne({'id': userId });
  if (user) {
    post = colPosts.findOne({ 'userId': userId, "id": postId });
    if (post) {
      currentComments = colComments.find({ postId: postId });
    }  else {
      validationErrors.postId = 'postId not found';
    }
  } else {
    validationErrors.userId = 'userId not found';
  }
  
  if (Object.keys(validationErrors).length > 0) {
    console.error(validationErrors);
    throw new Error(errorName.NOT_FOUND);
  }

  return currentComments;
};

const deleteComment = (root, { id }, { errorName }) => {
  const colComments = database.getCollection('comments');
  const comment = colComments.findOne({ id });
  
  if (comment) {
    colComments.remove(comment);
    return comment;
  } else {
    throw new Error(errorName.NOT_FOUND);
  }
};

exports.comments = comments;
exports.deleteComment = deleteComment;
