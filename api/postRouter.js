var createError = require('http-errors');
var express = require('express');
var dataService = require('./dataService');
var helpers = require('./helper')

// look for user's post, hand to callback or return 404
const postAction = (req, res, callback) => {
  const userId = Number(req.params.userId);
  const postId = Number(req.params.postId);
  const post = dataService.getPost(userId, postId);
  if (post) return callback(res, post);
  else res.status(404).json(createError(404, `Post ${postId} by ${userId} does not exist!`));
};

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var postRouter = express.Router({mergeParams: true});
var commentRouter = require('./commentRouter');
// you can nest routers by attaching them as middleware:
postRouter.use('/:postId/comment', commentRouter);


postRouter.all('*', (req, res, next) => {
  helpers.checkAuthHeader(req, res, next);
});

postRouter.route('/')
  .get((req, res) => {
    res.status(200).send(dataService.getAllPosts(req.params.userId));
  })
  .post((req, res) => { // create post
    res.status(201).send(dataService.createPost(req.body));
  });

postRouter.route('/:postId')
  .delete((req, res) => { // delete post
    postAction(req, res, (response, post) => {
      response.status(200).send(dataService.removePost(post));
    });
  })
  .get((req, res) => { // find post
    postAction(req, res, (response, post) => {
      response.status(200).send(post);
    });
  })
  .put((req, res) => { // update post
    postAction(req, res, (response, post) => {
      response.status(200).send(dataService.savePost(Object.assign(post, req.body)));
    });
  });

module.exports = postRouter;
