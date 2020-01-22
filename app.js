var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var validator = require('express-joi-validation').createValidator({});
var Joi = require('@hapi/joi');
var loki = require('lokijs');
var db = require('./db');
db.seed();

var commentValidationSchemas = require('./components/comments/commentValidationSchemas');
var commentRoutes = require('./components/comments/commentRoutes');

var postValidationSchemas = require('./components/posts/postValidationSchemas');
var postRoutes = require('./components/posts/postRoutes');

var userValidationSchemas = require('./components/users/userValidationSchemas');
var userRoutes = require('./components/users/userRoutes');

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

app.use(function(req, res, next) {
  if (req.headers.authorization !== `${process.env.NODEJS_AUTH_HEADER}` && req.method !== 'GET') {
    return res.status(403).json({});
  }
  next();
});

app.post('/api/v1/users', validator.body(userValidationSchemas.userPostSchema), userRoutes.post);
app.get('/api/v1/posts/:id/comments', validator.params(commentValidationSchemas.getCommentsForPostSchema), commentRoutes.getCommentsForPost);
app.put('/api/v1/posts/:id', validator.params(postValidationSchemas.putPostSchema), postRoutes.put);
app.delete('/api/v1/comments/:id', validator.params(commentValidationSchemas.deleteCommentSchema), commentRoutes.delete);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `${req.hostname}`); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(400).json(err);
});

module.exports = app;
