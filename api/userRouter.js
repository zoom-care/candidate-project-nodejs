var createError = require('http-errors');
var express = require('express');
var dataService = require('./dataService');
var helpers = require('./helper');

// look for user, hand to callback or return 404
const userAction = (req, res, callback) => {
  const userId = Number(req.params.userId);
  const user = dataService.getUser(userId);
  if (user) return callback(res, user);
  else res.status(404).json(createError(404, `User ${userId} does not exist!`));
};

var userRouter = express.Router();
var postRouter = require('./postRouter');
// you can nest routers by attaching them as middleware:
userRouter.use('/:userId/post', postRouter);

userRouter.all('*', (req, res, next) => {
  helpers.checkAuthHeader(req, res, next);
});

userRouter.route('/')
  .get((_req, res) => res.status(200).send(dataService.getAllUsers()))
  .post((req, res) => { // create user
    res.status(201).send(dataService.createUser(req.body));
  });

userRouter.route('/:userId')
  .delete((req, res) => { // delete user
    userAction(req, res, (response, user) => {
      response.status(200).send(dataService.removeUser(user));
    });
  })
  .get((req, res) => { // find user
    userAction(req, res, (response, user) => {
      response.status(200).send(user);
    });
  })
  .put((req, res) => { // update user
    userAction(req, res, (response, user) => {
      response.status(200).send(dataService.saveUser(Object.assign(user, req.body)));
    });
  });

module.exports = userRouter;
