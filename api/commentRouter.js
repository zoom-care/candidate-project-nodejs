var createError = require('http-errors');
var express = require('express');
var dataService = require('./dataService');
var helpers = require('./helper')

// look for post's comment, hand to callback or return 404
const commentAction = (req, res, callback) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const comment = dataService.getComment(userId, postId, commentId);
  if (comment) return callback(res, comment);
  else res.status(404).json(createError(404, `Comment ${commentId} from Post ${postId} does not exist!`));
};

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var commentRouter = express.Router({mergeParams: true});

commentRouter.all('*', (req, res, next) => {
  helpers.checkAuthHeader(req, res, next);
});

commentRouter.route('/')
  .get((req, res) => {
    res.status(200).send(dataService.getAllComments(req.params.userId, req.params.postId));
  })
  .post((req, res) => { // create comment
    res.status(201).send(dataService.createComment(req.body));
  });

commentRouter.route('/:commentId')
  .delete((req, res) => { // delete comment
    commentAction(req, res, (response, comment) => {
      response.status(200).send(dataService.removeComment(comment));
    });
  })
  .get((req, res) => { // find comment
    commentAction(req, res, (response, comment) => {
      response.status(200).send(comment);
    });
  })
  .put((req, res) => { // update comment
    commentAction(req, res, (response, comment) => {
      response.status(200).send(dataService.saveComment(Object.assign(comment, req.body)));
    });
  });

module.exports = commentRouter;
