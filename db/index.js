const _ = require("lodash")
const loki = require("lokijs")
const db = new loki('zdb')
let users, posts, comments


function initDb() {
  try {
    if (_.isEmpty(db.getCollection('users'))) {
      console.log("initializing users")
      users = db.addCollection('users', { indices: ['id', 'email', 'username'] })
      users.ensureUniqueIndex('id')
      users.ensureUniqueIndex('email')
      users.ensureUniqueIndex('username')
    }
    if (_.isEmpty(db.getCollection('posts'))) {
      console.log("initializing posts")
      posts = db.addCollection('posts', { indices: ['id', 'userId'] })
      posts.ensureUniqueIndex('id')
    }
    if (_.isEmpty(db.getCollection('comments'))) {
      console.log("initializing comments")
      comments = db.addCollection('comments', { indices: ['id', 'postId'] })
      comments.ensureUniqueIndex('id')
    }
  } catch (err) {
    console.error("initDb failed")
    console.error(err)
  }
}

function resetDb() {
  console.log("resetting db")
  try {
    db.removeCollection("users")
    db.removeCollection("posts")
    db.removeCollection("comments")
  } catch (err) {
    console.error("resetDb failed")
    console.error(err)
  }
}

initDb()
module.exports = { users, posts, comments, initDb, resetDb }