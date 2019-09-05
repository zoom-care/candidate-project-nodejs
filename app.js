var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const {validationResult, check} = require('express-validator');
var authorizer = require('./authorizer');

var cors = require('cors');


var loki = require('./config/loki');
loki.init();
var db = loki.getDatabase();

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var protected   = [authorizer];
var unprotected = [];

app.get('/', (req, res) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
});

// to test basic authorization function
// 
app.get("/hello", protected, function(req, res) {
  res.send("Hello");
});

// Get all users
app.get("/users", function (req, res) {

    var collection = db.getCollection("users");
    var result = collection.find();
   // var result = coll.find();
    res.send(result);
});

// Create a new-user
// Protedted by an authorizer
app.post('/users', protected, [
  check("name").isLength({min: 2}),
  check("username").isLength({min: 2}),
  check("email").isEmail()
], function(req, res) {

    const validationErrors = validationResult(req);
    
    if(validationErrors.isEmpty() === false) {
      return res.status(400).json({ errors: validationErrors.array()});
    } else {

      var collection = db.getCollection("users");
      var newId = collection.count + 1;
      
      var user = {
        id: newId,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        address: {
          street: req.body.address, 
        }
      };

      collection.insertOne(newUser);
  }
  res.send("SUCCESS");
});



// Get all posts
// curl -X GET http://localhost:3001/posts
app.get("/posts", function (req, res) {

  var collection = db.getCollection("posts");
  var result = collection.find();
 
  res.send(result);
});

// Get all posts
// curl -X GET http://localhost:3001/posts
app.get("/posts/:postId", function (req, res) {

  var collection = db.getCollection("posts");
  var postId = parseInt(req.params.postId);
  var result = collection.find(postId);
 
  res.send(result); 


  // res.send('Got a GET request at /posts/postId')
});


/*
app.put('/posts', function (req, res) {
  res.send('Got a PUT request at /user')
});
*/


app.put('/posts/:id', protected, [
  check("title").isLength({ min: 1 }),
  check("body").isLength({ min: 1 })
], function(req, res) {

    console.log("PUT");

    var collection = db.getCollection("posts");
    var postId = parseInt(req.params.id);

    console.log("***************** Update post: " + postId);

    var thePost = collection.findObject({id: postId});

    console.log("Found post: " + JSON.stringify(thePost));

    thePost.title = req.body.title;

    thePost.body = req.body.body;
    collection.update(thePost);

    res.status(200);
    res.send("SUCCESS");
});


//  curl -X GET http://localhost:3001/comments
app.get("/comments", function (req, res) {

  var collection = db.getCollection("comments");
  var result = collection.find();
 
  res.send(result);
});

app.get("/comments/:commentId", function (req, res) {

  var collection = db.getCollection("comments");
  var id = parseInt(req.params.id);
  var result = collection.find(id);

  // console.log("Result: " + JSON.stringify(result, null));
 
  res.send(result);
});



//  curl -X GET http://localhost:3001/comments/post/#
app.get('/comments/posts/:postId', (req, res) => {

  const collection = db.getCollection('comments');
  const postId = parseInt(req.params.postId);

  console.log("Getting comments for post: " + postId);

  const results = collection.find({
      postId: postId
  });

  console.log("Found: " + results);

  res.send(results);

});

app.delete('/comments/post/:postId', protected, (req, res) => {
   var coll = db.getCollection("comments");
   coll.findAndRemove({ id: parseInt(req.params.id) });
   res.send("SUCCESS");
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
