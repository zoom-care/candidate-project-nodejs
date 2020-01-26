const fs = require('fs');
const loki = require('lokijs');
const db = new loki('zoom-care-challenge');

module.exports = Users = db.addCollection('users');

const userData = JSON.parse(fs.readFileSync(__dirname + '/../data/comments.json').toString());
userData.forEach((data) => {
    Users.insert(data);
});