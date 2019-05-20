module.exports = (app) => {
    const usersCtrl = require('../controllers/user.controller.js');
    /**
     * Require authorization header for routes that perform mutations
     */
    app.use(function(req, res, next) {
      if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
      }
      next();
    });
    app.post('/users', usersCtrl.create);

}
