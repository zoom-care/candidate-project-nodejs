var express = require('express');
var router = express.Router();
var auth = require('./authorization');

var db = require('../config/loki').getDatabase();

let getUsers = (req, res, next) => {
  req.users = db.getCollection('users');
  next();
}

//This is not strictly required for the challenge, but is a good starting point.
//return all users
router.get('/', getUsers ,(req,res,next) => {
  res.json(req.users.data);
})

router.post('/', auth, getUsers,(req,res,next)=>{
  req.users.on('insert', input=>{ input.id = input.$loki; });

  //Some limited validation
  let requiredProps = ['name','username','email'];
  requiredProps.forEach(term=>{
    if(req.body[term] == undefined ||
       req.body[term].length == 0)  {
         res.status(400);
         res.send("One or more missing required fields.");
         return;
       }
  })

  //also, lets make sure we're not duplicating.
  let emailTest = req.users.findOne({"email":String(req.body.email)});
  let usernameTest = req.users.findOne({"email":String(req.body.username)});

  if(emailTest != null || usernameTest != null) {
    res.status(400);
    res.send("Email or Username already taken");
    return;
  }

  let newUser = req.users.insert(req.body);
  
  res.status("201");
  res.send(`/api/users/${newUser.$loki}`);
})

module.exports = router;