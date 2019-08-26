var express = require("express");
var router = express.Router();

let authorization = (req, res, next) => {
  let auth = req.header('Authorization');

  if(!auth || auth.length == 0) {
    res.status(401);
    res.send("Unauthorized");
    return;
  }

  next();
}

module.exports = authorization;