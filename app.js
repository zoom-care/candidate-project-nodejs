var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();

var app = express();

const { HTTP_UNAUTHORIZED } = require('./util/constants');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(pathToSwaggerUi));
app.use(cors());

app.use(function(req, res, next) {
  // if (!req.headers.authorization) {
  //   res.status(HTTP_UNAUTHORIZED).send("Unauthorized");
  // }
  res.setHeader('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  res.render('index', {
    title: 'ZOOM+Care Candidate Code Challenge - NodeJS API'
  });
});

app.use('/v1/users', require('./routes/users'));
app.use('/v1/posts', require('./routes/posts'));
app.use('/v1/comments', require('./routes/comments'));

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
