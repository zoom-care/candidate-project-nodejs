const comment = require('./comment');
const post = require('../posts/post');

exports.getCommentsForPost = (req, res) => {
  const foundPost = post.findById(req.params.id);
  if (foundPost) {
    const comments = comment.findAllByPostId(req.params.id);
    for (const com of comments) {
      delete com.meta;
      delete com.$loki;
    }
    res.status(200).json(comments);
  } else {
    res.status(404).json({});
  }
};

exports.delete = (req, res) => {
  const foundComment = comment.findById(req.params.id);
  if (foundComment) {
    comment.remove(foundComment);
    res.status(200).json({});
  } else {
    res.status(404).json({});
  }
};
