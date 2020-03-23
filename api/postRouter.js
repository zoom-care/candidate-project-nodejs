var createError = require('http-errors');
var express = require('express');
var dataService = require('./dataService');
var helpers = require('./helper')

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var postRouter = express.Router({mergeParams: true});

postRouter.route('/')
  .get((req, res) => {
    console.log(`FOO => ${req.params.userId}`);
    res.status(200).send(dataService.getAllPosts(req.params.userId));
  })
  .post((req, res) => { // create post
    if (helpers.missingAuthHeader(req)) {
      res.status(401).json(createError(401, 'Not Authorized'));
    } else res.status(201).send(dataService.createPost(req.body));
  });

postRouter.route('/:postId')
  .delete((req, res) => { // delete post
    if (helpers.missingAuthHeader(req)) {
      res.status(401).json(createError(401, 'Not Authorized'));
    } else {
      helpers.postAction(req, res, (response, post) => {
        response.status(200).send(dataService.removePost(post));
      });
    }
  })
  .get((req, res) => { // find post
    helpers.postAction(req, res, (response, post) => {
      response.status(200).send(post);
    });
  })
  .put((req, res) => { // update post
    if (helpers.missingAuthHeader(req)) {
      res.status(401).json(createError(401, 'Not Authorized'));
    } else {
      helpers.postAction(req, res, (response, post) => {
        response.status(200).send(dataService.savePost(Object.assign(post, req.body)));
      });
    }
  });

module.exports = postRouter;
