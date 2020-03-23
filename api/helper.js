var createError = require('http-errors');
var logger = require('../logger');
var dataService = require('./dataService');

module.exports = {
  checkAuthHeader (req, res, next) {
    // don't require auth for reads
    if (/get/i.test(req.method)) next();

    if (!(req.header('Authorization') || req.header('authorization'))) {
      logger.warn('Unauthorized access attempted!');
      res.status(401).json(createError(401, 'Not Authorized'));
    } else next();
  }
}
