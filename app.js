const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');  

// Routes
const rteUser = require('./routes/user.router.js');
const rteComment = require('./routes/comment.router.js');
const rtePost = require('./routes/post.router.js');

// CORS
const cors = require('./middleware/cors.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Global CORS as middleware
app.use(cors); 

// Server app on index
app.get('/', (req, res) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
});

// Set app to use our routes
app.use('/users', rteUser);
app.use('/comments', rteComment);
app.use('/posts', rtePost);

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
  res.render('error', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
});

module.exports = app;
