// should probably be exposed thorugh middlewhere
const db = require('../../../config/loki').getDatabase();

/**
 * Uses options.postId to lookup all comments for the given post
 * @param {Object} options
 * @param {String} options.postId 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.findAllByPostId = async (options) => {
  try {
    const { postId } = options;
    const comments = db.getCollection('comments');
    const result = comments.find({postId: parseInt(postId, 10)});

    return {
      status: 200,
      data: result
    };
  } catch (e) {
    next(e);
  }
};

/**
 * Uses options.commentId to delete the given comment
 * @param {Object} options
 * @param {String} options.commentId 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteCommentById = async (options) => {
  try {
    const { commentId } = options;
    const comments = db.getCollection('comments');
    const commentToDelete = comments.find({ id: parseInt(commentId, 10) })[0];
    const result = comments.remove(commentToDelete.$loki);
    return {
      status: 200,
      data: `Comment ${commentId} deleted: ${result}`
    };
  } catch (e) {
    throw e;
  }
};

