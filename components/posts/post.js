const db = require('../../db');

const posts = db.getPosts();

const findById = (id) => posts.findOne({ id });

const updatePost = (post, query) => {
  post.title = query.title;
  post.body = query.body;
  const updatedPost = posts.update(post);
  delete updatedPost.meta;
  delete updatedPost.$loki;
  return updatedPost;
};

module.exports = {
  findById,
  updatePost,
};
