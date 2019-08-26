var express = require('express');
var router = express.Router();
var auth = require('./authorization');

var db = require('../config/loki').getDatabase();

//This is not strictly required for the challenge, but is a good starting point.
//return all users
router.get('/', (req,res,next) => {
  var users = db.getCollection('users');
  res.json(users.data);
})

router.post('/', auth ,(req,res,next)=>{
  var users = db.getCollection('users');
  users.on('insert', input=>{ input.id = input.$loki; });
  let newUser = users.insert(req.body);
  

  res.status("201");
  res.send(`/api/users/${newUser.$loki}`);
})

module.exports = router;