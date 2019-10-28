var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const _ = require('lodash');



// _     _ _______ _____        _____ _______ _____ _______ _______
// |     |    |      |   |        |      |      |   |______ |______
// |_____|    |    __|__ |_____ __|__    |    __|__ |______ ______|
//                                                                  

function statusResponse(message) {  
  return {
    'message': message
  }
}

// To be user with saveDatabase (disabled because this was restarting the server)
// Function retained for challenge transparency
// function onSave(err) {  
//   if (err) {
//     console.log("error : " + err);  
//   }  else {
//     console.log("database saved.");  
//   }
// }

function emailIsValid(email) {
  return /^[^\s@\.]+@[^\s@]+\.[^\s@]+$/.test(email)
}

class User {
  constructor(id, name, username, email) {
      // Error checking could be a lot more sophisticated, given time
      if (!(name && username && email)) {
          throw(Error('Invalid user data on creation'));
      }

      // Assuming ID is auto-incremented
      this.id = id;
      this.name = name;
      this.username = username;
      this.email = email;

      // Keeping placeholder values, for time reasons
      this.address = {
          "street": "123 Robin St.",
          "city": "Overton",
          "zipcode": "86753-0900",
          "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
          }
      };
      this.phoneNumbers = ["1-770-736-8031 x56442", "1-771-736-8032"];
      this.website = "example.org";
  }
};


//         _____  _     _ _____
// |      |     | |____/    |  
// |_____ |_____| |    \_ __|__
//                            

const { init, getDatabase } = require('./config/loki.js');

// Init Loki
init();
let db = getDatabase();

var users = db.getCollection("users");
// Handle auto increment (in principle, needs testing)
users.on('insert', function(user) { user.id = user.$loki; });

var posts = db.getCollection("posts");
var comments = db.getCollection("comments");


// _______ _     _  _____   ______ _______ _______ _______
// |______  \___/  |_____] |_____/ |______ |______ |______
// |______ _/   \_ |       |    \_ |______ ______| ______|
// 

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
  let formUserData = null;
  let newUser = null;

  try {
    console.info('POST /api/create :: req.body = ', req.body);

    formUserData = _.get(req, 'body.userData', formUserData);

    // Simple validation, better validation would check for unique username, etc.
    if (formUserData && formUserData.name && formUserData.username && emailIsValid(formUserData.email)) {
      newUser = new User( null, formUserData.name, formUserData.username, formUserData.email );

      if (newUser) {
        users.insert(newUser);
      }

      // If these are left in, which seems proper for the application, 
      // then nodemon restarts the database, which is less than ideal.
      // db.saveDatabase(onSave);

      // Development testing (intentionally included for transparency)
      let addedUser = users.find({
        username: formUserData.username
      });
      console.info('POST /api/create :: addedUser = ', addedUser);

      res.json(statusResponse('User "'+formUserData.username+'" added'));
    } else {
      res.json(statusResponse('Invalid user data'));
    }
  } catch (error) {
    console.log(error);
  }
});


//  ______ _______ _______        / _______  _____  _______ _______ _______ __   _ _______ _______
// |  ____ |______    |          /  |       |     | |  |  | |  |  | |______ | \  |    |    |______
// |_____| |______    |         /   |_____  |_____| |  |  | |  |  | |______ |  \_|    |    ______|
//                             /                                                                  

app.options('/api/comments', cors());
app.get('/api/comments', cors(), (req, res) => {
  let postID = null;
  let postComments = [];

  try {
    console.info('GET /api/comments :: req.query = ', req.query);

    // e.g. GET "/api/comments?id=7"
    postID = parseInt(_.get(req, 'query.id'));

    postComments = comments.find({
      "postId": postID
    });

    res.json(postComments);      
  } catch (error) {
    console.log(error);
  }
});


//  _____   _____  _______ _______         / _     _  _____  ______  _______ _______ _______
// |_____] |     | |______    |           /  |     | |_____] |     \ |_____|    |    |______
// |       |_____| ______|    |          /   |_____| |       |_____/ |     |    |    |______
//                                      /                                                   

// Update a post.
app.options('/api/update', cors());
app.post('/api/update', cors(), (req, res) => {
  let post = null;
  let newPost = null;

  try {
    newPost = _.get(req, 'body.post');

    console.info('POST /api/update :: newPost = ', newPost);

    if (newPost && newPost.id) {
      // Find and update an existing document
      post = posts.findOne({'id': newPost.id });

      if (post) {
        _.merge(post, newPost);

        console.info('GET /api/update :: found post = ', post);

        // TODO: Verify update via Loki 
        posts.update(post);
    
        // Dev testing (intentionally left in for transparency)
        let foundPost = posts.find({'id': newPost.id });
        console.info('POST /api/delete foundPost = ', foundPost);

        res.json(statusResponse('Post updated'));
      }
    } else {
      res.json(statusResponse('Post update failed'));
    }

  } catch (error) {
    console.log(error);
  }
});



//  _____   _____  _______ _______        / ______  _______        _______ _______ _______
// |_____] |     | |______    |          /  |     \ |______ |      |______    |    |______
// |       |_____| ______|    |         /   |_____/ |______ |_____ |______    |    |______
//                                     /                                                  

// Delete a comment.
app.options('/api/delete', cors());
app.post('/api/delete', cors(), (req, res) => {
  let commentID = null;

  try {
    commentID = _.get(req, 'body.id');

    if (commentID) {
      console.info('POST /api/delete :: commentID = ', commentID);

      comments.findAndRemove({'id': commentID});
  
      // Dev testing (intentionally left in for transparency)
      let foundComment = comments.find({'id': commentID });
      console.info('POST /api/delete foundComment = ', foundComment);
  
      res.json(statusResponse('Comment deleted'));  
    } else {
      res.json(statusResponse('Comment deletion failed'));  
    }

  } catch (error) {
    console.log(error);
  }
});


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
