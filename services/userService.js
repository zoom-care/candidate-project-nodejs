const loki = require("lokijs")
const { users } = require("../db")
const _ = require("lodash")

const insertUser = function (user) {
  try {
    users.insert(user)
  } catch (err) {
    console.log(err.message)
  }
}

const getUserById = function (userId) {
  return users.findOne({ 'id': parseInt(userId) })
}

const deleteUser = function (user) {
  users.remove(user)
}

const userList = function () {
  return users.find({ 'id': { $ne: 0 } });
}

module.exports = { getUserById, deleteUser, userList, insertUser }