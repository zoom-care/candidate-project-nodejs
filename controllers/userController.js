const userService = require('../services/userService')
const _ = require("lodash")

const postUser = async (req, res, next) => {
  try {
    const user = req.body
    // TODO: validate
    userService.insertUser(user)
    res.send(user)
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const getUser = async (req, res, next) => {
  try {
    let user = userService.getUserById(req.params.userid)
    if (_.isEmpty(user)) {
      res.sendStatus(404)
    } else {
      res.send(user)
    }
  } catch (e) {
    console.log(e.message)
    res.sendStatus(404) && next(e)
  }
}

module.exports = {
  postUser, getUser
  // putUser, deleteUser
}