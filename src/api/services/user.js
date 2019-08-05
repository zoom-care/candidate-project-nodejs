// should probably be exposed thorugh middlewhere
const db = require('../../../config/loki').getDatabase();

/**
 * @param {Object} options
 * @param {Object} options.body Created user object
 * @throws {Error}
 * @return {Promise}
 */
module.exports.createUser = async (options) => {
  try {
    const users = db.getCollection('users');
    // should validate user schema
    const result = users.insert(options);
    return {
      status: 200,
      data: 'User Created'
    };
  } catch (e) {
    next(e)
  }
};

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.findAll = async (options) => {
  try {
    const users = db.getCollection('users')
    const result = users.find()
    return {
      status: 200,
      data: result
    };
  } catch (e) {
    next(e)
  }
};