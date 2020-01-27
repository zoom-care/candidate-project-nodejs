const fs = require('fs');
const loki = require('lokijs');
const db = new loki('zoom-care-challenge');

const postsCollection = db.addCollection('posts', { unique: ['id'] });

const postData = JSON.parse(fs.readFileSync(__dirname + '/../../data/posts.json').toString());
postData.forEach((data) => {
    postsCollection.insert(data);
});

module.exports = postsCollection;