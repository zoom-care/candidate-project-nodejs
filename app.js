var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const {validationResult, check} = require('express-validator');
var authorizer = require('./authorizer');

var cors = require('cors');
var loki = require('./config/loki');


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

const protected   = [authorizer];
const unprotected = [];

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

    let collection = db.getCollection("users");

    const result = collection.find();
   
    res.send(result);
});

// Get all user by id
app.get("/users/:id", function (req, res) {

  let collection = db.getCollection("users");
  const userId = parseInt(req.params.id);

  const result = collection.find({id: userId});
 
  res.send(result);
});

// Create a new-user
// Protedted by an authorizer
app.post('/users', protected, [
//  check("name").isLength({min: 2}),
//  check("username").isLength({min: 2}),
//  check("email").isEmail()
], function(req, res) {

    // const validationErrors = validationResult(req);
    
    // if(validationErrors.isEmpty() === false) {
    //   return res.status(400).json({ errors: validationErrors.array()});
    // } else {

    let collection = db.getCollection("users");
    const newId = collection.count() + 1;
    console.log("Using index: " + newId);

    // parse data
    const newUser = {
        "id": newId,
        "name": req.body.name,
        "username": req.body.username,
        "email": req.body.email,
        "address": {
          "street": req.body.address.street, 
          "city": req.body.address.city,
          "zipcode": req.body.address.zipcode,
          "geo": {
            "lat": req.body.address.geo.lat,
            "lng": req.body.address.geo.lng
          }
        },
        "phoneNumbers": req.body.phoneNumbers,
        "website": req.body.website
      }; 
      
      console.log("Adding: " + JSON.stringify(newUser));

      collection.insertOne(newUser);

      res.send("SUCCESS");
});



// Get all posts
// curl -X GET http://localhost:3001/posts
app.get("/posts", function (req, res) {

  let collection = db.getCollection("posts");
  console.log("Found " + collection.count() + " posts");

  const result = collection.find();
 
  res.send(result);
});

// Get post by id
// curl -X GET http://localhost:3001/posts
app.get("/posts/:postId", function (req, res) {

  let collection = db.getCollection("posts");

  console.log("Found " + collection.count() + " posts");

  const postId = parseInt(req.params.postId);
  const result = collection.find({id: postId});
 
  res.send(result); 
 
});


// update a post
app.put('/posts/:id', protected, [
//  check("title").isLength({ min: 1 }),
 // check("body").isLength({ min: 1 })
], function(req, res) {

    let collection = db.getCollection("posts");
    const postId = parseInt(req.params.id);
    console.log("PUT postId: " + postId);

    let thePost = collection.findObject({id: postId});

    thePost.title = req.body.title;
    thePost.body = req.body.body;

    collection.update(thePost);

    // res.status(200);
    res.send("SUCCESS");
});


//  curl -X GET http://localhost:3001/comments
app.get("/comments", function (req, res) {

  let collection = db.getCollection("comments");
  const result = collection.find();
  console.log("Found " + collection.count() + " comments");
 
  res.send(result);
});

app.get("/comments/:commentId", function (req, res) {

  var collection = db.getCollection("comments");
  const id = parseInt(req.params.commentId);
  const result = collection.find({postId: id});

  console.log("Found " + result.length + " comments for post: " + id);
 
  //console.log("Result: " + JSON.stringify(result, null));
 
  res.send(result);
});


app.delete('/comments/:id', protected, (req, res) => {
  let collection = db.getCollection("comments");
  collection.findAndRemove({ id: parseInt(req.params.id) });

  res.send("SUCCESS");
});



//  curl -X GET http://localhost:3001/comments/post/#
// GET comments for post 
app.get('/comments/posts/:postId', (req, res) => {

  const collection = db.getCollection('comments');
  const postId = parseInt(req.params.postId);

  const results = collection.find({
      postId: postId
  });

  res.send(results);

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
