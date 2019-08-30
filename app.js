var createError = require("http-errors");
var express = require("express");
const { check, validationResult } = require("express-validator");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const auth = require("./auth");

var app = express();
var cors = require("cors");
var loki = require("./config/loki");

/*
 * Initialize database
 */
loki.init();
var db = loki.getDatabase();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Allow Cross-Origin Resource Sharing (CORS) from any domain
// verified and tested the response headers contained: Access-Control-Allow-Origin: *
app.use(cors());

app.get("/", (req, res) => {
  res.render("index", {
    title: "ZOOM+Care Candidate Code Challenge - NodeJS API"
  });
});

// ROUTES FOR OUR API
// create our router
var router = express.Router();

router
  .route("/comments/post/:postId")

  // Retrieve all comments associated with a user's post
  // example: curl -H "authorization: 123" http://localhost:3001/api/comments/post/3
  .get(auth, (req, res) => {
    var coll = db.getCollection("comments");
    var results = coll.find({ postId: parseInt(req.params.postId) });
    res.send(results);
  });

router
  .route("/comments/:id")

  // get the comment with this id
  .get(auth, (req, res) => {
    var coll = db.getCollection("comments");
    var result = coll.findObject({ id: parseInt(req.params.id) });
    res.send(result);
  })

  // Delete a comment
  // example...
  // verify it exists: curl -H "authorization: 123" http://localhost:3001/api/comments/11
  // delete it: curl -H "authorization: 123" -X DELETE http://localhost:3001/api/comments/11
  // verify it was deleted: curl -H "authorization: 123" http://localhost:3001/api/comments/11
  .delete(auth, (req, res) => {
    var coll = db.getCollection("comments");
    coll.findAndRemove({ id: parseInt(req.params.id) });
    res.send("SUCCESS");
  });

router
  .route("/posts/:id")

  // get the post with this id
  .get(auth, (req, res) => {
    var coll = db.getCollection("posts");
    var result = coll.findObject({ id: parseInt(req.params.id) });
    res.send(result);
  })

  // Update a post
  // example...
  // before: curl -H "authorization: 123" http://localhost:3001/api/posts/7
  // update it: curl -H "authorization: 123" -X PUT -d 'title=New title&body=New body' http://localhost:3001/api/posts/7
  // after: curl -H "authorization: 123" http://localhost:3001/api/posts/7
  .put(
    auth,
    [
      // Provide simple validation and appropriate HTTP statuses in the response
      // this is just a limited example that shows that I know how to do validation
      check("title").isLength({ min: 1 }),
      check("body").isLength({ min: 1 })
    ],
    (req, res) => {
      var coll = db.getCollection("posts");
      var post = coll.findObject({ id: parseInt(req.params.id) });
      post.title = req.body.title;
      post.body = req.body.body;
      coll.update(post);
      res.send("SUCCESS");
    }
  );

router
  .route("/users")

  // show all the users
  .get(auth, (req, res) => {
    var coll = db.getCollection("users");
    var result = coll.find();
    res.send(result);
  })

  // Create a user
  // example...
  // insert it: curl -H "authorization: 123" -X POST -d 'name=Jim Smith&username=jims&email=jim@mkzbooks.com' http://localhost:3001/api/users
  // after... the new user has been added: curl -H "authorization: 123" http://localhost:3001/api/users
  .post(
    auth,
    [
      // Provide simple validation and appropriate HTTP statuses in the response
      // this is just a limited example that shows that I know how to do validation
      check("email").isEmail(),
      check("name").isLength({ min: 2 }),
      check("username").isLength({ min: 2 })
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      var coll = db.getCollection("users");

      // not sure about the ID here... it is something I looked at and I can see "$loki":11 after the
      // insert is called, however I also saw it was missing "id:"... I'm sure there is a way to do
      // this--I would just need to research it a bit more.  Also, I assumed the test was only about
      // updating and inserting in memory and not persisting to the actual file system... the instructions didn't say
      var user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        address: {
          street: "123 Main St.", // <----- hard coding the rest of this for the sake of time... you get the point
          city: "Hillsboro",
          zipcode: "97124",
          geo: {
            lat: "-37.3159",
            lng: "81.1496"
          }
        },
        phoneNumbers: ["503-459-2968", "503-718-3205"],
        website: "linkedin.com/in/cash4books"
      };

      coll.insertOne(user);
      res.send("SUCCESS");
    }
  );

// REGISTER OUR ROUTES
app.use("/api", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
