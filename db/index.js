const loki = require("lokijs")
let db = new loki('zdb')
let users, posts, comments


function initDb() {
  users = db.addCollection('users', { indices: ['id', 'email', 'username'] })
  users.ensureUniqueIndex('id')
  users.ensureUniqueIndex('email')
  users.ensureUniqueIndex('username')
  
  posts = db.addCollection('posts', { indices: ['id', 'userId'] })
  posts.ensureUniqueIndex('id')
  
  comments = db.addCollection('comments', { indices: ['id', 'postId'] })
  comments.ensureUniqueIndex('id')
}

function resetDb() {
  db.removeCollection("users")
  db.removeCollection("posts")
  db.removeCollection("comments")
}

initDb()
module.exports = { users, posts, comments, initDb, resetDb }