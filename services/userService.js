const loki = require("lokijs")
const { users } = require("../db")
const _ = require("lodash")

const upsertUser = function (user) {
  // todo check if user exists
  if (_.isEmpty(getUserById(user.id))) {
    users.insert(user)
  } else {
    users.update(user)
  }
}

const getUserById = function (userId) {
  return users.findOne({ 'id': userId })
}

const deleteUser = function (userId) {
  users.findAndRemove(userId)
}

const userList = function () {
  return users.find({ id: { $gte: 1 } });
}

module.exports = { upsertUser, getUserById, deleteUser, userList }