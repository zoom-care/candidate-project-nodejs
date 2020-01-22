const comment = require('./comment');
const post = require('../posts/post');

exports.getCommentsForPost = (req, res) => {
  const foundPost = post.findById(req.params.id);
  if (foundPost) {
    let comments = comment.findAllByPostId(req.params.id);
    for (const comment of comments) {
      delete comment.meta;
      delete comment.$loki;
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
    res.status(404).json({})
  }
};
