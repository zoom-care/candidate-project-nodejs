const express = require('express');
const users = require('../controllers/userController')
const posts = require('../controllers/postController')
const comments = require('../controllers/commentController')
const _ = require("lodash")

const router = express.Router()
const userRoutes = require("./userRoutes")

const mutatorMethods = ["PUT", "DELETE", "POST"]

// for mutating methods, check for non empty authorization header
router.use((req, res, next) => {
  if (mutatorMethods.includes(req.method) && _.isEmpty(req.header("authorization"))) {
    res.sendStatus(401) && next() // want this to skip the routes
  } else {
    next()
  }
})

// user route is split into it's own router to demonstrate
// validation middleware.  Comments and posts could be handled the same way
router.use("/users",userRoutes)


router.get('/comments/:commentid', comments.getComment)
router.delete('/comments/:commentid', comments.deleteComment)
router.post('/comments', comments.postComment)

router.get('/posts/:postid/comments', comments.getCommentsForPost)
router.get('/posts/:postid', posts.getPost)
router.post('/posts', posts.postPost)
router.put('/posts', posts.putPost)

module.exports = router