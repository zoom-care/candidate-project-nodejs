const userService = require('../services/userService')

const postUser = async (req, res, next) => {
  try {
    const user = req.body
    // TODO: validate
    createUser(user)
    res.sendStatus(201)
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    res.send("hello you")
    next()
  } catch (e) {

  }
}

const getUsers = async (req, res, next) => {
  try {
    res.send("hello you")
    next()
  } catch (e) {

  }
}

module.exports = {
  postUser, getUser, getUsers
  // putUser, deleteUser
}