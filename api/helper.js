var createError = require('http-errors');
var dataService = require('./dataService');

module.exports = {
  missingAuthHeader (req) {
    return !(req.header('Authorization') || req.header('authorization'))
  },

  // look for user's post, hand to callback or return 404
  postAction(req, res, callback) {
    const userId = Number(req.params.userId);
    const postId = Number(req.params.postId);
    const post = dataService.getPost(userId, postId);
    if (post) return callback(res, post);
    else res.status(404).json(createError(404, `Post ${postId} by ${userId} does not exist!`));
  },

  // look for user, hand to callback or return 404
  userAction(req, res, callback) {
    const userId = Number(req.params.userId);
    const user = dataService.getUser(userId);
    if (user) return callback(res, user);
    else res.status(404).json(createError(404, `User ${userId} does not exist!`));
  }
}
