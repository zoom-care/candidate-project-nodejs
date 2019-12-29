const postService = require('../services/postService')
const _ = require("lodash")

const postPost =  (req, res, next) => {
  try {
    const post = req.body
    // TODO: validate
    postService.insertPost(post)
    res.send(post)
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500)
  }
}

const putPost =  (req, res, next) => {
  try {
    const post = req.body
    // TODO: validate
    postService.updatePost(post)
    res.send(post)
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500)
  }
}
const getPost =  (req, res, next) => {
  try {
    let post = postService.getPostById(req.params.postid)
    if (_.isEmpty(post)) {
      res.sendStatus(404)
    } else {
      res.send(post)
    }
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500)
  }
}

module.exports = {
  postPost, getPost, putPost
}