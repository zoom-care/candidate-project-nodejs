const { posts } = require("../db")

const insertPost = function (post) {
    posts.insert(post)
}

const updatePost = function (post) {
    posts.update(post)
}

const getPostById = function (postId) {
  return posts.findOne({ 'id': parseInt(postId) })
}

const deletePost = function (postId) {
  posts.findAndRemove(postId)
}

const getPostsByUserId = function (userId) {
  return posts.find({ 'userId': { $eq: userId } })
}

module.exports = { insertPost, getPostById, deletePost, getPostsByUserId, updatePost }