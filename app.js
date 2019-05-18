var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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
/**
 * Pull in routes
 */
 const commentsCtrl = require('./controllers/comment.controller.js');

 app.post('/comments', commentsCtrl.create);
 app.get('/comments', commentsCtrl.findAll);
 app.get('/comments/:commentId', commentsCtrl.findOne);
 app.get('/commentsByPost/:postId', commentsCtrl.findByPost);
 app.put('/comments/:commentId', commentsCtrl.update);
 app.delete('/comments/:commentId', commentsCtrl.delete);

 const postsCtrl = require('./controllers/post.controller.js');

 app.post('/posts', postsCtrl.create);
 app.get('/posts', postsCtrl.findAll);
 app.get('/posts/:postId', postsCtrl.findOne);
 app.put('/posts/:postId', postsCtrl.update);
 app.delete('/posts/:postId', postsCtrl.delete);

 const usersCtrl = require('./controllers/user.controller.js');

 app.post('/users', usersCtrl.create);
 app.get('/users', usersCtrl.findAll);
 app.get('/users/:userId', usersCtrl.findOne);
 app.put('/users/:userId', usersCtrl.update);
 app.delete('/users/:userId', usersCtrl.delete);

// require('../routes/comment.routes.js')(app);
// require('../routes/post.routes.js')(app);
// require('../routes/user.routes.js')(app);

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
