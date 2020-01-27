const fs = require('fs');
const loki = require('lokijs');
const db = new loki('zoom-care-challenge');

const usersCollection = db.addCollection('users');

const usersData = JSON.parse(fs.readFileSync(__dirname + '/../../data/users.json').toString());
usersData.forEach((data) => {
    usersCollection.insert(data);
});

module.exports = usersCollection;