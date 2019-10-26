'use strict';

const datasource = require('../config/loki');

const db = datasource.getDatabase();
const PostCollection = db.collections.find(collection => collection.name === "posts");

module.exports = PostCollection