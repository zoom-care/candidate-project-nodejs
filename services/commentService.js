const { comments } = require("../db")

const insertComment = function (comment) {
  comments.insert(comment)
}

const updateComment = function (comment) {
  comments.update(comment)
}

const getCommentById = function (commentId) {
  return comments.findOne({ 'id': parseInt(commentId) })
}

const deleteComment = function (comment) {
  comments.remove(comment)
}

const getCommentsByPostId = function (postId) {
  return comments.find({ 'postId': { '$eq': parseInt(postId) } })
}

module.exports = { insertComment, getCommentById, deleteComment, getCommentsByPostId, updateComment }