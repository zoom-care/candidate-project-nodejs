var createError = require('http-errors');
var express = require('express');
var dataService = require('./dataService');
var helpers = require('./helper');

var userRouter = express.Router();
var postRouter = require('./postRouter');
// you can nest routers by attaching them as middleware:
userRouter.use('/:userId/post', postRouter);

userRouter.route('/')
  .get((_req, res) => res.status(200).send(dataService.getAllUsers()))
  .post((req, res) => { // create user
    if (helpers.missingAuthHeader(req)) {
      res.status(401).json(createError(401, 'Not Authorized'));
    } else res.status(201).send(dataService.createUser(req.body));
  });

userRouter.route('/:userId')
  .delete((req, res) => { // delete user
    if (helpers.missingAuthHeader(req)) {
      res.status(401).json(createError(401, 'Not Authorized'));
    } else {
      helpers.userAction(req, res, (response, user) => {
        response.status(200).send(dataService.removeUser(user));
      });
    }
  })
  .get((req, res) => { // find user
    helpers.userAction(req, res, (response, user) => {
      response.status(200).send(user);
    });
  })
  .put((req, res) => { // update user
    if (helpers.missingAuthHeader(req)) {
      res.status(401).json(createError(401, 'Not Authorized'));
    } else {
      helpers.userAction(req, res, (response, user) => {
        response.status(200).send(dataService.saveUser(Object.assign(user, req.body)));
      });
    }
  });

module.exports = userRouter;
