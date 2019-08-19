const db = require("../config/loki").getDatabase();

const { HTTP_OK } = require("./constants");

const updatePost = async ({ body }, res) => {
  if (!body) {
    res.status(HTTP_CONFLICT).send("Body cannot be null or empty");
  } else {
    const posts = db.getCollection("posts");
    const current = await posts.find({ id: body.postId })[0];

    const result = posts.update(Object.assign(current, body));

    res.status(HTTP_OK).send("Post updated");
  }
};

module.exports = {
  updatePost
};
