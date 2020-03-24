var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('./logger'); // application logger
var morgan = require('morgan'); // http request logger middleware

logger.info('Initializing application');
var userRouter = require('./api/userRouter')
var app = express();

// https://expressjs.com/en/resources/middleware/cors.html
// Simple Usage (Enable All CORS Requests)
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

logger.debug('Installing default view');
app.get('/', (_req, res) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
});

// user API
app.use('/user', userRouter);
logger.debug('API routes installed for users/posts/comments');

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

logger.info('Application started!');
module.exports = app;
