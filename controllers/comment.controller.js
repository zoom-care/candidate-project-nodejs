/**
 * @file Comment controller module
 */
const db = require('../config/loki').getDatabase();
const commentsDB = db.getCollection('comments');

const CommentController = {
  
  loadCommentsByPostID(id) {
    var data = commentsDB.where(obj => obj.postId === id);
    return {err:null, comments: data};
  },
  loadComment(id) {
    return commentsDB.where(obj => obj.id === id);
  },
  deleteComment(obj) {
    commentsDB.remove(obj);
  },
};

module.exports = CommentController;