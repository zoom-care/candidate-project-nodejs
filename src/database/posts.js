const fs = require('fs');
const loki = require('lokijs');
const db = new loki('zoom-care-challenge');

module.exports = Posts = db.addCollection('comments');

const postData = JSON.parse(fs.readFileSync(__dirname + '/../data/posts.json').toString());
postData.forEach((data) => {
    Posts.insert(data);
});