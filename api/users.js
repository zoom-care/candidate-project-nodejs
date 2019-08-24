var express = require('express');
var router = express.Router();

var db = require('../config/loki').getDatabase();

//This is not strictly required for the challenge, but is a good starting point.
//return all users
router.get('/', (req,res,next) => {
  var users = db.getCollection('users');
  res.json(users.data);
})

module.exports = router;