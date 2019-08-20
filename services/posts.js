const db = require('../config/loki').getDatabase();

const { HTTP_OK } = require('../util/constants');

const getAllPosts = async (req, res) => {
  const posts = db.getCollection('posts');
  const result = await posts.find();
  res.status(HTTP_OK).send(result);
};

const updatePost = async ({ params: { postId }, body }, res) => {
  if (isNaN(postId)) {
    res.status(HTTP_CONFLICT).send({
      errorType: HTTP_CONFLICT,
      message: 'Post ID must be a valid number'
    });
  } else {
    const posts = db.getCollection('posts');
    const normalizedPostId = parseInt(postId, 10);
    const current = await posts.find({ id: normalizedPostId })[0];
    console.log('current', current, normalizedPostId);
    const result = posts.update(Object.assign(current, body));

    res.status(HTTP_OK).send({ message: 'Post updated' });
  }
};

module.exports = {
  getAllPosts,
  updatePost
};
