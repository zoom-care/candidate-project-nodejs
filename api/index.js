const express = require('express');

const healthRoute = require('./health');
const userRoutes = require('./user');

const api = express();

healthRoute(api);
userRoutes(api);

module.exports = api;
