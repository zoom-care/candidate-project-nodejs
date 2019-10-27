var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const _ = require('lodash');

const { init, getDatabase } = require('./config/loki.js');

// Init Loki
init();
let db = getDatabase();

var users = db.getCollection("users");
var posts = db.getCollection("posts");
var comments = db.getCollection("comments");


// Express

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// AUTHENTICATION
app.use(async (req) => {
  try {
      const token = req.headers.authorization;
      // const { person } = await jwt.verify(token, SECRET)      
      let tokenResult = null;

      console.log('checkAuthorization() :: token = ', token);

      // Spec: The value of this header can be any non-empty string.
      if ((typeof token !== 'string') || !(token)) {
        tokenResult = createError(401);
      }
        
      return req.next(tokenResult)
  } catch (e) {
      return req.next()
  }
})


app.get('/', (req, res) => {
  res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API' });
});

/* -------------------------------------------------------------------------- */

//  _____   _____  _______ _______         / _______  ______ _______ _______ _______ _______
// |_____] |     | |______    |           /  |       |_____/ |______ |_____|    |    |______
// |       |_____| ______|    |          /   |_____  |    \_ |______ |     |    |    |______
//                                      /                                                   

app.options('/api/create', cors());
app.post('/api/create', cors(), (req, res) => {
  console.info('POST /api/create');

  console.info('POST /api/create :: req.body = ', req.body);

  const user = {
    "id": 1,
    "name": "Jean Deaux",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phoneNumbers": ["1-770-736-8031 x56442", "1-771-736-8032"],
    "website": "hildegard.org"
  };

  // TODO: Simple validation
  // TODO: Calculate the id (unless db handles it)

  var result = users.insert(user);


  // TODO: Create via Loki

  res.json(user);
});

//  ______ _______ _______        / _______  _____  _______ _______ _______ __   _ _______ _______
// |  ____ |______    |          /  |       |     | |  |  | |  |  | |______ | \  |    |    |______
// |_____| |______    |         /   |_____  |_____| |  |  | |  |  | |______ |  \_|    |    ______|
//                             /                                                                  

app.options('/api/comments', cors());
app.get('/api/comments', cors(), (req, res) => {
  console.info('GET /api/comments');

  let postID = 5;
  let postComments = [];
  let filtered = {};

  filtered = users.find({
    "postId": 5
  });

  console.log(filtered);

  postComments = _.get(filtered, 'data', []);

  res.json(filtered);
});


//  _____   _____  _______ _______         / _     _  _____  ______  _______ _______ _______
// |_____] |     | |______    |           /  |     | |_____] |     \ |_____|    |    |______
// |       |_____| ______|    |          /   |_____| |       |_____/ |     |    |    |______
//                                      /                                                   

app.options('/api/update', cors());
app.post('/api/update', cors(), (req, res) => {
  console.info('POST /api/update');

  let post = null;
  let id = 11;

  // // Updated User
  // const user = {
  //   name: 'John Doe (update)',
  // };

  // "title": "et ea vero quia laudantium autem",

  // Find and update an existing document
  post = items.findOne({'id': id });
  tyrfing.title = 'Caveat lector!';
  // items.update(tyrfing);

  posts.update(tyrfing);

  // TODO: Implement update via Loki

  res.json(user);
});



//  _____   _____  _______ _______        / ______  _______        _______ _______ _______
// |_____] |     | |______    |          /  |     \ |______ |      |______    |    |______
// |       |_____| ______|    |         /   |_____/ |______ |_____ |______    |    |______
//                                     /                                                  

app.options('/api/delete', cors());
app.post('/api/delete', cors(), (req, res) => {
  console.info('POST /api/delete');

  // Updated User
  const user = {
    name: 'John Doe (delete)',
  };

  // TODO: Implement update via Loki

  res.json(user);
});


// * Create a user.
// * Retrieve all comments associated with a user's post.
// * Update a post.
// * Delete a comment.
// * Allow Cross-Origin Resource Sharing (CORS) from any domain.
// * Provide simple validation and appropriate HTTP statuses in the response.
// * When performing a mutation, ensure that all incoming requests for those 
//   routes contain an authorization header. The value of this header can be 
//   any non-empty string. If the request does not contain a header of authorization, 
//   respond with the appropriate HTTP status code.


// _______  ______  ______  _____   ______      _     _ _______ __   _ ______         _____ __   _  ______
// |______ |_____/ |_____/ |     | |_____/      |_____| |_____| | \  | |     \ |        |   | \  | |  ____
// |______ |    \_ |    \_ |_____| |    \_      |     | |     | |  \_| |_____/ |_____ __|__ |  \_| |_____|

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
