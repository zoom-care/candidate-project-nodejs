var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var loki = require('../candidate-project-nodejs/config/loki');

var db = loki.getDatabase();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
});

app.get('/user', (req, res, next) => {

  if (req.headers['authorization'] === undefined || req.headers["authorization"] === '') {
    res.sendStatus(401);
  }

  res.send({status:200, data:db.getCollection('users').data})
});

app.post('/user', (req, res, next) => {

  if (req.headers['authorization'] === undefined || req.headers["authorization"] === '') {
    res.sendStatus(401);
  }

  var users = db.getCollection('users');

  var newUser = {
      "name": req.body.name,
      "username": req.body.username,
      "email": req.body.email,
      "address": {
        "street": req.body.address_street,
        "city": req.body.address_city,
        "zipcode": req.body.address_zipcode,
        "geo": {
          "lat": req.body.address_lat,
          "lng": req.body.address_lng
        }
      },
      "phoneNumbers": req.body.phoneNumbers.split(","),
      "website": req.body.website
  };

  users.insert(newUser)

  db.saveDatabase();
  res.send({status:200, data:{newUser}});
});

app.get('/comments', (req, res, next) => {

  if (req.headers['authorization'] === undefined || req.headers["authorization"] === '') {
    res.sendStatus(401);
  }

  var comments = db.getCollection('comments').data;
  var commentsOnPost = [];

  var postId = req.body.postId;
 
  // Should do this using built in loki functionality 
  for (var comment in comments) {
    if (parseInt(comments[comment].postId) === parseInt(postId)) {
      commentsOnPost.push(comments[comment])
    }
  }

  res.send({status:200, data:commentsOnPost});
});

app.delete('/comments', (req, res, next) => {

  if (req.headers['authorization'] === undefined || req.headers["authorization"] === '') {
    res.sendStatus(401);
  }

  var comments = db.getCollection('comments');
  var commentId  = req.body.commentId;

  var result = comments.findOne({id: parseInt(commentId) });

  console.log(result)
  comments.remove(result.$loki);

  res.send({status:200, data:result});
});

app.patch('/posts', (req, res, next) => {
  if (req.headers['authorization'] === undefined || req.headers["authorization"] === '') {
    res.sendStatus(401);
  }

  var postId = req.body.postId;
  var newTitle = req.body.newTitle;
  var newBody = req.body.newBody;

  var posts = db.getCollection('posts');

  var result = posts.findOne({id: parseInt(postId)})
  result.title = newTitle;
  result.body = newBody;

  posts.update(result);

  res.send({status:200, data:result});

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
