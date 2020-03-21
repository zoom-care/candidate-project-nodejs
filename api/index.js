const express = require('express');

const healthRoute = require('./health');
const userRoutes = require('./user');
const commentRoutes = require('./comment');

const api = express();

healthRoute(api);
userRoutes(api);
commentRoutes(api);

module.exports = api;
