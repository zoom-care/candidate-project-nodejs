var createError = require('http-errors');
var express = require('express');
var path = require('path');
var loki = require('lokijs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var db = new loki('example.db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
   var auth = req.header('authorization');
   if(!auth){
   	res.status(401);
   	res.send('unauthorized');
   }
   res.setHeader('Content-Type', 'application/json');
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.get('/', (req, res) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
});

app.post('/users', (req, res) => {
	var usersBody = req.body;
	var users = db.addCollection('users');

	function createUser(usersBody){
		var result = users.insert(usersBody);
		db.saveDatabase();
		res.send(result);
	}

  	createUser(usersBody);
});

app.post('/posts', (req, res) => {
	var postsBody = req.body;

	var posts = db.addCollection('posts');

	function createPost(postsBody){
		var result = posts.insert(postsBody);
		db.saveDatabase();
		res.send(result);
	}

  	createPost(postsBody);
});

app.put('/posts/:id', (req, res) => {
	var postsBody = req.body;
	var postID = parseInt(req.params.id);
	postsBody.id = postID;

	var posts = db.addCollection('posts');

	function updatePost(postsBody){
		var result = posts.insert(postsBody);
		db.saveDatabase();
		res.send(result);
	}

  	updatePost(postsBody);
});

app.post('/comments', (req, res) => {
	var commentsBody = req.body;

	var comments = db.addCollection('comments');

	function createComments(commentsBody){
		var result = comments.insert(commentsBody);
		db.saveDatabase();
		res.send(result);
	}

  	createComments(commentsBody);
});

app.get('/comments/:id*?', (req, res) => {
	var commentToGet = {};
	var commentID = parseInt(req.params.id);
	if(commentID){
		commentToGet.id = commentID;
	}

	var comments = db.getCollection('comments');

	function getComments(commentToGet){
		if(commentToGet.id){
			var result = comments.find({ id: commentToGet.id});
			res.send(result);
		}else{
			res.send(comments);
		}
	}
  	getComments(commentToGet);
});

app.delete('/comments/:id', (req, res) => {
	var commentID = parseInt(req.params.id);

	var comments = db.getCollection('comments');

	function deleteComment(commentID){

		var result = comments.chain().find({'id':commentID}).remove();
		db.saveDatabase();

		res.send(result);
	}

  	deleteComment(commentID);
});

app.get('/posts/:id/comments', (req, res) => {
	var postID = parseInt(req.params.id);

	var comments = db.getCollection('comments');

	function getComments(postID){
		var result = comments.find({ postId: postID});
		res.send(result);
	}

  	getComments(postID);
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
