const db = require('../config/loki').getDatabase();

const { HTTP_OK, HTTP_CONFLICT } = require('../util/constants');

const getCommentsByPostId = async ({ params: { postId } }, res) => {
  if (isNaN(postId)) {
    res.status(HTTP_CONFLICT).send({
      errorType: HTTP_CONFLICT,
      message: 'Post ID must be a valid number'
    });
  } else {
    const comments = db.getCollection('comments');
    const normalizedPostId = parseInt(postId, 10);
    const result = await comments.find({ postId: normalizedPostId });

    res.status(HTTP_OK).send(result);
  }
};

const deleteCommentById = async ({ params: { commentId } }, res) => {
  if (!commentId) {
    res.status(HTTP_CONFLICT).send({
      errorType: HTTP_CONFLICT,
      message: 'Comment ID must be a valid number'
    });
  } else {
    const comments = db.getCollection('comments');
    const normalizedCommentId = parseInt(commentId, 10);

    const result = await comments
      .chain()
      .find({ id: normalizedCommentId })
      .remove();

    res.status(HTTP_OK).send({ message: `Comment ${commentId} deleted` });
  }
};

module.exports = {
  getCommentsByPostId,
  deleteCommentById
};
