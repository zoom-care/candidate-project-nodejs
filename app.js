var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const { check, validationResult } = require("express-validator");
const { init, getDatabase } = require("./config/loki.js");
const containsAuthorization = require("./containsAuthorizationMiddleware");

// Initialize Loki
init();
const db = getDatabase();
const users = db.getCollection("users");
const comments = db.getCollection("comments");
const posts = db.getCollection("posts");

const app = express();

/**
 * Will enable CORS for all origins
 */
app.use(cors());
/**
 * Enable pre-flight across-the-board, for "complex"
 * CORS request that uses an HTTP verb other than
 * GET/HEAD/POST (such as our DELETE route)
 */
app.options("*", cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "ZOOM+Care Candidate Code Challenge - NodeJS API"
  });
});

app.post(
  "/api/create",
  [
    check("name").exists(),
    check("username").exists(),
    check("email").isEmail(),
    check("website").optional(),
    check("address.street").exists(),
    check("address.city").exists(),
    check("address.zipcode").exists(),
    check("address.geo.lat").exists(),
    check("address.geo.lng").exists(),
    check("phoneNumbers")
      .optional()
      .exists(),
    check("website").exists()
  ],
  containsAuthorization,
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newUserId = users.data.length + 1;
    let newUser = req.body;
    newUser.id = newUserId;
    users.insert(newUser);

    res.send("POST created new user! " + JSON.stringify(newUser));
  }
);

app.get("/api/comments/:postId", function(req, res, next) {
  const results = comments.where(
    comment => comment.postId === parseInt(req.params.postId)
  );
  res.json({ comments: results });
});

app.put(
  "/api/update/:postId",
  [
    check("title")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("body")
      .not()
      .isEmpty()
      .trim()
      .escape()
  ],
  containsAuthorization,
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let postToUpdate = posts.findOne({ id: parseInt(req.params.postId) });
    postToUpdate.title = req.body.title;
    postToUpdate.body = req.body.body;

    posts.update(postToUpdate);

    res.json({ updatedPost: postToUpdate });
  }
);

app.delete("/api/delete/:commentId", containsAuthorization, function(
  req,
  res,
  next
) {
  const commentToDelete = comments.findOne({
    id: parseInt(req.params.commentId)
  });
  commentToDelete
    ? comments.remove(commentToDelete)
    : res.send("Got a DELETE request - but record does not exist!");

  res.send(
    "Got a DELETE request - deleted: " + JSON.stringify(commentToDelete)
  );
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
