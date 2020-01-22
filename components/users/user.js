const db = require('../../db');

const users = db.getUsers();

const findByEmail = (email) => {
  const foundUser = users.findOne({ email });
  delete foundUser.meta;
  delete foundUser.$loki;
  return foundUser;
};

const createUser = (params) => {
  users.insert(params);
  return findByEmail(params.email);
};

module.exports = {
  createUser,
  findByEmail,
};
