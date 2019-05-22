/*
   Notes:
   - I wasn't sure if you wanted the db changes to be permanent, hence I left as-is thus they won't persist across app restarts
   - I altered the db fields in the data/ json files to indicate primary/foreign keys for clarity
   - Since the focus is on client/server, the "site" is not reponsive/nice looking by modern standards
   - Input validation is just testing for at least one non-whitespace character
   - Apologies if the DELETE/PUT authorization header gets that song stuck in your head
   - Thanks! - Craig   

*/

// Packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressApp = express();

// Setup database
var dbh = require('./config/loki');
dbh.init();
var dbObj = dbh.getDatabase();


// ExpressJS View engine setup
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'pug');
expressApp.use(logger('dev'));
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(cookieParser());
expressApp.use(express.static(path.join(__dirname, 'public')));

// Allow origin request from anywhere
expressApp.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Route: GET /  (default)
expressApp.get('/', (req, res) => {
    res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API'});
});


// Route: GET /users
//   get a list of users
expressApp.get('/users', (req, res) => {

    // Grab the user list
    let userList = dbObj.getCollection('users').data;
    let tmp = [];
    userList.forEach(function(e) {
	tmp.push({
	    userID: e.id_pk,
	    name: e.name
	    });
    })
    res.end(JSON.stringify({ userList: tmp }));
});
    

// Route: GET /users/(userID)
//  Get user information and post history for a given user
expressApp.get('/users/:userID', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let userID = parseInt(req.params.userID);
    if (isNaN(userID) || userID <= 0) {
	res.end(JSON.stringify({ rc: 0 }));
	return;
    }
    
    // Get the user info and set the return fileds
    let userList = dbObj.getCollection('users');
    let tmp = userList.find({id_pk: userID})[0];

    let userInfo = {
	name: tmp.name,
	username: tmp.username,
	email: tmp.email,
	website: tmp.website,
	phoneNumbers: tmp.phoneNumbers,
	address: tmp.address,
	geo: tmp.geo
    };
    
    
    // Get the posts for this user and set the return fields
    let postList = dbObj.getCollection('posts');
    tmp = postList.find({userID_fk: userID});
    let postInfo = [];
    tmp.forEach(function(e) {
	postInfo.push({
	    postID: e.id_pk,
	    title: e.title,
	    summary: e.body.substr(0,50),
	    });
    });
    
    res.end(JSON.stringify({ userInfo: userInfo, postInfo: postInfo }));    
});


// Route: GET /post/(postID)
//  Get information about a post and avaialble comments
expressApp.get('/post/:postID', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let postID = parseInt(req.params.postID);
    if (isNaN(postID) || postID <= 0) {
	res.end(JSON.stringify({ rc: 0 }));
	return;
    }

    // Get the post and set the return fields
    let postList = dbObj.getCollection('posts');
    tmp = postList.find({id_pk: postID});
    let postInfo = {};
    if (tmp.length > 0) {
	tmp = tmp[0];
	postInfo = {
	    postID: tmp.id_pk,
	    title: tmp.title,
	    body: tmp.body
	};
    }

    // Get the comments for this post and set the return fields
    let commentList = dbObj.getCollection('comments');
    tmp = commentList.find({postID_fk: postID});
    let comments = [];
    tmp.forEach(function(e) {
	comments.push({
	    commentID: e.id_pk,
	    name: e.name,
	    email: e.email,
	    body: e.body,
	});
    });
    
    res.end(JSON.stringify({ postInfo: postInfo, comments: comments }));        

});


// Route: POST /user
//  create a user
expressApp.post('/user', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Check for empty fields
    let saveData = {};
    let fields = ['name','username','email','website','phone','street','city','zipcode','latitude','longitude'];
    fields.forEach(function(e) {
	if (typeof req.body[e] == 'undefined'
	    || req.body[e].replace(/\s/g, '').length == 0) {
	    res.end(JSON.stringify({ rc: -1}));
	    return;
	}
    });

    
    // Save the data
    phoneNumbers = req.body.phone.split(',');
    let userList = dbObj.getCollection('users');
    let myUser = userList.insert(
	{
	    name: req.body.name,
	    username: req.body.username,
	    email: req.body.email,
	    website: req.body.website,
	    phoneNumbers: phoneNumbers,
	    address: {
		street: req.body.street,
		city: req.body.city,
		zipcode: req.body.zipcode,
		geo: {
		    lat: req.body.latitude,
		    lng: req.body.longitude,
		}
	    }
	}
    );

    // Set the primary key for the newly inserted row
    // (cg note: this does not seem correct but I couldn't find any way of doing this in the db in a cleaner/proper fashion)
    myUser.id_pk = myUser.$loki;
    let rc = userList.update(myUser);

    if (rc) {
	res.end(JSON.stringify({ rc: 1 }));
    } else {

	// Error
	res.end(JSON.stringify({ rc: 0}));
    }
});


// Route: PUT /post/(postID)
//  Update a post
expressApp.put('/post/:postID', (req, res) => {

    // Check "authorization"
    if (!checkAuthorization(req.headers)) {
	res.status(403).json({ error: 'Invalid authorization' });
	res.end();
    }

    res.setHeader('Content-Type', 'application/json');

    let postID = parseInt(req.params.postID);
    if (isNaN(postID) || postID <= 0) {
	res.end(JSON.stringify({ rc: 0 }));
	return;
    }

    // Check for empty fields
    if (req.body.title.replace(/\s/g, '').length == 0
	|| req.body.body.replace(/\s/g, '').length == 0) {
	res.end(JSON.stringify({ rc: -1}));
	return;
    }

    // Save the data
    let postList = dbObj.getCollection('posts');
    let stat = postList.findObject({id_pk: postID});
    if (stat) {
	stat.title = req.body.title;
	stat.body = req.body.body;
	postList.update(stat);
	res.end(JSON.stringify({ rc: 1 , title: stat.title, body: stat.body }));
	
    } else {

	// Error
	res.end(JSON.stringify({ rc: 0}));
    }
});




// Route: DELETE /comment/(commentID)
//  Delete a comment by id
expressApp.delete('/comment/:commentID', (req, res) => {

    // Check "authorization"
    if (!checkAuthorization(req.headers)) {
	res.status(403).json({ error: 'Invalid authorization' });
	res.end();
    }
    
    res.setHeader('Content-Type', 'application/json');

    let commentID = parseInt(req.params.commentID);
    if (isNaN(commentID) || commentID <= 0) {
	res.end(JSON.stringify({ rc: 0 }));
	return;
    }

    let rc = 0;

    let commentList = dbObj.getCollection('comments');
    let stat = commentList.findObject({id_pk: commentID});
    if (stat) {
	commentList.remove(stat);
	rc = 1;
    }
    
    // Return success/fail
    res.end(JSON.stringify({ rc: rc}));
});



// Route: (not found/404)
expressApp.use(function(req, res, next) {
  next(createError(404));
});


// error handler
expressApp.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = expressApp;


// "authorization module"
function checkAuthorization (headers) {
    if (headers.authorization != '8675309') {
	return false;
    }
    return true;
}
