const db = require("../config/loki").getDatabase();

const { HTTP_OK, HTTP_CONFLICT } = require("./constants");

const getCommentsByPostId = async ({ params: { postId } }, res) => {
  console.log("postId", postId);
  if (!postId) {
    res.status(HTTP_CONFLICT).send("Post ID cannot be null or empty");
  } else {
    const comments = db.getCollection("comments");
    const normalizedPostId = parseInt(postId, 10);
    const result = await comments.find({ postId: normalizedPostId });

    res.status(HTTP_OK).send(result);
  }
};

const deleteCommentById = async ({ params: { commentId } }, res) => {
  if (!commentId) {
    res.status(HTTP_CONFLICT).send("Comment ID cannot be null or empty");
  } else {
    const comments = db.getCollection("comments");
    const normalizedCommentId = parseInt(commentId, 10);

    const result = await comments
      .chain()
      .find({ id: normalizedCommentId })
      .remove();

    res.status(HTTP_OK).send(`Comment ${commentId} deleted`);
  }
};

module.exports = {
  getCommentsByPostId,
  deleteCommentById
};
