const post = require('./post');

exports.put = (req, res) => {
  const foundPost = post.findById(req.params.id);
  if (foundPost) {
    const updatedPost = post.updatePost(foundPost, req.query);
    res.status(200).json(updatedPost);
  } else {
    res.status(404).json({});
  }
};
