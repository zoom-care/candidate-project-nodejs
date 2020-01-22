const db = require('../../db');
const comments = db.getComments();

const findById = (id) => {
  return comments.findOne({ id });
}

const findAllByPostId = (postId) => {
  return comments.find({'postId': {'$aeq': postId}});
}

const remove = (comment) => {
  comments.remove(comment);
}

module.exports = {
  findById,
  remove,
  findAllByPostId,
}
