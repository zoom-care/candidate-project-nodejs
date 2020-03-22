const express = require('express');

const healthRoute = require('./health');
const userRoutes = require('./user');
const commentRoutes = require('./comment');
const postRoutes = require('./post');

const api = express();

healthRoute(api);
userRoutes(api);
commentRoutes(api);
postRoutes(api);

module.exports = api;
