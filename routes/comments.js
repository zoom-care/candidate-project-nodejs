const router = require('express').Router()
const db = require('../config/loki').getDatabase()
module.exports = router

const comments = db.getCollection('comments')

//DELETE comment by id
router.delete('/:commentId', (req, res, next) => {
  // check authorization
  if (!req.headers.authorization) {
    res.status(403).json({ error: 'Not authorized!' })
  }

  const commentId = Number(req.params.commentId)
  if (!commentId) {
    res.status(400).send('Invalid comment ID')
  }
  const comment = comments.find({ id: commentId })
  comments.remove(comment)
  if (comment) {
    res.send('Comment deleted')
  } else {
    res.status(500).send('An error occurred while deleting comment')
  }
})
