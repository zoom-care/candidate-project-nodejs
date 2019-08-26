var express = require("express");
var router = express.Router();
var users = require("./users");
var posts = require("./posts");
var comments = require("./comments");


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);

module.exports = router;