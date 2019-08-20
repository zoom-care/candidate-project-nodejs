const db = require('../config/loki').getDatabase();

const { HTTP_OK, HTTP_CONFLICT } = require('../util/constants');

const getAllUsers = async (req, res) => {
  const users = db.getCollection('users');
  const result = await users.find();
  res.status(HTTP_OK).send(result);
};

const createUser = async ({ body }, res) => {
  const users = db.getCollection('users');
  const dbUser = await users.findOne({ email: body.email });

  if (dbUser) {
    res.status(HTTP_CONFLICT).send(`User email ${body.email} already exists`);
  } else {
    const result = users.insert(body);
    res.status(HTTP_OK).send({ message: 'User created' });
  }
};

module.exports = {
  getAllUsers,
  createUser
};
