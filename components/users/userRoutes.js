const user = require('./user');

exports.post = (req, res) => {
  try {
    const newUser = user.createUser(req.body);
    res.status(200).json(newUser);
  } catch(error) {
    const existingUser = user.findByEmail(req.body.email);
    res.status(409).json(existingUser);
  }
};
