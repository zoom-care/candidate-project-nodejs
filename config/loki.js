const fs = require('fs');
const loki = require('lokijs');
const db = new loki('zoom-care-candidate-project-nodejs.json');

module.exports = {
  init () {
    /**
     * Users
     */
    const users = db.addCollection('users');
    const usersData = JSON.parse(fs.readFileSync(__dirname + '/../data/users.json'));
    usersData.forEach(userData => {
      users.insert(userData);
    });

    /**
     * Comments
     */
    const comments = db.addCollection('comments');
    const commentsData = JSON.parse(fs.readFileSync(__dirname + '/../data/comments.json'));
    commentsData.forEach(commentData => {
      comments.insert(commentData);
    });

    /**
     * Posts
     */
    const posts = db.addCollection('posts');
    const postsData = JSON.parse(fs.readFileSync(__dirname + '/../data/posts.json'));
    postsData.forEach(postData => {
      const result = posts.insert(postData);
    });
  },

  getDatabase () {
    return db;
  }
}
