const postService = require('../services/postService')
const _ = require("lodash")

const postPost = async (req, res, next) => {
  try {
    const post = req.body
    // TODO: validate
    postService.insertPost(post)
    res.send(post)
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const putPost = async (req, res, next) => {
  try {
    const post = req.body
    // TODO: validate
    postService.updatePost(post)
    res.send(post)
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}
const getPost = async (req, res, next) => {
  try {
    let post = postService.getPostById(req.params.postid)
    if (_.isEmpty(post)) {
      res.sendCode(404)
    } else {
      res.send(post)
    }
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

module.exports = {
  postPost, getPost, putPost
}