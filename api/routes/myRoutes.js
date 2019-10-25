'use strict';
module.exports = function(app) {
  var myController = require('../controllers/myController');

  // routes
  app.route('/users')
    .get(myController.getUsers)
    
    .post(myController.createUser);
 
  app.route('/posts')
    .put(myController.updatePost);
  
  app.route('/posts/:postId/comments')
    .get(myController.getComments);

    app.route('/comments/:commentId')
    .delete(myController.deleteComment);
        
};    