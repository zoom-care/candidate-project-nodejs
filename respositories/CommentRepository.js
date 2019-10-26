'use strict';

const datasource = require('../config/loki');

const db = datasource.getDatabase();
const CommentCollection = db.collections.find(collection => collection.name === "comments");

module.exports = CommentCollection