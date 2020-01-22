const db = require('../../db');
const users = db.getUsers();

const createUser = (params) => {
  users.insert(params);
  return findByEmail(params.email);
}

const findByEmail = (email) => {
  let foundUser = users.findOne({ email });
  delete foundUser.meta;
  delete foundUser.$loki;
  return foundUser;
}

module.exports = {
  createUser,
  findByEmail,
}
