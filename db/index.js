const loki = require("lokijs")
const db = new loki('zdb')

const users = db.addCollection('users', { indices: ['id', 'email', 'username'] })
users.ensureUniqueIndex('id')
users.ensureUniqueIndex('email')
users.ensureUniqueIndex('username')

const posts = db.addCollection('posts', { indices: ['id', 'userId'] })
posts.ensureUniqueIndex('id')

const comments = db.addCollection('comments', { indices: ['id', 'postId'] })
comments.ensureUniqueIndex('id')

module.exports = { users, posts, comments }