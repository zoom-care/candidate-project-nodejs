const commentService = require('../services/commentService')
const _ = require("lodash")

const postComment =  (req, res, next) => {
  try {
    const comment = req.body
    // TODO: validate
    commentService.insertComment(comment)
    res.send(comment)
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const getComment =  (req, res, next) => {
  try {
    let comment = commentService.getCommentById(req.params.commentid)
    if (_.isEmpty(comment)) {
      res.sendStatus(404)
    } else {
      res.send(comment)
    }
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const deleteComment =  (req, res, next) => {
  try {
    let comment = commentService.getCommentById(req.params.commentid)
    if (_.isEmpty(comment)) {
      res.sendStatus(404)
    } else {
      commentService.deleteComment(comment)
      res.send(comment)
    }
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const getCommentsForPost =  (req, res, next) => {
  let postid = req.params.postid
  try {
    if (_.isEmpty(postid)) {
      res.sendStatus(400) 
    }
    let comments = commentService.getCommentsByPostId(postid)
    res.send(comments)
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
  postComment, getComment, getCommentsForPost, deleteComment
}