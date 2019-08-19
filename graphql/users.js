const database = require('../config/loki').getDatabase();

exports.createUser = (root, params, { errorName }) => {
  // Validations regex
  const REGEX_WEBSITE = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const REGEX_MAIL = /\S+@\S+\.\S+/;
  let regexPhone;
  // Vars
  const userParams = params.user;
  const users = database.getCollection('users');
  let user, existingUsername;

  if (!REGEX_MAIL.test(userParams.email)) {
    throw new Error(errorName.INVALID_EMAIL);
  }

  if (!REGEX_WEBSITE.test(userParams.website)) {
    throw new Error(errorName.INVALID_WEBSITE);
  }

  existingUsername = users.find({ username: userParams.username })[0];

  if (existingUsername) {
    throw new Error(errorName.NOT_UNIQUE_USERNAME)
  }
  
  user = users.insert(userParams);

  return user;
};
