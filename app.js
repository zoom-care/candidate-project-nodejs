var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const datasource = require('./config/loki');
datasource.init();

var app = express();

// Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Filters
const AuthorizationFilter = require('./filters/AuthorizationFilter');
app.use(AuthorizationFilter);

const CorsFilter = require('./filters/CorsFilter');
app.use(CorsFilter);

// Controllers
const UsersController = require('./controllers/UsersController');
app.use('/users', UsersController);

const PostsController = require('./controllers/PostsController');
app.use('/users/:userId/posts', PostsController);

const CommentsController = require('./controllers/CommentsController');
app.use('/users/:userId/posts/:postId/comments', CommentsController);


app.get('/', (req, res) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
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