var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dataLayer = require('./dataLayer/dataLayer');
const cors = require('cors'); 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cors
const corsOptions = {
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
}
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  if(req.method !== 'GET' && req.method !== 'OPTIONS') {
    if(!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent.'});
    }
    if (req.headers.authorization) {
      if(req.headers.authorization.valueOf() == '') {
        return res.status(401).json({ error: 'Invalid token.' });
      }
    }
  }
  next();
});

function handleOutput(res, data, err) {
  if (err) {
    if(err.httpStatusCode > 0) {  
      res.status(err.httpStatusCode).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
  res.status(200).json(data);
}

app.get('/', (req, res) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
});

app.get('/posts/:id/comments', (req, res) => dataLayer.commentsGetByPost(req, res, (res, data, err) => handleOutput(res, data, err)));

app.post('/users', (req, res) => dataLayer.usersInsert(req, res, (res, data, err) => handleOutput(res, data, err)));

app.put('/posts/:id', (req, res) => dataLayer.postPatch(req, res, (res, data, err) => handleOutput(res, data, err)));

app.patch('/posts/:id', (req, res) => dataLayer.postPatch(req, res, (res, data, err) => handleOutput(res, data, err)));

app.delete('/comments/:id', (req, res) => dataLayer.commentsDelete(req, res, (res, data, err) => handleOutput(res, data, err)));

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
