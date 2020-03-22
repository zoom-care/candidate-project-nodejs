const express = require('express');
const cors = require('cors');

const healthRoute = require('./health');
const userRoutes = require('./user');
const commentRoutes = require('./comment');
const postRoutes = require('./post');

const api = express();

api.use(cors()); // Requriement: Allow Cross-Origin Resource Sharing (CORS) from any domain.

healthRoute(api);
userRoutes(api);
commentRoutes(api);
postRoutes(api);

module.exports = api;
