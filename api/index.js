var express = require("express");
var router = express.Router();
var users = require("./users");

router.use('/users', users);
// router.use('posts', posts);
// router.use('comments', comments);

module.exports = router;