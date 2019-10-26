'use strict';

const datasource = require('../config/loki');

const db = datasource.getDatabase();
const UserCollection = db.collections.find(collection => collection.name === "users");

module.exports = UserCollection
