const db = require('../config/loki').getDatabase();

const { HTTP_OK } = require('../util/constants');

const getAllPosts = async (req, res) => {
  const posts = db.getCollection('posts');
  const result = await posts.find();
  res.status(HTTP_OK).send(result);
};

const updatePost = async ({ body }, res) => {
  if (!body) {
    res.status(HTTP_CONFLICT).send({
      errorType: HTTP_CONFLICT,
      message: 'Body cannot be null or empty'
    });
  } else {
    const posts = db.getCollection('posts');
    const current = await posts.find({ id: body.postId })[0];
    const result = posts.update(Object.assign(current, body));

    res.status(HTTP_OK).send({ message: 'Post updated' });
  }
};

module.exports = {
  getAllPosts,
  updatePost
};
