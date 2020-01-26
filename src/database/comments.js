const fs = require('fs');
const loki = require('lokijs');
const db = new loki('zoom-care-challenge');

module.exports = Comments = db.addCollection('comments');

const commentData = JSON.parse(fs.readFileSync(__dirname + '/../data/comments.json').toString());
commentData.forEach((data) => {
    Comments.insert(data);
});