const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const schemas = require('./schemas');
const loki = require('./config/loki');

const db = loki.getDatabase();

const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const middleware = require('./middleware');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Primary app routes
app.get('/', homeController.index);


// TODO: nest these routes usesing express Router
// Create a user
app.post('/user', 
  (req, res, next) => middleware.validateSchema(schemas.createUser, req, res, next),
  (req, res) => userController.createUser(req, res, db)
);

// Retrieve all comments associated with a user's post.
app.get('/user/comments/:postid',
  middleware.checkAuthHeader,
  (req, res) => userController.retrievePostComments(req, res, db)
)

// Update user's post
app.patch('/user/post',
  middleware.checkAuthHeader,
  (req, res, next) => middleware.validateSchema(schemas.updatePost, req, res, next),
  (req, res) => userController.updatePost(req, res, db)
)

// Delete user's comment
app.delete('/user/comment/:commentid',
  middleware.checkAuthHeader,
  (req, res) => userController.deleteComment(req, res, db)
)

// catch 404 and forward to error handler
app.use(middleware.notFound);

// error handler
app.use(middleware.errorHandler);

module.exports = app;
