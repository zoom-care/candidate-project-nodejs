/**
 * @file User controller module
 */
const db = require('../config/loki').getDatabase();
const postsDB = db.getCollection('posts');

const postController = {
  
  /**
   * Updates a post
   * 
   * @param id Int Post ID
   * @param data Object Data object to save
   * @return { err, post } 
   */
  updatePost(id, data = {title:"", body: ""}) {
      
    // Since the whole request body is passed in we pull out only needed parts
    ({title, body} = data);
    
    var res = null, err = null, post = this.loadPostByID(id);
    
    if (!post) {
      err = {
        status: 422, message: 'Post not found'
      }
    }
    else {
      post.title = title;
      post.body = body;
      res = postsDB.update(post);
      if (!res) {
        err = {
          status: 304,
          message: 'Nothing changed',
        }
      }
      delete post.meta;
      delete post['$loki'];
    }
    return { err, post };
  },

  /**
   * Loads user by ID
   */
  loadPostByID(id) {
    var res = postsDB.where(obj => obj['id'] === id);
    if (res.length > 0) {
      return res.pop();
    }
    return null;
  },
};

module.exports = postController;