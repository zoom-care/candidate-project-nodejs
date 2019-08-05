// should probably be exposed thorugh middlewhere
const db = require('../../../config/loki').getDatabase();

/**
 * Updates the contents of the given post with the body data.
 * @param {Object} options
 * @param {Object} options.body Created user object
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updatePost = async (options) => {
  try {
    const { body } = options;
    const posts = db.getCollection('posts');
    const current = posts.find({ id: body.id})[0];
    const newPostContent = Object.assign(current, body);
    const result = posts.update(newPostContent);

    return {
      status: 200,
      data: `Post updated: ${JSON.stringify(result, undefined, 2)}`
    };
  } catch (e) {
    throw e;
  }
};
