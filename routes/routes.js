const express = require('express');
const users = require('../controllers/userController')
const posts = require('../controllers/postController')
const router = express.Router()

router.get('/users/:userid', users.getUser)
router.post('/users', users.postUser)

router.get('/posts/:postid', posts.getPost)
router.post('/posts', posts.postPost)
router.put('/posts', posts.putPost)

module.exports = router