const fs = require('fs');
const loki = require('lokijs');
const db = new loki('zoom-care-challenge');

const commentsCollection = db.addCollection('comments', { unique: ['id'] });

const commentsData = JSON.parse(
  fs.readFileSync(__dirname + '/../../data/comments.json').toString()
);
commentsData.forEach(data => {
  commentsCollection.insert(data);
});

module.exports = commentsCollection;
