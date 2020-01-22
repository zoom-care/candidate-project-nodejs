const db = require('../../db');

const comments = db.getComments();

const findById = (id) => comments.findOne({ id });

const findAllByPostId = (postId) => comments.find({ postId: { $aeq: postId } });

const remove = (comment) => {
  comments.remove(comment);
};

module.exports = {
  findById,
  remove,
  findAllByPostId,
};
