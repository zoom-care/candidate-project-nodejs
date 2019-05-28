const router = require('express').Router()
const db = require('../config/loki').getDatabase()
module.exports = router

const posts = db.getCollection('posts')
const comments = db.getCollection('comments')
const users = db.getCollection('users')

//GET post and associated comments
router.get('/:postId', (req, res, next) => {
  const postId = Number(req.params.postId)
  const post = posts.findOne({ id: postId })
  if (!post) {
    res.status(400).send('Invalid post ID')
  }
  const postComments = comments.find({ postId: postId })
  const author = users.findOne({ id: post.userId })
  // res.json({ post, postComments })
  res.render('post', { post, postComments, author })
})

//PUT update post
router.put('/:postId', (req, res, next) => {
  //check authorization
  if (!req.headers.authorization) {
    res.status(403).json({ error: 'Not authorized!' })
  }

  const postId = Number(req.params.postId)
  const post = posts.findOne({ id: postId })

  if (!post) {
    res.status(400).send('Invalid post ID')
  }

  const { title, body } = req.body
  // only update fields that have changed
  if (title) {
    post.title = title
  }
  if (body) {
    post.body = body
  }
  const result = posts.update(post)
  if (result) {
    res.json(post)
  } else {
    res.status(500).send('An error occurred while updating post')
  }
})
