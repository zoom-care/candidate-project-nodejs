const userType = require('./userType');
const createUserMutationResolver = require('./mutations/createUser.js');

module.exports = {
    userType,
    createUserMutationResolver,
};